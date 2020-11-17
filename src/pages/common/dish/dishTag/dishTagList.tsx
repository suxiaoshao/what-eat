import { AtBadge, AtButton } from 'taro-ui';
import { View } from '@tarojs/components';
import * as React from 'react';
import { DishTag } from '../../../../util/http/getDishInfo';
import './dishTag.scss';
import { useUserId } from '../../../../util/store/user';
import { postDishUpdateDishTag, PostDishUpdateDishTagData } from '../../../../util/http/postDishUpdateDishTag';
import { httpToast } from '../../../../util/http/httpToast';

export default function DishTagList(props: {
  tagList: DishTag[];
  dishId: number;
  onUpdateDishTag: (newValue: PostDishUpdateDishTagData[]) => void;
}): JSX.Element {
  const [userId] = useUserId();
  return (
    <View className='dish-tag-list'>
      {props.tagList.map((item) => {
        return (
          <AtBadge className='dish-tag-item' key={item.tagId} value={item.tagNum}>
            <AtButton
              onClick={() => {
                httpToast(
                  async () => {
                    return await postDishUpdateDishTag(userId, props.dishId, item.tagId);
                  },
                  item.hasTagged ? '取消标记成功' : '标记成功',
                ).then((data) => {
                  const newValue = props.tagList.map<PostDishUpdateDishTagData>((value) => {
                    return value.tagId !== item.tagId
                      ? value
                      : {
                          hasTagged: !item.hasTagged,
                          tagNum: item.tagNum + (item.hasTagged ? -1 : 1),
                          tagName: item.tagName,
                          tagId: item.tagId,
                        };
                  });
                  props.onUpdateDishTag(newValue);
                });
              }}
              size='small'
              type={item.hasTagged ? 'primary' : undefined}
            >
              {item.tagName}
            </AtButton>
          </AtBadge>
        );
      })}
    </View>
  );
}
