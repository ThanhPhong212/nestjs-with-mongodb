import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, registerDTO } from './auth.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: registerDTO, @Res() res) {
    try {
      const result = await this.authService.register(body);
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login(@Body() body: loginDTO, @Res() res) {
    try {
      const result = await this.authService.login(body);
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
