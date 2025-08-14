import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CommentsService {
   constructor(private readonly prisma: PrismaService) {}

    private async recalProductStats(tx: Prisma.TransactionClient, productId: number) {
        const totalCount = await tx.productComment.count({
            where: { productId },
        });

        const ratingAgg = await tx.productComment.aggregate({
            where: { productId, rating: { not: null } }, //puanı boş olmayanları seç
            _avg: { rating: true }, //ortalama al
        });

        const avg = ratingAgg._avg.rating ? ratingAgg._avg.rating : 0;

        await tx.product.update({
            where: { id: productId },
            data: { commentCount: totalCount, averageRating: avg },
        });
    }




    async create(createCommentDto:CreateCommentDto){
        return this.prisma.$transaction(async (tx) =>{
            if(createCommentDto.content &&  !createCommentDto.title){
                throw new BadRequestException('İçerik varsa başlik zorunlu')
            }

            const comment = await tx.productComment.create({
                data: {
                    ...createCommentDto,
                },
            });

            await this.recalProductStats(tx, createCommentDto.productId);
            return comment
        })

    }

    async findAll(productId?:number , rating?:number){
        const where: any = {};
        if(productId) where.productId = productId;
        if(rating) where.rating = rating;

        return this.prisma.productComment.findMany({where});
    }

    async findOne(id:number){
        return this.prisma.productComment.findUnique({where:{id}});
    }

    async update(id:number, updateCommentDto:UpdateCommentDto){
        return this.prisma.$transaction(async (tx) =>{
            const existing = await tx.productComment.findUnique({where: {id}});
            if(!existing)   
                throw new NotFoundException('Yorum bulunamadi');

            const merged = {...existing, ...updateCommentDto};
            if(merged.content && !merged.title)
                throw new BadRequestException('İçerik varsa başlık zorunlu');

            const updated = await tx.productComment.update({
                where:{id},
                data:updateCommentDto,
            });

            await this.recalProductStats(tx,existing.productId);
            return updated;
        })
    }

    async remove(id:number){
        return this.prisma.$transaction(async (tx) =>{
            const existing = await tx.productComment.findUnique({where:{id}});
            if(!existing)
                throw new NotFoundException('Yorum bulunamadi');
    
            await tx.productComment.delete({where:{id}});
            await this.recalProductStats(tx,existing.productId);
            
            return {deletedId: id};            
        })
    }
}
