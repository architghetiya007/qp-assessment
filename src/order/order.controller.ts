import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserAuthGuard } from 'src/utils/auth/user/user-auth.guard';
import { AdminAuthGuard } from 'src/utils/auth/admin/admin-auth.guard';
import { OrderService } from './order.service';
import { OrderRequestDTO } from './dto/request.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('available-product')
  @UseGuards(UserAuthGuard)
  availableProduct(@Req() req: any) {
    return this.orderService.availableProduct(req.user.id);
  } 

  @Post('create')
  @UseGuards(UserAuthGuard)
  create(@Req() req: any, @Body() body: OrderRequestDTO[]) {
    return this.orderService.create(req.user.id, body);
  }
}
