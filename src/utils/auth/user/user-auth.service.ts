import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from 'src/utils/dto/params.dto';
@Injectable()
export class UserAuthService {
    constructor(private readonly jwtService: JwtService) { }

    signToken(payload: AuthPayload) {
        return this.jwtService.signAsync(payload, {
            algorithm: 'HS256',
            secret: '9c32d407a1598e0d',
            expiresIn: '24h'
        });
    }

    verifyToken(token: string) {
        return this.jwtService.verifyAsync(token, {
            algorithms: ['HS256'],
            secret: '9c32d407a1598e0d',
        });
    }
}
