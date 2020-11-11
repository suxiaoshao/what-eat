import { httpGet } from './main';

export interface GetdishfavoritesData {
  
    dishList: {
        dishId : number,
        dishName : string,
        price : number,
        star : number
  }[];
}

export async function getUserInfo(userId:number): Promise<[undefined, GetdishfavoritesData] | [string, undefined]> {
  return await httpGet<GetdishfavoritesData, { userId:number }>('/dish/favorites', { userId:userId });
}
