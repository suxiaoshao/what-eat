import * as React from 'react';
import { AtBadge, AtButton } from 'taro-ui';
import { AllTagData } from '../../util/http/getUserInfo';
import './tagInfo.scss';

export default function TagInfo(props: AllTagData & { onClick(): void }) {
  return (
    <AtBadge value={props.tagNum} maxValue={99} className='tag-info'>
      <AtButton
        onClick={() => {
          props.onClick();
        }}
        size='small'
      >
        {props.tagName}
      </AtButton>
    </AtBadge>
  );
}
