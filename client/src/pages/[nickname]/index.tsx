import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '@features';
import { useInfiniteScroll } from '@hooks';
import { MyPageTemplate, Profile, Tabs, ReviewList } from '@components';
import { actions as reviewActions } from '../../features/review';
import { actions as userActions } from '../../features/user';

function Me(): React.ReactElement | null {
  const router = useRouter();
  const { nickname } = router.query;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { mainReviews, hasMoreReviews } = useSelector((state: RootState) => state.review);
  const { getUserReviews } = useSelector((state: RootState) => state.loading);

  const menus = [
    { title: '리뷰', path: `/${nickname}` },
    { title: '좋아요', path: `/${nickname}/likes` },
  ];

  useEffect(() => {
    dispatch(userActions.loadMyInfo());
    dispatch(userActions.loadUserInfo(nickname));
    dispatch(reviewActions.getUserReviews({ nickname, lastId: null }));
  }, []);

  const [lastId, setLastId] = useState<string | number>(mainReviews[mainReviews.length - 1]?.id);

  useEffect(() => {
    setLastId(mainReviews[mainReviews.length - 1]?.id);
  }, [mainReviews]);

  const lastReviewElementRef = useInfiniteScroll({
    hasMore: hasMoreReviews,
    loading: getUserReviews,
    lastId,
    callback: () => {
      dispatch(reviewActions.getUserReviews({ nickname, lastId }));
    },
  });

  return (
    <MyPageTemplate
      profile={<Profile userInfo={userInfo} />}
      tabs={<Tabs menus={menus} />}
      reviewList={<ReviewList reviews={mainReviews} lastReviewElementRef={lastReviewElementRef} />}
      isLoading={getUserReviews}
    />
  );
}

export default Me;
