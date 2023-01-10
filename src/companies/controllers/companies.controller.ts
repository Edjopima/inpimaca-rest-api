import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCompanyDto } from '../dto/CreateCompany.dto';
import { UpdateCompanyDto } from '../dto/UpdateCompany.dto';
import { CompaniesService } from '../services/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  getAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Post()
  create(@Body() company: CreateCompanyDto) {
    return this.companiesService.create(company);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() company: UpdateCompanyDto) {
    return this.companiesService.update(id, company);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
