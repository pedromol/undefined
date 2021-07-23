import { Injectable, NestInterceptor, CallHandler, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      tap((data) => {
        if (data === undefined) throw new NotFoundException();
      }),
    );
  }
}
