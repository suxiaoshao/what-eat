import { Picker, View } from '@tarojs/components';
import * as React from 'react';
import { AtButton, AtDivider, AtFloatLayout } from 'taro-ui';
import MyIcon from '../../components/myIcon';
import { useCanteenList, useTagList } from '../../util/store/system';
import { CanteenData } from '../../util/http/getSystemInfo';
import { TagData } from '../../util/http/getUserInfo';

export default function FilterForm(props: {
  canteenId: number | undefined;
  onCanteenIdChange(value: number | undefined): void;
  tagList: number[] | undefined;
  onTagListChange(value: number[] | undefined): void;
}) {
  const [tagList] = useTagList();
  const [canteenList] = useCanteenList();
  const [open, setOpen] = React.useState<boolean>(false);
  const allCanteenList = React.useMemo<CanteenData[]>(
    () => [{ canteenId: undefined, canteenName: '全部' }].concat(canteenList),
    [canteenList],
  );
  const canteenIndex = React.useMemo<number>(() => {
    return allCanteenList.findIndex((value) => value.canteenId === props.canteenId);
  }, [allCanteenList, props.canteenId]);
  const unTagList = React.useMemo<TagData[]>(() => {
    return tagList.filter((value) => !props.tagList?.some((item) => item === value.tagId));
  }, [props.tagList, tagList]);
  return (
    <View className='filter-form'>
      <Picker
        rangeKey='canteenName'
        range={allCanteenList}
        mode='selector'
        value={canteenIndex}
        onChange={(value) => {
          props.onCanteenIdChange(allCanteenList[parseInt(value.detail.value as string)].canteenId);
        }}
      >
        <View className='filter-form-item'>
          选择餐厅 <MyIcon value='arrow-drop-down' color='#000000' />
        </View>
      </Picker>
      <AtFloatLayout
        title='标签选择'
        isOpened={open}
        onClose={() => {
          setOpen(false);
        }}
        className='filter-form-tag'
      >
        <AtDivider>已选中的标签</AtDivider>
        <View className='filter-form-se-tag'>
          {props.tagList?.map((value) => (
            <AtButton
              size='small'
              key={value}
              type='primary'
              onClick={() => {
                const newValue = [...props.tagList].filter((item) => item !== value);
                if (newValue.length === 0) {
                  props.onTagListChange(undefined);
                } else {
                  props.onTagListChange(newValue);
                }
              }}
            >
              {tagList.find((item) => item.tagId === value).tagName}
            </AtButton>
          ))}
        </View>
        <AtDivider>未选中的标签</AtDivider>
        <View className='filter-form-un-tag'>
          {unTagList.map((value) => (
            <AtButton
              size='small'
              key={value.tagId}
              onClick={() => {
                if (props.tagList === undefined) {
                  props.onTagListChange([value.tagId]);
                } else {
                  const newValue = [...props.tagList];
                  newValue.push(value.tagId);
                  props.onTagListChange(newValue);
                }
              }}
            >
              {value.tagName}
            </AtButton>
          ))}
        </View>
      </AtFloatLayout>
      <View
        className='filter-form-item'
        onClick={() => {
          setOpen(true);
        }}
      >
        选择标签 <MyIcon value='arrow-drop-down' color='#000000' />
      </View>
    </View>
  );
}
