import { ObjectStore } from './object.store';

export function objectStoreFactory<T>(featureKey: string, defaultValue: T) {
  return () => new ObjectStore<T>(featureKey, defaultValue);
}
