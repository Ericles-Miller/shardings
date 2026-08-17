import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  client: string;

  @IsNumber()
  value: number;
}
