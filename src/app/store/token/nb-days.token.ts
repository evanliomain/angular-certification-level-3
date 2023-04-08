import { InjectionToken } from '@angular/core';
import { ObjectStore } from '../object.store';

export const NB_DAYS = new InjectionToken<ObjectStore<number>>('nb-days-store');
