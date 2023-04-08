import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public save<T>(name: string, value: T): void {
    localStorage.setItem(name, JSON.stringify(value, null, 0));
  }

  public get<T>(name: string, defaultValue: T): T {
    const item = localStorage.getItem(name);
    return this.parseStoredValue(item, defaultValue);
  }

  private parseStoredValue<T>(value: string | null, defaultValue: T): T {
    try {
      return null !== value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
}
