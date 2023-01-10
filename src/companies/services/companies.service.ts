import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from '../dto/CreateCompany.dto';
import { UpdateCompanyDto } from '../dto/UpdateCompany.dto';
import { Company } from '../entities/Company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
  ) {}

  findAll() {
    return this.companiesRepository.find();
  }

  findOne(id) {
    return this.companiesRepository.findOne(id);
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    const newCompany = this.companiesRepository.create(company);
    await this.companiesRepository.save(newCompany);
    return newCompany;
  }

  update(id, company: UpdateCompanyDto) {
    return this.companiesRepository.update(id, company);
  }

  remove(id) {
    return this.companiesRepository.delete(id);
  }
}
