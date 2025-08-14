import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}


    async create(createProductDto: CreateProductDto) {
        const data = {
            ...createProductDto,
            shortDescription: createProductDto.shortDescription ?? '',
            longDescription: createProductDto.longDescription ?? '',
            primaryPhotoUrl: createProductDto.primaryPhotoUrl ?? '',
        };
        return this.prisma.product.create({ data });
    }

    async findAll(){
        return this.prisma.product.findMany()
    }

    async findOne(id:number){
        const product = await this.prisma.product.findUnique({
            where:{id},
            include:{
                photos:true, // ürüne ait foto
                comments:true,  // ürüne ait yorumlar
            },
        });
        if(!product){
            throw new NotFoundException('Ürün bulunamadi');
        }
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
        });
    }

    async remove(id:number){
        return this.prisma.product.delete({where:{id}});
    }
}
