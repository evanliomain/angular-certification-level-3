import { InjectionToken } from '@angular/core';
import { CollectionStore } from './collection.store';
import { collectionStoreFactory } from './collection-store.factory';

export function provideCollectionStore<T>(
  token: InjectionToken<CollectionStore<T>>,
  featureKey: string
) {
  return {
    provide: token,
    useFactory: collectionStoreFactory<T>(featureKey),
  };
}
