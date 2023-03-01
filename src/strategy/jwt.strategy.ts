import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: configService.getOrThrow('NEST_APP_URL'),
      algorithms: ['RS256'],
      secretOrKey: fs.readFileSync(
        path.join(__dirname, '../config/keys/', 'jwt_rsa.private.pem'),
      ),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
