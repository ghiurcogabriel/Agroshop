import { IsIn, IsString } from 'class-validator';

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn(ORDER_STATUSES)
  status: (typeof ORDER_STATUSES)[number];
}
