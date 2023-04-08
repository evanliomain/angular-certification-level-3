import { inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

export class CollectionStore<T> {
  private storage = inject(LocalStorageService);

  private innerValue$: ReplaySubject<T[]> = new ReplaySubject();

  public set value(item: T[]) {
    this.innerValue$.next(item);
    this.storage.save(this.featureKey, item);
  }
  public get value(): T[] {
    return this.storage.get<T[]>(this.featureKey, []);
  }

  public get value$(): Observable<T[]> {
    return this.innerValue$;
  }

  constructor(private featureKey: string) {
    this.innerValue$.next(this.storage.get<T[]>(this.featureKey, []));
  }

  public add(item: T): void {
    if (this.value.some(equal(item))) {
      return;
    }
    this.value = [...this.value, item];
  }

  public remove(item: T): void {
    this.value = this.value.filter(not(equal(item)));
  }
}

function equal<T>(a: T) {
  return (b: T) => a === b;
}

function not<T>(predicat: (element: T) => boolean): (element: T) => boolean {
  return (element: T) => !predicat(element);
}
