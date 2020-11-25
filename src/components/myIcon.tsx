import * as React from 'react';
import { Text, View } from '@tarojs/components';

export default function MyIcon(props: {
  value: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
  hoverClass?: string;
}): JSX.Element {
  return (
    <View
      className={props.className}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
      hoverClass={props.hoverClass}
      style={{
        height: 'auto',
        width: 'auto',
      }}
    >
      <Text
        className={`md md-${props.value}`}
        style={{ fontSize: props.size ? props.size : 24, color: props.color ? props.color : '#fff', display: 'block' }}
      />
    </View>
  );
}
