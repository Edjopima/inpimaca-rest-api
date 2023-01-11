import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return this.invoicesRepository.findOneBy({ id });
  }

  findByCompany(companyId) {
    return this.invoicesRepository.find({ where: { companyId } });
  }

  findByClient(clientId) {
    return this.invoicesRepository.find({ where: { clientId } });
  }

  async create(invoice: CreateInvoiceDto): Promise<Invoice | HttpException> {
    try {
      // validate invoice already exists
      const invoiceExists = await this.invoicesRepository.findOne({
        where: { title: invoice.title },
      });
      if (invoiceExists) {
        return new HttpException('Invoice already exists', HttpStatus.CONFLICT);
      }
      const newInvoice = this.invoicesRepository.create(invoice);
      return await this.invoicesRepository.save(newInvoice);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id,
    invoice: UpdateInvoiceDto,
  ): Promise<Invoice | HttpException> {
    try {
      const invoiceExists = await this.invoicesRepository.findOneBy({ id });
      if (!invoiceExists) {
        return new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
      }
      const temporalInvoice = {
        ...invoice,
        updatedAt: new Date(),
      };
      const newInvoice = this.invoicesRepository.merge(
        invoiceExists,
        temporalInvoice,
      );
      return await this.invoicesRepository.save(newInvoice);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id): Promise<Invoice | HttpException> {
    try {
      const invoiceExists = await this.invoicesRepository.findOneBy({ id });
      if (!invoiceExists) {
        return new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
      }
      return await this.invoicesRepository.remove(invoiceExists);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
