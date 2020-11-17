import { httpPost } from './main';

export interface PostDishUpdateDishTagData {
  tagName: string;
  tagId: number;
  tagNum: number;
  hasTagged: boolean;
}

export async function postDishUpdateDishTag(userId: number, dishId: number, tagId: number): Promise<PostDishUpdateDishTagData> {
  return await httpPost<PostDishUpdateDishTagData, { userId: number; dishId: number; tagId: number }>(
    '/dish/updateDishTag',
    { userId: userId, dishId: dishId, tagId: tagId },
  );
}
