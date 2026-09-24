import { CreateTireDto } from 'src/tire/dto/create-tire.dto';

export class CreateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  department?: string;
  email: string;
  phone: string;
  role: string;
  addedTires?: CreateTireDto[];
}
