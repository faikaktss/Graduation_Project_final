import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController{
    constructor(private service:OrdersService){}
 

    @Post() 
    create(@CurrentUser() user:{id:number}){
        return this.service.createFromCart(user.id);
    }     

    @Get()
    list(@CurrentUser() user:{id:number}){
        return this.service.findAll(user.id);
    }
    @Get(':id')
    getOne(@CurrentUser() user:{id:number; role?: Role} , @Param('id', ParseIntPipe) id:number){
        return this.service.findOneOrAdmin({ id: user.id, role: user.role }, id);
    }
    @Patch(':id')
    update(@CurrentUser() user:{id:number; role?: Role}, @Param('id', ParseIntPipe) id:number, @Body() dto:UpdateOrderDto){
        return this.service.updateOrAdmin({ id: user.id, role: user.role }, id, dto.status);
    }


    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.ADMIN, Role.MODERATOR)
    @Get('all')
    listAllForAdmin(){
        return this.service.findAllAdmin();
    }
}