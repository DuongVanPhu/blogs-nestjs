import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { configuration } from './environments/config';
import { AddBlogController } from './controllers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TransformInterceptor } from 'interceptors/transform.interceptor';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: `${process.cwd()}/src/environments/env/${
        process.env.NODE_ENV
      }.env`,
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/admin'),
  ],
  controllers: [AppController, AddBlogController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
