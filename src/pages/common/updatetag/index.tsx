import { Button, Picker, View } from '@tarojs/components';
import * as React from 'react';
import { AtButton, AtDivider, AtList, AtListItem, AtLoadMore, AtMessage } from 'taro-ui';
import { atMessage, navigateBack, usePullDownRefresh, useRouter } from '@tarojs/taro';
import './index.scss';
import { useUserId } from '../../../util/store/user';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import { AllTagData, getUserInfo } from '../../../util/http/getUserInfo';
import MyIcon from '../../../components/myIcon';
import { httpToast } from '../../../util/http/httpToast';
import { postUserUpdateInfo } from '../../../util/http/postUserUpdateInfo';
import { useTagList } from '../../../util/store/system';
import TagInfo from '../../../components/tagInfo/tagInfo';

export default function UpdateTag() {
  const [userId] = useUserId();
  const router = useRouter<{ mode: string }>();
  const [mode, setMode] = React.useState<number>(0);
  React.useEffect(() => {
    if (router.params.mode === undefined) {
      atMessage({
        message: '标记喜欢标签来推荐,忌口标签筛选推荐',
        type: 'error',
      });
      setMode(0);
    } else {
      setMode(Number(router.params.mode));
    }
  }, [router]);
  const [fn, loading, errorString, userTagList, setUserTagList] = useAsyncFunc(async () => {
    return await getUserInfo(userId);
  }, [userId]);
  React.useEffect(() => {
    fn();
  }, [fn]);
  usePullDownRefresh(() => {
    fn();
  });
  const [modeList] = React.useState<string[]>(['修改喜欢标签', '修改忌口标签']);
  const [allTagList] = useTagList();
  const preOtherList = React.useMemo<AllTagData[]>(() => {
    return allTagList?.filter((item) => {
      return !userTagList?.preferredList?.some((value) => {
        return item.tagId === value.tagId;
      });
    });
  }, [allTagList, userTagList]);
  const aviOtherList = React.useMemo<AllTagData[]>(() => {
    return allTagList?.filter((item) => {
      return !userTagList?.avoidList?.some((value) => {
        return item.tagId === value.tagId;
      });
    });
  }, [allTagList, userTagList]);
  return (
    <View className='update-tag'>
      <AtMessage />
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
                      setUserTagList(newTagList);
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
                  <TagInfo
                    {...item}
                    onClick={() => {
                      const newTagList = { ...userTagList };
                      if (mode === 0) {
                        newTagList.preferredList.push(item);
                      } else {
                        newTagList.avoidList.push(item);
                      }
                      setUserTagList(newTagList);
                    }}
                    key={item.tagId}
                  />
                );
              })}
            </View>
            <Button
              className='update-tag-send-button'
              onClick={() => {
                httpToast(async () => {
                  return await postUserUpdateInfo(userId, userTagList.preferredList, userTagList.avoidList);
                }, '成功更新').then(() => {
                  if (router.params.mode === undefined) {
                    navigateBack().then();
                  } else {
                    fn();
                  }
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
