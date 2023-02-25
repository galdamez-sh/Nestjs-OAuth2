import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { IOAuthUser } from '../decorator/oauth-user.decorator';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github2') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('OAUTH2_GITHUB_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('OAUTH2_GITHUB_SECRET'),
      callbackURL: configService.getOrThrow('OAUTH2_GITHUB_CALLBACK_URL'),
      scope: ['user:email', 'read:user', 'user:follow'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<IOAuthUser> {
    const { id } = profile;
    return {
      provider: 'github',
      userId: id,
    };
  }
}
