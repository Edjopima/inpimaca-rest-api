export class CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role?: number;
  img?: string;
  companyId: number;
}
