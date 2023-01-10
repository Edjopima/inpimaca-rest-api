import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from '../dto/CreateInvoice.dto';
import { UpdateInvoiceDto } from '../dto/UpdateInvoice.dto';
import { Invoice } from '../entities/Invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoicesRepository: Repository<Invoice>,
  ) {}

  findAll() {
    return this.invoicesRepository.find();
  }

  findOne(id) {
    return this.invoicesRepository.findOne(id);
  }

  findByCompany(companyId) {
    return this.invoicesRepository.find({ where: { companyId } });
  }

  findByClient(clientId) {
    return this.invoicesRepository.find({ where: { clientId } });
  }

  async create(invoice: CreateInvoiceDto): Promise<Invoice> {
    const newInvoice = this.invoicesRepository.create(invoice);
    await this.invoicesRepository.save(newInvoice);
    return newInvoice;
  }

  update(id, invoice: UpdateInvoiceDto) {
    return this.invoicesRepository.update(id, invoice);
  }

  remove(id) {
    return this.invoicesRepository.delete(id);
  }
}
