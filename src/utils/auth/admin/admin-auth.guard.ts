import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthService } from '../user/user-auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminAuthGuard {
  constructor(private readonly userAuthService: UserAuthService,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
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
      let user = await this.usersRepository.findOne({ where: { id: payload.userId, isAdmin: true } })
      if (!user) {
        throw new UnauthorizedException();
      }
      request['user'] = user;
      return true
      // request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
