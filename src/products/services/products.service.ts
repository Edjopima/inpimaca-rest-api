import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(product: CreateProductDto): Promise<Product | HttpException> {
    try {
      // validate product already exists
      const productExists = await this.productsRepository.findOne({
        where: { title: product.title },
      });
      if (productExists) {
        return new HttpException('Product already exists', HttpStatus.CONFLICT);
      }
      const newProduct = this.productsRepository.create(product);
      return await this.productsRepository.save(newProduct);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id,
    product: UpdateProductDto,
  ): Promise<Product | HttpException> {
    try {
      const productExists = await this.productsRepository.findOne(id);
      if (!productExists) {
        return new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      const newProduct = this.productsRepository.merge(productExists, product);
      return await this.productsRepository.save(newProduct);
    } catch (error) {
      return new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id) {
    try {
      const productExists = await this.productsRepository.findOne(id);
      if (!productExists) {
        return new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      const response = await this.productsRepository.delete(id);
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
