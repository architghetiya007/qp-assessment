import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity,UsersEntity } from 'src/typeorm';
import { CreateProductRequestDto, GetProductRequestDto, UpdateProductRequestDto } from './dto/request.dto';

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
    product = await this.productRepository.save(createProduct);
    return {
      status: true,
      message: 'Product added',
      data: product
    }
  }

  async update(userId: string, body: UpdateProductRequestDto) {
    let { id, ...restBody } = body;
    await this.productRepository.update(id, restBody)
    return {
      status: true,
      message: 'Product update',
    }
  }

  async get(userId: string, body: GetProductRequestDto) {
    let product: ProductEntity;
    product = await this.productRepository.findOne({where:{id:body.id}});
    return {
      status: true,
      message: 'Get product',
      data: product
    }
  }

  async delete(userId: string, body: GetProductRequestDto) {
    await this.productRepository.update(body.id, { isDeleted: true })
    return {
      status: true,
      message: 'Product deleted'
    }
  }


}
