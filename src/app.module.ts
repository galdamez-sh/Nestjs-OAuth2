import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GithubOauthStrategy } from './strategy/github-oauth.strategy';
import { SteamOauthStrategy } from './strategy/steam-oauth.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          privateKey: fs.readFileSync(
            path.join(__dirname, '/config/keys/', 'jwt_rsa.private.pem'),
          ),
          publicKey: fs.readFileSync(
            path.join(__dirname, '/config/keys/', 'jwt_rsa.public.pem'),
          ),
          signOptions: {
            expiresIn: '1h',
            algorithm: 'RS256',
            encoding: 'utf8',
            issuer: config.getOrThrow('NEST_APP_URL'),
          },
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GithubOauthStrategy, SteamOauthStrategy, JwtStrategy],
})
export class AppModule {}
