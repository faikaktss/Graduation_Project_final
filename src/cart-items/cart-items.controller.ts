import {Body,Controller, Delete,Get,Param,ParseIntPipe, Patch,Post,UseGuards} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart-items')
export class CartItemsController{
    constructor(private service:CartItemsService){}

    @Post()
    add(@CurrentUser() user: {id:number}, @Body() dto:CreateCartItemDto){
        return this.service.add(user.id,dto);
    }


    @Get()
    list(@CurrentUser() user:{id:number}){
        return this.service.list(user.id);
    }

    @Patch(':id')
    update(@CurrentUser() user:{id:number},@Param('id', ParseIntPipe) id:number, @Body() dto:UpdateCartItemDto){
        return this.service.update(user.id, id ,dto);
    }

    @Delete(':id')
    remove(@CurrentUser() user:{id:number}, @Param('id', ParseIntPipe) id:number){
        return this.service.remove(user.id,id);
    }

    @Delete()
    clear(@CurrentUser() user:{id:number}, ){
        return this.service.clear(user.id);
    }

}