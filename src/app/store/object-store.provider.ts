import { InjectionToken } from '@angular/core';
import { objectStoreFactory } from './object-store.factory';
import { ObjectStore } from './object.store';

export function provideObjectStore<T>(
  token: InjectionToken<ObjectStore<T>>,
  featureKey: string,
  defaultValue: T
) {
  return {
    provide: token,
    useFactory: objectStoreFactory<T>(featureKey, defaultValue),
  };
}
