import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync, compare } from "bcrypt";
import { UsersEntity } from 'src/typeorm';
import { UserAuthService } from 'src/utils/auth/user/user-auth.service';
import { LoginUserRequestDTO, RegisterRequestDTO } from './DTO/request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private readonly userAuthService: UserAuthService,
  ) { }

  async registerUser(body: RegisterRequestDTO) {
    let user: UsersEntity;
    try {
      user = await this.usersRepository.findOne({ where: { email: body.email } })
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error'
      })
    }
    if (user) {
      throw new BadRequestException({
        status: false,
        message: 'User already registered',
      })
    }

    try {
      let password = hashSync(body.password, 10);
      let createdUser = await this.usersRepository.create({ firstName: body.firstName, lastName: body.lastName, email: body.email, password: password });
      user = await this.usersRepository.save(createdUser); // Save user to the database and return the entity with generated id
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error'
      })
    }

    console.log(user, 'user>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

    const token = await this.userAuthService.signToken({
      userId: user.id,
      isAdmin: false,
      version: Date.now(),
    });

    return {
      status: true,
      message: "User Created Successfully",
      data: {
        user: user,
        token: token,
      },
    };
  }

  async loginUser(body: LoginUserRequestDTO) {
    let user: UsersEntity;
    try {
      user = await this.usersRepository.findOne({where:{ email: body.email }});
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error'
      })
    }

    if (!user) {
      throw new BadRequestException({
        status: false,
        message: 'User not found. Please use another email'
      })
    }

    let comparePass = await compare(body.password, user.password);
    if (!comparePass) {
      throw new UnauthorizedException({
        status: false,
        message: 'Password mismatch. Please use another correct one'
      })
    }

    const token = await this.userAuthService.signToken({
      userId: user.id,
      isAdmin: false,
      version: Date.now(),
    });

    return {
      status: true,
      message: "Login Successfully",
      data: {
        user: user,
        token: token,
      },
    };
  }

  async registerAdmin(body: RegisterRequestDTO) {
    let user: UsersEntity;
    try {
      user = await this.usersRepository.findOne({ where: { email: body.email } })
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error'
      })
    }
    if (user) {
      throw new BadRequestException({
        status: false,
        message: 'User already registered',
      })
    }

    try {
      let password = hashSync(body.password, 10);
      let createdUser = await this.usersRepository.create({ firstName: body.firstName, lastName: body.lastName, email: body.email, password: password, isAdmin: true });
      user = await this.usersRepository.save(createdUser); // Save user to the database and return the entity with generated id
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error'
      })
    }

    console.log(user, 'user>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

    const token = await this.userAuthService.signToken({
      userId: user.id,
      isAdmin: true,
      version: Date.now(),
    });

    return {
      status: true,
      message: "User Created Successfully",
      data: {
        user: user,
        token: token,
      },
    };
  }
}
