import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/CreateProduct.dto';
import { UpdateProductDto } from '../dto/UpdateProduct.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id) {
    return this.productsRepository.findOne(id);
  }

  findByCompany(companyId) {
    return this.productsRepository.find({ where: { companyId } });
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(product);
    await this.productsRepository.save(newProduct);
    return newProduct;
  }

  update(id, product: UpdateProductDto) {
    return this.productsRepository.update(id, product);
  }

  remove(id) {
    return this.productsRepository.delete(id);
  }
}
