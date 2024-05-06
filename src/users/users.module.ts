import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UtilsModule } from 'src/utils/utils.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        UtilsModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
