import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from 'src/utils/dto/params.dto';
@Injectable()
export class UserAuthService {
    constructor(private readonly jwtService: JwtService) { }

    signToken(payload: AuthPayload) {
        return this.jwtService.signAsync(payload, {
            algorithm: 'HS256',
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE
        });
    }

    verifyToken(token: string) {
        return this.jwtService.verifyAsync(token, {
            algorithms: ['HS256'],
            secret: process.env.JWT_SECRET_KEY,
        });
    }
}
