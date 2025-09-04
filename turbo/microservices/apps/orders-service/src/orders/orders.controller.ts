import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  @MessagePattern({ cmd: 'create_order' })
  createOrder(order: any) {
    console.log({
      message: 'Order received on the orders microservice',
      order,
    });
    return { message: 'Order created', order };
  }
}
