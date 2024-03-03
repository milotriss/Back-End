import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  @Get()
  getAllProducts(@Query() query): any[] {
    const sort = query.sort
    const search = query.search
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 2
    return this._productsService.getAllProducts(page,limit,sort,search);
  }

  @Post()
  createProduct(@Body() body): any {
    return this._productsService.createProduct(body);
  }

  @Patch('/:id')
  updateProduct(@Body() body, @Param() params): any {
    const id = Number(params.id);
    return this._productsService.updateProduct(id, body);
  }

  @Delete('/:id')
  deleteProduct(@Param() params): any {
    const id = Number(params.id);
    return this._productsService.deleteProduct(id);
  }
}
