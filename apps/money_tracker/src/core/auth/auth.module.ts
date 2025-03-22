import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategies';
import { AuthService } from './services';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [LocalStrategy, AuthService],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
