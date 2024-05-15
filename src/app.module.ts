import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from './typeorm';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true ,envFilePath: '.env',}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
       useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'mysql_db_test',
        port: 3308,
        username: 'testuser',
        password: 'testuser',
        database: 'qp_assesement',
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule, ProductModule, OrderModule, UtilsModule
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
