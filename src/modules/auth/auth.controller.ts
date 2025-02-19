import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccessTokenPayload, LoginPayload } from 'src/core/types/swagger-types';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginPayload })
  @ApiCreatedResponse({ description: 'Successful login.', type: AccessTokenPayload })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.', example: { message: "Unauthorized", statusCode: 401 } })
  login(@Request() req: any): AccessTokenPayload {
    return this.authService.login(req.user.userId);
  }
}
