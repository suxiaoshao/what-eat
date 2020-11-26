import { httpPost } from './main';

export interface UserSearchData {
  searchList: {
    windowId: number;
    windowName: string;
    pngSrc: string;
    description: string;
    canteenName: string;
    star: number;
    dish: {
      dishName: string;
      dishId: number;
    }[];
  }[];
}

type UserSearchQuery =
  | {
      searchName: string;
      tagList: number[];
      canteenId: number;
    }
  | {
      searchName: string;
      tagList: [];
    }
  | {
      searchName: string;
      canteenId: number;
    }
  | {
      searchName: string;
    };

export async function getUserSearch(
  searchName: string,
  tagList: number[] | undefined,
  canteenId: number | undefined,
): Promise<UserSearchData> {
  let queryData: UserSearchQuery;
  if (tagList !== undefined && canteenId !== undefined) {
    queryData = {
      searchName: searchName,
      tagList: tagList,
      canteenId: canteenId,
    };
  } else if (tagList === undefined && canteenId === undefined) {
    queryData = {
      searchName: searchName,
    };
  } else if (tagList !== undefined) {
    queryData = {
      searchName: searchName,
      tagList: tagList,
    };
  } else {
    queryData = {
      searchName: searchName,
      canteenId: canteenId,
    };
  }
  return await httpPost<UserSearchData, UserSearchQuery>('/user/search', queryData);
}
