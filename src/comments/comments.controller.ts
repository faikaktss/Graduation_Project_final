import { Controller ,Post,Get,Patch,Delete,Param,Body,Query} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService:CommentsService){}

    @Post()
    async create(@Body() createCommentDto:CreateCommentDto){
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    async findAll(@Query('productId') productId?: string, @Query('rating') rating?:string){
        return this.commentsService.findAll(Number(productId) || undefined , rating ? Number(rating) : undefined)
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return this.commentsService.findOne(Number(id));
    }

    @Patch(':id')
    async update(@Param('id' ) id:string , @Body() updateCommentDto:UpdateCommentDto){
        return this.commentsService.update(Number(id), updateCommentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id:string){
        return this.commentsService.remove(Number(id));
    }
}
