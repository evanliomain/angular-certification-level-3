import { inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

export class ObjectStore<T> {
  private storage = inject(LocalStorageService);

  private innerValue$: ReplaySubject<T> = new ReplaySubject();

  public set value(item: T) {
    this.innerValue$.next(item);
    this.storage.save(this.featureKey, item);
  }
  public get value(): T {
    return this.storage.get<T>(this.featureKey, this.defaultValue);
  }

  public get value$(): Observable<T> {
    return this.innerValue$;
  }

  constructor(private featureKey: string, private defaultValue: T) {
    this.innerValue$.next(this.storage.get<T>(this.featureKey, defaultValue));
  }
}
