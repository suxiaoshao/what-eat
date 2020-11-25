import {AtBadge, AtButton, AtFloatLayout} from 'taro-ui';
import {View} from '@tarojs/components';
import * as React from 'react';
import {DishTag} from '../../../../util/http/getDishInfo';
import './dishTag.scss';
import {useUserId} from '../../../../util/store/user';
import {postDishUpdateDishTag, PostDishUpdateDishTagData} from '../../../../util/http/postDishUpdateDishTag';
import {httpToast} from '../../../../util/http/httpToast';
import {useTagList} from '../../../../util/store/system';
import MyIcon from '../../../../components/myIcon';
import {TagData} from '../../../../util/http/getUserInfo';

export default function DishTagList(props: {
  tagList: DishTag[];
  dishId: number;
  onUpdateDishTag: (newValue: PostDishUpdateDishTagData[]) => void;
}): JSX.Element {
  const [userId] = useUserId();
  const [allTagList] = useTagList();
  const [open, setOpen] = React.useState<boolean>(false);
  // 被选择的tag
  const tagList = React.useMemo<DishTag[]>(() => {
    return props.tagList.filter((value) => value.tagNum > 0);
  }, [props.tagList]);
  // 未被选择的tag
  const unTagList = React.useMemo<TagData[]>(() => {
    return allTagList.filter((value) => !tagList.some((value1) => value1.tagId === value.tagId));
  }, [allTagList, tagList]);
  return (
    <>
      <View className='dish-tag-list'>
        {tagList.map((item) => {
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
                    const newValue = tagList.map<PostDishUpdateDishTagData>((value) => {
                      return value.tagId !== item.tagId ? value : data;
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
        <MyIcon
          hoverClass='dish-tag-add-hover'
          value='add'
          color='#000000'
          size={40}
          className='dish-tag-item dish-tag-add'
          onClick={() => {
            setOpen(true);
          }}
        />
      </View>
      {/*  浮层 */}

      <AtFloatLayout
        isOpened={open}
        onClose={() => {
          setOpen(false);
        }}
        title='添加标签'
      >
        <View className='dish-tag-list'>
          {unTagList.map((value) => {
            return (
              <AtButton
                key={value.tagId}
                size='small'
                className='dish-tag-item'
                onClick={() => {
                  httpToast(async () => {
                    return await postDishUpdateDishTag(userId, props.dishId, value.tagId);
                  }, '标记成功').then((data) => {
                    const newValue = [...tagList, data];
                    props.onUpdateDishTag(newValue);
                  });
                }}
              >
                {value.tagName}
              </AtButton>
            );
          })}
        </View>
      </AtFloatLayout>
    </>
  );
}
