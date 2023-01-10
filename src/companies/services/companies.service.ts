import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    console.log(id);
    return this.companiesRepository.findOneBy({ id });
  }

  async create(company: CreateCompanyDto): Promise<Company | HttpException> {
    try {
      const companyExists = await this.companiesRepository.findOne({
        where: { name: company.name },
      });
      if (companyExists) {
        return new HttpException('Company already exists', HttpStatus.CONFLICT);
      }
      const newCompany = this.companiesRepository.create(company);
      return await this.companiesRepository.save(newCompany);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id,
    company: UpdateCompanyDto,
  ): Promise<Company | HttpException> {
    try {
      const companyExists = await this.companiesRepository.findOneBy({ id });
      if (!companyExists) {
        return new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }
      const newCompany = this.companiesRepository.merge(companyExists, company);
      return await this.companiesRepository.save(newCompany);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id) {
    try {
      const companyExists = await this.companiesRepository.findOneBy({ id });
      if (!companyExists) {
        return new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }
      const response = await this.companiesRepository.delete(id);
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
