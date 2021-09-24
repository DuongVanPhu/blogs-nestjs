import { Controller, Get, Post, Body, Req } from '@nestjs/common';

@Controller('add-blog')
export class AddBlogController {
  public fs = require('fs');

  @Post('json')
  exportToJson(@Req() body): string {
    this.fs.writeFile('./src/data/myJson.json', 'duong', (err) => {});
    console.log(body);
    return 'This action adds a new cat';
  }

  @Get('json')
  findAll(): string {
    return 'This action returns all json';
  }
}
