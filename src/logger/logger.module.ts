import { Module } from '@nestjs/common';
import CustomLogger from './customLogger';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
