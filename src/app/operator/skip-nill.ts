import { Observable, UnaryFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * RxJs operator to skip when the value is null or undefined.
 */
export function skipNill<T>(): UnaryFunction<
  Observable<T>,
  Observable<NonNullable<T>>
> {
  return filter<T, NonNullable<T>>(
    (value: T): value is NonNullable<T> => null !== value && undefined !== value
  );
}
