import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserAuthGuard } from 'src/utils/auth/user/user-auth.guard';
import { AdminAuthGuard } from 'src/utils/auth/admin/admin-auth.guard';
import { OrderService } from './order.service';
import { OrderRequestDTO } from './dto/request.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('create')
  @UseGuards(AdminAuthGuard)
  create(@Req() req: any, @Body() body: OrderRequestDTO[]) {
    return this.orderService.create(req.user.id, body);
  }
}
