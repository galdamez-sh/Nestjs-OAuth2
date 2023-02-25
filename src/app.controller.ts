import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GithubOauthGuard } from './guard/github-oauth.guard';
import { IOAuthUser, OAuthUser } from './decorator/oauth-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth/github')
  @UseGuards(GithubOauthGuard)
  handleGithubOauth() {
    // Redirect to Callback
  }

  @Get('auth/github/callback')
  @UseGuards(GithubOauthGuard)
  handleGithubRedirect(@OAuthUser() user: IOAuthUser) {
    return {
      ...user,
    };
  }
}
