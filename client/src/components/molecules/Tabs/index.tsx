import React from 'react';
import { useRouter } from 'next/router';

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
}

function Tabs({ menus, ...props }: Props): React.ReactElement {
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <S.Container {...props}>
      {menus.map((menu) => (
        <S.Tab key={menu.title} selected={currentPath === menu.path} numOfMenus={menus.length}>
          <Button styleType="plain" type="inLink" href={menu.path}>
            {menu.title}
          </Button>
        </S.Tab>
      ))}
    </S.Container>
  );
}

export default Tabs;
