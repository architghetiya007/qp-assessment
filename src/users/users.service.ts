import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync, compare } from "bcrypt";
import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';
import { UserAuthService } from 'src/utils/auth/user/user-auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private readonly userAuthService: UserAuthService,
  ) { }

  async registerUser(body: UsersEntity) {
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
      user = await this.usersRepository.create({ firstName: body.firstName, lastName: body.lastName, email: body.email, password: password })
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

  async showAll() {
    return await this.usersRepository.find();
  }

  async create(data: UsersDTO) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(data);
    return user;
  }

  //   async findByfirstName(firstName: string): Promise<UsersDTO> {
  //     return await this.usersRepository.findOne({
  //       where: {
  //         firstName: firstName,
  //       },
  //     });
  //   }

  async read(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<UsersDTO>) {
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }
}
