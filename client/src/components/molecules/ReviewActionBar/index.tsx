import React, { useCallback, useMemo, useState } from 'react';
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

  const styles = useMemo(
    () => ({
      button: { color: '#616161' },
      icon: { fontSize: '2rem', color: '#fc5c65' },
      text: { marginLeft: '0.5rem' },
    }),
    []
  );

  return (
    <S.Container {...props}>
      <div>
        <Text color="gray5" fontSize="xsm" fontWeight="medium">
          {User.nickname}
        </Text>
        <Text color="gray4" fontSize="xsm" style={styles.text}>
          {dayjs(createdAt).fromNow()}
        </Text>
      </div>
      <div>
        {onClickComment && (
          <Button styleType="plain" onClick={onClickComment} style={styles.button}>
            <S.ButtonContent>
              <MessageOutlined key="comment" style={{ ...styles.icon, color: '#616161' }} />
              <Text color="gray4" fontSize="xsm" style={styles.text}>
                댓글 {NumberOfComments}
              </Text>
            </S.ButtonContent>
          </Button>
        )}
        <Button styleType="plain" onClick={toggleLiked} style={styles.button}>
          <S.ButtonContent>
            {liked ? (
              <HeartFilled key="heart" style={styles.icon} />
            ) : (
              <HeartOutlined key="like" style={styles.icon} />
            )}
            <Text color="gray4" fontSize="xsm" style={styles.text}>
              좋아요 {NumberOfLikes}
            </Text>
          </S.ButtonContent>
        </Button>
      </div>
    </S.Container>
  );
}

export default ReviewActionBar;
