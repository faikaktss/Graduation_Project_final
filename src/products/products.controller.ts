import { Controller, Post, Get, Patch, Delete, Param, Body,ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

@Patch(':id')
async update(@Param('id',ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
  return this.productsService.update(id, updateProductDto);
}

@Delete(':id')
async remove(@Param('id',ParseIntPipe) id: number) {
  return this.productsService.remove(id);
}
}