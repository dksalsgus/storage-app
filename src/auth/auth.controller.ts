import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Res({ passthrough: true }) res,
    @Req() req,
    @Body() authLoginDto: AuthLoginDto,
  ) {
    const token = await (
      await this.authService.login(authLoginDto)
    ).access_token;
    await res.cookie('Authorization', token);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async Test() {
    return '성공';
  }

  @Get('login')
  @Render('auth/login.ejs')
  LoginPage() {}
}
