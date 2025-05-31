import { Module } from '@nestjs/common';
import { DataSourceService } from './data-source.service';

@Module({
  providers: [DataSourceService],
  // custom providers can be durable as well
  // {
  //   provide: 'DATA_SOURCE',
  //   useFactory: (payload) => new DataSource(...),
  //   scope: Scope.REQUEST,
  //   durable: true,
  // },
  exports: [DataSourceService],
})
export class DataSourceModule {}
