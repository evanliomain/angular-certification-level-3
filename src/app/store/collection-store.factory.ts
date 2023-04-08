import { CollectionStore } from './collection.store';

export function collectionStoreFactory<T>(featureKey: string) {
  return () => new CollectionStore<T>(featureKey);
}
