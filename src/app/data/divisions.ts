import { Division } from '../data.models';
import { ConferencesEnum } from './conferences';

export const DIVISIONS: Division[] = [
  { id: 0, name: 'Atlantic', conference: ConferencesEnum.Eastern },
  { id: 1, name: 'Central', conference: ConferencesEnum.Eastern },
  { id: 2, name: 'Southeast', conference: ConferencesEnum.Eastern },
  { id: 3, name: 'Northwest', conference: ConferencesEnum.Western },
  { id: 4, name: 'Pacific', conference: ConferencesEnum.Western },
  { id: 5, name: 'Southwest', conference: ConferencesEnum.Western },
];
