import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.model';
import { loginDTO, registerDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectModel('User') private user: Model<User>,
  ) {}

  async register(@Body() body: registerDTO) {
    try {
      const hash = bcrypt.hashSync(body.password, 10);
      body.password = hash;

      const user: any = await this.user.create(body);

      const token = await this.createJwt(user._id, user.username);
      return token;
    } catch (error) {
      Logger.error(error);
      throw new HttpException('registration failed!', HttpStatus.BAD_REQUEST);
    }
  }

  async login(@Body() body: loginDTO) {
    try {
      const user: any = await this.user.findOne({
        $or: [
          { username: body.username },
          { email: body.username },
          { phone: body.username },
        ],
      });
      if (!user) {
        throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
      }

      // kiểm tra mật khẩu
      const password = bcrypt.compareSync(body.password, user.password);
      if (!password) {
        throw new HttpException('Incorrect password!', HttpStatus.BAD_REQUEST);
      }

      const token = await this.createJwt(user._id, user.username);
      return token;
    } catch (error) {
      throw error;
    }
  }

  async createJwt(id: string, username: string) {
    const token = await this.jwtService.signAsync(
      { id, username },
      {
        expiresIn: '10h',
        secret: this.configService.get('jwt_secret'),
      },
    );
    return { token };
  }
}
