import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  @MessagePattern({ cmd: 'get_user' })
  get(id: number) {
    return { id, name: 'Sample User' };
  }
}
