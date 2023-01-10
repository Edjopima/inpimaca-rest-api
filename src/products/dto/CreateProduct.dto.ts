export class CreateProductDto {
  title: string;
  price: number;
  category: string;
  img?: string;
  companyId: number;
}
