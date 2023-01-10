import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/CreateInvoice.dto';
import { UpdateInvoiceDto } from '../dto/UpdateInvoice.dto';
import { InvoicesService } from '../services/invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Get('company/:companyId')
  findByCompany(@Param('companyId') companyId: string) {
    return this.invoicesService.findByCompany(companyId);
  }

  @Get('client/:clientId')
  findByClient(@Param('clientId') clientId: string) {
    return this.invoicesService.findByClient(clientId);
  }

  @Post()
  create(@Body() invoice: CreateInvoiceDto) {
    return this.invoicesService.create(invoice);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() invoice: UpdateInvoiceDto) {
    return this.invoicesService.update(id, invoice);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
