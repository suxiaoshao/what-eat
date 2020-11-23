import { Button, Picker, View } from '@tarojs/components';
import * as React from 'react';
import { AtButton, AtDivider, AtList, AtListItem, AtLoadMore } from 'taro-ui';
import { useRouter } from '@tarojs/taro';
import './index.scss';
import { useUserId } from '../../../util/store/user';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import { getUserInfo, TagData } from '../../../util/http/getUserInfo';
import MyIcon from '../../../components/myIcon';
import { httpToast } from '../../../util/http/httpToast';
import { postUserUpdateInfo } from '../../../util/http/postUserUpdateInfo';

export default function UpdateTag() {
  const [userId] = useUserId();
  const router = useRouter<{ mode: string }>();
  const [mode, setMode] = React.useState<number>(0);
  React.useEffect(() => {
    setMode(Number(router.params.mode));
  }, [router]);
  const [fn, loading, errorString, userTagList, setTagList] = useAsyncFunc(async () => {
    return await getUserInfo(userId);
  }, [userId]);
  React.useEffect(() => {
    fn();
  }, [fn]);
  const [modeList] = React.useState<string[]>(['修改喜欢标签', '修改忌口标签']);
  const preOtherList = React.useMemo<TagData[]>(() => {
    return userTagList?.allList?.filter((item) => {
      return !userTagList?.preferredList?.some((value) => {
        return item.tagId === value.tagId;
      });
    });
  }, [userTagList]);
  const aviOtherList = React.useMemo<TagData[]>(() => {
    return userTagList?.allList?.filter((item) => {
      return !userTagList?.avoidList?.some((value) => {
        return item.tagId === value.tagId;
      });
    });
  }, [userTagList]);
  return (
    <View className='update-tag'>
      <Picker
        className='update-tag-top'
        value={mode}
        mode='selector'
        range={modeList}
        onChange={(value) => {
          setMode(Number(value.detail.value));
        }}
      >
        <AtList>
          <AtListItem title='选择修改类型' extraText={modeList[mode]} />
        </AtList>
      </Picker>
      <View className='update-tag-content'>
        {loading || errorString != undefined ? (
          <AtLoadMore
            moreText={`${errorString},请点击重试`}
            status={loading ? 'loading' : 'more'}
            onClick={() => {
              fn();
            }}
          />
        ) : (
          <>
            <AtDivider>已选中的标签</AtDivider>
            <View className='update-tag-list'>
              {(mode === 0 ? userTagList.preferredList : userTagList.avoidList).map((item) => {
                return (
                  <AtButton
                    className='update-tag-item'
                    size='small'
                    type='primary'
                    key={item.tagId}
                    onClick={() => {
                      const newTagList = { ...userTagList };
                      if (mode === 0) {
                        newTagList.preferredList = newTagList.preferredList.filter((value) => {
                          return value.tagId != item.tagId;
                        });
                      } else {
                        newTagList.avoidList = newTagList.avoidList.filter((value) => {
                          return value.tagId != item.tagId;
                        });
                      }
                      setTagList(newTagList);
                    }}
                  >
                    {item.tagName}
                  </AtButton>
                );
              })}
            </View>
            <AtDivider>未选中的标签</AtDivider>
            <View className='update-tag-un-list'>
              {(mode === 0 ? preOtherList : aviOtherList).map((item) => {
                return (
                  <AtButton
                    onClick={() => {
                      const newTagList = { ...userTagList };
                      if (mode === 0) {
                        newTagList.preferredList.push(item);
                      } else {
                        newTagList.avoidList.push(item);
                      }
                      setTagList(newTagList);
                    }}
                    className='update-tag-item'
                    size='small'
                    key={item.tagId}
                  >
                    {item.tagName}
                  </AtButton>
                );
              })}
            </View>
            <Button
              className='update-tag-send-button'
              onClick={() => {
                httpToast(async () => {
                  return await postUserUpdateInfo(userId, userTagList.preferredList, userTagList.avoidList);
                }, '成功更新').finally(() => {
                  fn();
                });
              }}
            >
              <MyIcon className='update-tag-send-icon' value='send' size={25} color='#000' /> 确定修改
            </Button>
          </>
        )}
      </View>
    </View>
  );
}
