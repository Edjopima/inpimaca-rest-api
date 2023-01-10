import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from '../dto/CreateClient.dto';
import { UpdateClientDto } from '../dto/UpdateClient.dto';
import { Client } from '../entities/Client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}

  findAll() {
    return this.clientsRepository.find();
  }

  findOne(id) {
    return this.clientsRepository.findOneBy({ id });
  }

  findByCompany(companyId) {
    return this.clientsRepository.find({ where: { companyId } });
  }

  async create(client: CreateClientDto): Promise<Client | HttpException> {
    try {
      const newClient = this.clientsRepository.create(client);
      return await this.clientsRepository.save(newClient);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id, client: UpdateClientDto): Promise<Client | HttpException> {
    try {
      const clientExists = await this.clientsRepository.findOneBy({ id });
      if (!clientExists) {
        return new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }
      const newClient = this.clientsRepository.merge(clientExists, client);
      return await this.clientsRepository.save(newClient);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id) {
    try {
      const clientExists = await this.clientsRepository.findOneBy({ id });
      if (!clientExists) {
        return new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }
      const response = await this.clientsRepository.delete(id);
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
