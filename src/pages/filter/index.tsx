import * as React from 'react';
import { AtSearchBar } from 'taro-ui';
import 'taro-ui/dist/style/components/button.scss';
import './index.scss';
import Taber from "../../components/tabar/taber";

export default function Index(): JSX.Element {
  return (
    <Taber className='filter'>
      <AtSearchBar className='filter-search' value='' onChange={() => { }} />
      <view className='filter-content'></view>
    </Taber>
    
  );
}