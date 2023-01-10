import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id) {
    return this.usersRepository.findOne(id);
  }

  async create(user: CreateUserDto): Promise<User | HttpException> {
    try {
      // validate if user already exists
      const userExists = await this.usersRepository.findOne({
        where: { email: user.email },
      });
      if (userExists) {
        return new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      const newUser = this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id, user: UpdateUserDto): Promise<User | HttpException> {
    try {
      const userExists = await this.usersRepository.findOne(id);
      if (!userExists) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const newUser = this.usersRepository.merge(userExists, user);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id) {
    try {
      const userExists = await this.usersRepository.findOne(id);
      if (!userExists) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const response = await this.usersRepository.delete(id);
      // validate if user was deleted with affected property
      if (response.affected === 0) {
        return new HttpException(
          'Unexpected error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return response;
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
