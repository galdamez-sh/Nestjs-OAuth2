import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { ConfigService } from '@nestjs/config';
import { IOAuthUser } from '../decorator/oauth-user.decorator';

@Injectable()
export class SteamOauthStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(private readonly configService: ConfigService) {
    super({
      returnURL: configService.getOrThrow('OAUTH2_STEAM_CALLBACK_URl'),
      realm: configService.getOrThrow('OAUTH2_STEAM_API_URL'),
      apiKey: configService.getOrThrow('OAUTH2_STEAM_SECRET'),
    });
  }

  async validate(identifier, profile): Promise<IOAuthUser> {
    return {
      userId: profile.id,
      provider: 'steam',
    };
  }
}
