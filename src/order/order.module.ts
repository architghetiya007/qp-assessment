import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { ProductEntity } from 'src/product/product.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, ProductEntity, OrderEntity]),
    UtilsModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
