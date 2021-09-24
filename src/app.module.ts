import { Module } from '@nestjs/common';

import { CatsController, AddBlogController } from './controllers';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AddBlogController],
  providers: [AppService],
})
export class AppModule {}
