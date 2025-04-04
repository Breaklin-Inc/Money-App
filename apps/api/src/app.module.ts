import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/ormconfig';
import { LoggerMiddleware } from './common/utils/logger';
import { UserModule } from './core/user/user.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return dbConfig;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('No Data source options');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware);
  }
}
