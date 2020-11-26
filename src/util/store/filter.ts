import { createUseStoreFunc } from './store';

export const useFilterCanteenId = createUseStoreFunc<number | undefined>(undefined);
