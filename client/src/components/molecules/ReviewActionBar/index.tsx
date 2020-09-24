import React, { useCallback, useState } from 'react';
import { HeartOutlined, HeartFilled, MessageOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { Text, Button } from '@components';
import { IReview } from '@types';
import * as S from './style';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Props {
  id: IReview.Review.id;
  User: IReview.Review.User;
  createdAt: IReview.Review.createdAt;
  NumberOfComments: number;
  NumberOfLikes: number;
  onClickComment?: () => void;
}

function ReviewActionBar({
  id,
  User,
  createdAt,
  NumberOfComments,
  NumberOfLikes,
  onClickComment,
  ...props
}: Props): React.ReactElement {
  const [liked, setLiked] = useState(false);

  const toggleLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  return (
    <S.Container {...props}>
      <div>
        <Text color="gray5" fontSize="xsm" fontWeight="medium">
          {User.nickname}
        </Text>
        <Text color="gray4" fontSize="xsm">
          {dayjs(createdAt).fromNow()}
        </Text>
      </div>
      <div>
        {onClickComment && (
          <Button styleType="plain" onClick={onClickComment}>
            <S.ButtonContent>
              <MessageOutlined key="comment" />
              <Text color="gray4" fontSize="xsm">
                댓글 {NumberOfComments}
              </Text>
            </S.ButtonContent>
          </Button>
        )}
        <Button styleType="plain" onClick={toggleLiked}>
          <S.ButtonContent>
            {liked ? <HeartFilled key="heart" /> : <HeartOutlined key="like" />}
            <Text color="gray4" fontSize="xsm">
              좋아요 {NumberOfLikes}
            </Text>
          </S.ButtonContent>
        </Button>
      </div>
    </S.Container>
  );
}

export default ReviewActionBar;
