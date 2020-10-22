import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import { RootState } from '@features';
import { useInfiniteScroll } from '@hooks';
import { MyPageTemplate, Profile, Tabs, ReviewList } from '@components';
import { actions as reviewActions } from '../../features/review';
import { actions as userActions } from '../../features/user';
import { wrapper, SagaStore } from '../../store/configureStore';

function Likes(): React.ReactElement | null {
  const router = useRouter();
  const { nickname } = router.query;

  const dispatch = useDispatch();
  const { userInfo, loadUserInfoError } = useSelector((state: RootState) => state.user);
  const { mainReviews, hasMoreReviews } = useSelector((state: RootState) => state.review);
  const { getUserLikes } = useSelector((state: RootState) => state.loading);

  const menus = [
    { title: '리뷰', path: `/${nickname}` },
    { title: '좋아요', path: `/${nickname}/likes` },
  ];

  const [lastId, setLastId] = useState<string | number>(mainReviews[mainReviews.length - 1]?.id);

  useEffect(() => {
    setLastId(mainReviews[mainReviews.length - 1]?.id);
  }, [mainReviews]);

  const lastReviewElementRef = useInfiniteScroll({
    hasMore: hasMoreReviews,
    loading: getUserLikes,
    lastId,
    callback: () => {
      dispatch(reviewActions.getUserLikes({ nickname, lastId }));
    },
  });

  return (
    <MyPageTemplate
      nickname={nickname}
      profile={<Profile userInfo={userInfo} />}
      tabs={<Tabs menus={menus} />}
      reviewList={<ReviewList reviews={mainReviews} lastReviewElementRef={lastReviewElementRef} />}
      isLoading={getUserLikes}
      errorMessage={loadUserInfoError}
    />
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('===== getServerSideProps start =====');
    console.log('params : ', context.params);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(userActions.loadMyInfo());
    context.store.dispatch(userActions.loadUserInfo(context.params.nickname));
    context.store.dispatch(
      reviewActions.getUserLikes({ nickname: context.params.nickname, lastId: null })
    );

    context.store.dispatch(END);

    await (context.store as SagaStore).sagaTask.toPromise();
  }
);

export default Likes;
