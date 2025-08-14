import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsNumber()
    categoryId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    slug: string; // İleride otomatik üretilebilir

    @IsString()
    @IsOptional()
    shortDescription?: string;

    @IsString()
    @IsOptional()
    longDescription?: string;

    @IsNumber()
    price: number;

    @IsString()
    @IsOptional() // Fotoğraflar servisi ilk primary'yi set ettiği için opsiyonel
    primaryPhotoUrl?: string;
}

