import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';
import { allUsersExample, badCreateUserRequestResponseExample } from 'src/core/types/swagger-types';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post('registration')
  @ApiCreatedResponse({ description: 'Successful registration.', example: 1 })
  @ApiBadRequestResponse({ example: badCreateUserRequestResponseExample, description: "Bad Request" })
  registerUser(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ example: allUsersExample })
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
