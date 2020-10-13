import React, { useState } from 'react';

import { Button } from '@components';
import * as S from './style';

interface Menu {
  /** 메뉴 이름 */
  title: string;
  /** 어플리케이션 내부 경로 (e.g. '/search') */
  path: string;
}

interface Props {
  [key: string]: unknown;
  menus: Menu[];
  selectedMenuIndex?: number;
}

function Tabs({ menus, selectedMenuIndex = 0, ...props }: Props): React.ReactElement {
  return (
    <S.Container {...props}>
      {menus.map((menu, i) => (
        <S.Tab key={menu.title} selected={selectedMenuIndex === i} numOfMenus={menus.length}>
          <Button
            styleType="plain"
            type="inLink"
            href={menu.path}
            style={{ color: selectedMenuIndex === i ? '#1e3799' : '#414141', width: '100%' }}
          >
            {menu.title}
          </Button>
        </S.Tab>
      ))}
    </S.Container>
  );
}

export default Tabs;
