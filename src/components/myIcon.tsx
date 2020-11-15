import * as React from 'react';
import { Text } from '@tarojs/components';

export default function MyIcon(props: {
  value: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}): JSX.Element {
  return (
    <Text
      className={`md md-${props.value}`}
      style={{ fontSize: props.size ? props.size : 24, color: props.color ? props.color : '#fff' }}
      onClick={() => {
        props?.onClick();
      }}
    />
  );
}
