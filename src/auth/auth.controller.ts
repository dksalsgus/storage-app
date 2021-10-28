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
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Res() response: Response, @Body() authLoginDto: AuthLoginDto) {
    const token = this.authService.login(authLoginDto);
    await response.cookie('Authorization', token); // 쿠키에 token 저장
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async AuthCheck(@Req() request: Request) {
    console.log(request.user);
    return request.user;
  }

  @Get('login')
  @Render('auth/login.ejs')
  LoginPage() {}
}
