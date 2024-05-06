import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthService } from './user-auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserAuthGuard {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private readonly userAuthService: UserAuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.userAuthService.verifyToken(
        token
      );
      console.log(payload, 'payload<<<<<<')
      let user = await this.usersRepository.findOne({ where: { id: payload.userId } })
      if (!user) {
        throw new UnauthorizedException();
      }
      request['user'] = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
