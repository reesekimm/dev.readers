import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { Text } from '@components';
import { IReview } from '@types';
import * as S from './style';

dayjs.extend(relativeTime);
dayjs.locale('ko');

function Comment({ PostId, User, content, createdAt }: IReview.Comment): React.ReactElement {
  return (
    <S.Container>
      <div>
        <Text color="gray5" fontSize="xsm" fontWeight="medium">
          {User.nickname}
        </Text>
        <Text color="gray4" fontSize="xsm" style={{ marginLeft: '1rem' }}>
          {dayjs(createdAt).fromNow()}
        </Text>
      </div>
      {content}
    </S.Container>
  );
}

export default Comment;
