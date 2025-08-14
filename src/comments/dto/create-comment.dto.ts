import { IsOptional, IsString, IsNumber ,IsInt, Min,Max, IsIn} from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  userId: number;
  @IsInt()
  productId: number;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  content?: string;
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number; // opsiyonel olmalı!
}
