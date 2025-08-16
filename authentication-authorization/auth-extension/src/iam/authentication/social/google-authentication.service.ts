import {
  ConflictException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { Repository } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { AuthenticationService } from '../authentication.service';
import { PostgresErrorCodes } from '../../../common/errors/postgres-error-codes';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  onModuleInit() {
    const clientId = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(token: string) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      });
      const payload = loginTicket.getPayload();
      if (!payload?.email || !payload?.sub) {
        throw new UnauthorizedException('Invalid Google token payload');
      }
      const { email, sub: googleId } = payload;
      const user = await this.userRepository.findOneBy({ googleId });
      if (user) {
        return this.authService.generateTokens(user);
      } else {
        const newUser = await this.userRepository.save({ email, googleId });
        return this.authService.generateTokens(newUser);
      }
    } catch (err) {
      if (err.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
        throw new ConflictException();
      }
      throw new UnauthorizedException();
    }
  }
}
