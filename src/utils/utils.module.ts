import { Module } from '@nestjs/common';
import { UserAuthService } from './auth/user/user-auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserAuthGuard } from './auth/user/user-auth.guard';
import { AdminAuthGuard } from './auth/admin/admin-auth.guard';
import { UsersEntity } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          algorithm: 'HS256',
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
        },
      })
    }),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  providers: [UserAuthService, JwtService, UserAuthGuard, AdminAuthGuard],
  exports: [UserAuthService, JwtService, UserAuthGuard, AdminAuthGuard]
})
export class UtilsModule { }
