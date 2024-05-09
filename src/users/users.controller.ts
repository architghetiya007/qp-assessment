import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserRequestDTO, RegisterRequestDTO } from './DTO/request.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('register')
  async registerUser(@Body() body: RegisterRequestDTO) {
    return this.usersService.registerUser(body);
  }

  @Post('login')
  async loginUser(@Body() body: LoginUserRequestDTO) {
    return this.usersService.loginUser(body);
  }

  @Post('register-admin')
  async registerAdmin(@Body() body: RegisterRequestDTO) {
    return this.usersService.registerAdmin(body);
  }
}
