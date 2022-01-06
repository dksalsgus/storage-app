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
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({summary:'Login API', description:'Login'})
  async login(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Body() authLoginDto: AuthLoginDto,
  ) {
    const token = await (
      await this.authService.login(authLoginDto)
    ).access_token;
    await res.cookie('Authorization', token); // 쿠키에 token 저장
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary:'Auth Check'})
  async AuthCheck(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }

}
