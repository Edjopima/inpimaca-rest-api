import { Injectable } from '@nestjs/common';
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
    return this.clientsRepository.findOne(id);
  }

  findByCompany(companyId) {
    return this.clientsRepository.find({ where: { companyId } });
  }

  async create(client: CreateClientDto): Promise<Client> {
    const newClient = this.clientsRepository.create(client);
    await this.clientsRepository.save(newClient);
    return newClient;
  }

  update(id, client: UpdateClientDto) {
    return this.clientsRepository.update(id, client);
  }

  remove(id) {
    return this.clientsRepository.delete(id);
  }
}
