import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { ProductEntity } from './product.entity';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, ProductEntity]),
    UtilsModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
