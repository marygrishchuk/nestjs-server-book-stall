import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post('registration')
  registerUser(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAlUsers() {
    return this.userService.getAllUsers();
  }
}
