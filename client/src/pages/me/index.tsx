import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import { RootState } from '@features';
import { MyPageTemplate, Profile, Tabs, ReviewList } from '@components';
import reviews from '../../assets/reviews';

const menus = [
  { title: '리뷰', path: '/me' },
  { title: '좋아요', path: '/me/likes' },
];

function Me(): React.ReactElement | null {
  const { me } = useSelector((state: RootState) => state.user);

  const isLoggedIn = me && me.id;

  useEffect(() => {
    if (!isLoggedIn) {
      console.log(me); // 새로고침시 null
      console.log('replace triggered');
      Router.replace('/');
    }
  }, [isLoggedIn]);

  if (!me) return null;

  return (
    <MyPageTemplate
      profile={<Profile userInfo={me} />}
      tabs={<Tabs menus={menus} />}
      reviewList={<ReviewList reviews={reviews} />}
      isLoading={false}
    />
  );
}

export default Me;
