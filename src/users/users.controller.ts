import { Controller,Get,Param,Patch,Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    
    @Get()
    async findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return this.userService.findOne(Number(id));
    }

    @Patch(':id')   
    async update(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto){  
        return this.userService.update(Number(id), updateUserDto);
    }
}
