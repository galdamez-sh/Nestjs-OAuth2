import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GithubOauthStrategy } from './strategy/github-oauth.strategy';
import { SteamOauthStrategy } from './strategy/steam-oauth.strategy';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, GithubOauthStrategy, SteamOauthStrategy],
})
export class AppModule {}
