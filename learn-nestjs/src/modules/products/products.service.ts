import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private _productsRepository: ProductsRepository) {}
  getAllProducts(
    page: number,
    limit: number,
    sort?: string,
    search?: string,
  ): any[] {
    const offset = Math.ceil((page - 1) * limit);
    const data = this._productsRepository.getAllProducts();
    if (!sort && !search) {
      return data.splice(offset, limit);
    }
    if (sort && search) {
      const newData = data
        .filter((item: any) => {
          return item.name.toLowerCase().includes(search);
        })
        .splice(offset, limit);
      if (sort === 'ASC') {
        const result = newData.sort((a: any, b: any) => a.price - b.price);
        return result;
      } else if (sort === 'DESC') {
        const result = newData.sort((a: any, b: any) => b.price - a.price);
        return result;
      }
    }
    if (sort && !search) {
      if (sort === 'ASC') {
        const result = data
          .sort((a: any, b: any) => a.price - b.price)
          .splice(offset, limit);
        return result;
      } else if (sort === 'DESC') {
        const result = data
          .sort((a: any, b: any) => b.price - a.price)
          .splice(offset, limit);
        return result;
      }
    }
    if (!sort && search) {
      const newData = data
        .filter((item: any) => item.name.toLowerCase().includes(search))
        .splice(offset, limit);
      return newData;
    }
  }
  createProduct(body): any[] {
    return this._productsRepository.createProduct(body);
  }
  updateProduct(id: number, body: any): any[] {
    return this._productsRepository.updateProduct(id, body);
  }
  deleteProduct(id: number): any[] {
    return this._productsRepository.deleteProduct(id);
  }
}
