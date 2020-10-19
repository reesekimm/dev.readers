import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';

import { RootState } from '@features';
import { MyPageTemplate, Profile, Tabs, ReviewList } from '@components';
import reviews from '../../assets/reviews';

function Likes(): React.ReactElement | null {
  const router = useRouter();
  const { nickname } = router.query;

  const { me } = useSelector((state: RootState) => state.user);

  const menus = [
    { title: '리뷰', path: `/${me?.nickname}` },
    { title: '좋아요', path: `/${me?.nickname}/likes` },
  ];

  const isLoggedIn = me && me.nickname === nickname;

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('replace triggered');
      Router.replace('/');
    }
  }, [isLoggedIn]);

  if (!me) return null;

  return (
    <MyPageTemplate
      profile={<Profile userInfo={me} />}
      tabs={<Tabs menus={menus} selectedMenuIndex={1} />}
      // reviewList={<ReviewList reviews={reviews} />}
      isLoading={false}
    />
  );
}

export default Likes;
