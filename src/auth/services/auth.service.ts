import { UsersService } from '@/users/services/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersService.create({ ...user, password: hashedPassword });
  }

  async login(form: LoginDto) {
    const { email, password } = form;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    user.password = undefined;
    return user;
  }
}
