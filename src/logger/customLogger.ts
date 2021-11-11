import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';
import getLogLevels from './utils';

@Injectable()
class CustomLogger extends ConsoleLogger {
  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
  ) {
    const environment = configService.get('NODE_ENV');

    super(context, {
      ...options,
      logLevels: getLogLevels(environment === 'production'),
    });
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);
  }
  error(message: string, context?: string, stack?: string) {
    super.error.apply(this, [message, context, stack]);
  }
  warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);
  }
  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);
  }
  verbose(message: string, context?: string) {
    super.debug.apply(this, [message, context]);
  }
}

export default CustomLogger;
