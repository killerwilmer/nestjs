import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  @MessagePattern({ cmd: 'get_product' })
  getProduct(id: number) {
    return { id, name: 'Sample Product', price: 100 };
  }

  @EventPattern('order.created')
  updateStock(order: { id: number; productId: number }) {
    console.log('Checking stock for product:', order.productId);

    console.log('Stock updated for product:', order.productId);
  }
}
