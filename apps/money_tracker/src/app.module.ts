import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/ormconfig';
import { LoggerMiddleware } from './common/utils/logger';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return dbConfig;
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware);
  }
}
