import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { OrderEntity,ProductEntity,UsersEntity } from 'src/typeorm';
import { OrderRequestDTO } from './dto/request.dto';
import { randomBytes } from 'crypto';
import { types } from 'util';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}
  async availableProduct(userId: any) {
    let available: ProductEntity[];
    try {
      available = await this.productRepository.find({
        where: { isDeleted: false, inventory: MoreThan(0) },
      });
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }

    return {
      status: true,
      message: 'Available product',
      data: available,
    };
  }

  async create(userId: any, body: OrderRequestDTO[]) {
    try {
      let check = [];
      let available = []
      for (let i = 0; i < body.length; i++) {
        const element = body[i];
        let value = await this.productRepository.findOne({
          where: {
            id: element.productId,
          },
        });
        available.push(value.inventory);
        check.push(value.inventory >= element.qty);
      }
      if (check.includes(false)) {
        throw new BadRequestException({
          status : false, 
          message: "Available product is less than order"
        })
      }
      let orderId = randomBytes(10).toString('hex');
      for (let i = 0; i < body.length; i++) {
        const element = body[i];
        await this.orderRepository.insert({
          orderId: orderId,
          userId: userId,
          price: element.price,
          qty: element.qty,
          productId: element.productId,
        });

        await this.productRepository.update(element.productId, { inventory : (available[i] - element.qty)})
      }


    } catch (error) {
      if (BadRequestException) {
        throw new BadRequestException({
          status : false, 
          message: "Available product is less than order"
        })
      }
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }

    return {
      status: true,
      message: 'Order created successfully',
    };
  }
}
