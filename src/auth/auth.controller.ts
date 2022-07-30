import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { SingUpAuthDto, SignInDto } from './dto/dto';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SingUpAuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @Get('user')
  getAuthUser(@GetUser('id') userId: number) {
    return this.authService.getAuthUser(userId);
  }

  @UseGuards(JwtGuard)
  @Delete('user')
  deleteUser(@GetUser('id') userId: number) {
    return this.authService.deleteUser(userId);
  }
}
