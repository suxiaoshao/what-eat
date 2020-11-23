import * as React from 'react';
import { Text } from '@tarojs/components';

export default function MyIcon(props: {
  value: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
}): JSX.Element {
  return (
    <Text
      className={`md md-${props.value}${props.className ? ' ' + props.className : ''}`}
      style={{ fontSize: props.size ? props.size : 24, color: props.color ? props.color : '#fff' }}
      onClick={() => {
        props.onClick();
      }}
    />
  );
}
