import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductRequestDto, UpdateProductRequestDto } from './dto/request.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) { }
  async create(userId: string, body: CreateProductRequestDto) {
    let product: ProductEntity;
    let createProduct = await this.productRepository.create({ ...body });
    product = await this.productRepository.save(createProduct); // Save user to the database and return the entity with generated id
    return {
      status: true,
      message: 'Product added',
      data: product
    }
  }

  async update(userId: string, body: UpdateProductRequestDto) {
    let product: ProductEntity;
    let { id, ...restBody } = body;
    await this.productRepository.update(id, restBody)
    return {
      status: true,
      message: 'Product update',
    }
  }

}
