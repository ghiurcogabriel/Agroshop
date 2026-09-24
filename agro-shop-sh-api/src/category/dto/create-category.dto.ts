import { CreateTireDto } from 'src/tire/dto/create-tire.dto';

export class CreateCategoryDto {
  id: string;
  name: string;
  tires: CreateTireDto[];
}
