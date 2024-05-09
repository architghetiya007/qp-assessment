import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { UserAuthGuard } from 'src/utils/auth/user/user-auth.guard';
import { CreateProductRequestDto, GetProductRequestDto, UpdateProductRequestDto } from './dto/request.dto';
import { AdminAuthGuard } from 'src/utils/auth/admin/admin-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('create')
  @UseGuards(AdminAuthGuard)
  create(@Req() req: any, @Body() body: CreateProductRequestDto) {
    return this.productService.create(req.user.id, body);
  }

  @Post('update')
  @UseGuards(AdminAuthGuard)
  update(@Req() req: any, @Body() body: UpdateProductRequestDto) {
    return this.productService.update(req.user.id, body);
  }

  @Post('get')
  @UseGuards(AdminAuthGuard)
  get(@Req() req: any, @Body() body: GetProductRequestDto) {
    return this.productService.get(req.user.id, body);
  }

  @Delete('delete')
  @UseGuards(AdminAuthGuard)
  delete(@Req() req: any, @Body() body: GetProductRequestDto) {
    return this.productService.delete(req.user.id, body);
  }

}
