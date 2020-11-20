import { httpGet } from './main';

export interface DishFavoritesData {
  dishList: {
    dishId: number;
    dishName: string;
    price: number;
    star: number;
  }[];
}

export async function getDishFavorites(userId: number): Promise<DishFavoritesData> {
  return await httpGet<DishFavoritesData, { userId: number }>('/dish/favorites', { userId: userId });
}
