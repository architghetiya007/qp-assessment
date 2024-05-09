import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { OrderEntity } from './order.entity';
import { OrderRequestDTO } from './dto/request.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) { }
  async create(userId: any, body: OrderRequestDTO[]) {
    try {
      for (let i = 0; i < body.length; i++) {
        const element = body[i];
        let createProduct = await this.orderRepository.insert({ userId: userId, price: element.price, qty: element.qty, productId: element.productId });
      }
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error'
      })
    }
  }
}
