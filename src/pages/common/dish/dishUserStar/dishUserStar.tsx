import { Button, View } from '@tarojs/components';
import * as React from 'react';
import { AtModal, AtModalAction, AtModalContent, AtModalHeader, AtRate } from 'taro-ui';
import './dishUserStar.scss';
import MyIcon from '../../../../components/myIcon';
import { httpToast } from '../../../../util/http/httpToast';
import { postDishUpdateDishStar } from '../../../../util/http/postDishUpdateDishStar';
import { useUserId } from '../../../../util/store/user';

export default function DishUserStar(props: {
  userStar: number;
  dishId: number;
  onChangeUserStar: (newValue: number) => void;
}): JSX.Element {
  const [userId] = useUserId();
  const [open, setOpen] = React.useState<boolean>(false);
  const [rateValue, setRateValue] = React.useState<number>(0);
  React.useEffect(() => {
    setRateValue(props.userStar);
  }, [props.userStar]);
  return (
    <View className='dish-user-star'>
      {props.userStar <= 0 ? (
        <Button
          className='dish-user-star-button'
          onClick={() => {
            setOpen(true);
          }}
        >
          <MyIcon value='star-border' size={25} color='#FFB544' className='dish-user-icon' /> 评分
        </Button>
      ) : (
        <View
          onClick={() => {
            setOpen(true);
          }}
          className='dish-user-star-value'
        >
          <AtRate size={40} value={props.userStar} />
          <View className='dish-user-star-desc'>你的评分</View>
        </View>
      )}
      <AtModal
        isOpened={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <AtModalHeader>评分</AtModalHeader>
        <AtModalContent>
          <View className='dish-user-star-model'>
            <AtRate
              onChange={(value) => {
                setRateValue(value);
              }}
              size={40}
              value={rateValue}
            />
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              httpToast(async () => {
                return await postDishUpdateDishStar(userId, props.dishId, rateValue);
              }, '评分成功').then((data) => {
                props.onChangeUserStar(rateValue);
                setOpen(false);
              });
            }}
          >
            确定评分
          </Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
}
