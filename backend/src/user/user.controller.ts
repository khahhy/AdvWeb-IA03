import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: RegisterDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: RegisterDto) {
    return this.userService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.userService.getProfile(req.user.userId);
  }
}
