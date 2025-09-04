import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  @MessagePattern({ cmd: 'get_product' })
  getProduct(id: number) {
    return { id, name: 'Sample Product', price: 100 };
  }
}
