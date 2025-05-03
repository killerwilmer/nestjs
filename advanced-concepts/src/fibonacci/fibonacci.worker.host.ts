import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { join } from 'path';
import { Worker } from 'worker_threads';
import { filter, firstValueFrom, fromEvent, map, Observable } from 'rxjs';
import { randomUUID } from 'crypto';

export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker;
  private message$: Observable<{ id: string; result: number }>;

  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    this.message$ = fromEvent(this.worker, 'message') as Observable<{
      id: string;
      result: number;
    }>;
  }

  onApplicationShutdown(signal?: string) {
    this.worker.terminate();
  }

  run(n: number) {
    const uniqueID = randomUUID();
    this.worker.postMessage({ n, id: uniqueID });
    return firstValueFrom(
      // convert our observable to a promise
      this.message$.pipe(
        filter(({ id }) => id === uniqueID), // filter out messages by IDs
        map(({ result }) => result), // pluck result value
      ),
    );
  }
}
