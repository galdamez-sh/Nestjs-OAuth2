import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GithubOauthGuard } from './guard/github-oauth.guard';
import { IOAuthUser, OAuthUser } from './decorator/oauth-user.decorator';
import { SteamOauthGuard } from './guard/steam-oauth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('auth/github')
  @UseGuards(GithubOauthGuard)
  handleGithubOauth() {
    // Redirect to Callback
  }

  @Get('auth/github/callback')
  @UseGuards(GithubOauthGuard)
  handleGithubRedirect(@OAuthUser() user: IOAuthUser) {
    return this.jwtService.sign(
      {},
      {
        subject: user.userId,
      },
    );
  }

  @Get('auth/steam')
  @UseGuards(SteamOauthGuard)
  handleSteamOauth() {
    // Redirect to Callback
  }

  @Get('auth/steam/callback')
  @UseGuards(SteamOauthGuard)
  handleSteamOauthCallback(@OAuthUser() user: IOAuthUser) {
    // Redirect to Callback
    return {
      ...user,
    };
  }

  @Get('auth/jwt')
  @UseGuards(JwtAuthGuard)
  handleJWTAuth(@OAuthUser() user: IOAuthUser) {
    // Redirect to Callback
    return {
      ...user,
    };
  }
}
