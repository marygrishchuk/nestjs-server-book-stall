import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOkResponse({ description: "Server is online", example: "Hello, It's a Book Stall API server." })
  getHello(): string {
    return this.appService.getHello();
  }
}
