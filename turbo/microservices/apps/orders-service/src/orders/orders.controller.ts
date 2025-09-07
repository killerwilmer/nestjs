import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MICROSERVICES } from '../constants';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICES.PRODUCT_REDIS_CLIENT)
    private readonly productRedisClient: ClientProxy,
  ) {}

  @MessagePattern('create_order')
  createOrder(order: any) {
    console.log({
      message: 'Order received on the orders microservice',
      order,
    });

    this.productRedisClient.emit('order.created', order);

    return { message: 'Order created', order };
  }
}
