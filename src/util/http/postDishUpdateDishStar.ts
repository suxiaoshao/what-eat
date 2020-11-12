import { httpPost } from './main';

export interface PostDishUpdateDishStarData {}
export async function postDishUpdateDishStar(userId: number, dishId: number, star: number): Promise<PostDishUpdateDishStarData> {
  return await httpPost<PostDishUpdateDishStarData, { userId: number; dishId: number; star: number }>(
    '/dish/updateDishStar',
    { userId: userId, dishId: dishId, star: star },
  );
}
