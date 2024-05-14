import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/typeorm';
import { UtilsModule } from 'src/utils/utils.module';
import { ProductEntity } from 'src/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from 'src/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, ProductEntity, OrderEntity]),
    UtilsModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
