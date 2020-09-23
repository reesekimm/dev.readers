import React, { useMemo } from 'react';
import { Rate } from 'antd';

import { Text, Button, Img } from '@components';
import { IBook } from '@types';
import * as S from './style';

interface Props extends IBook.Book {
  [key: string]: unknown;
  type?: 'list' | 'detailed';
  rating: number;
}

function BookInfo({
  title,
  author,
  publisher,
  pubDate,
  cover,
  rating,
  link,
  type = 'list',
  ...props
}: Props): React.ReactElement {
  const styles = useMemo(
    () => ({
      button: { position: 'absolute', right: 0, bottom: 0, padding: 0 },
      text: { lineHeight: 1.2 },
    }),
    []
  );

  const includeDetails = type === 'detailed';

  return (
    <S.Container {...props}>
      <S.ImageContainer>
        <Img src={cover} alt={title} />
      </S.ImageContainer>
      <div>
        <S.TextContainer>
          <Text tag="h2" fontSize="sm" fontWeight="medium">
            {title}
          </Text>
          <Text color="gray3" fontSize="xsm">
            {pubDate.slice(0, 4)}
          </Text>
        </S.TextContainer>
        {includeDetails && (
          <>
            <S.TextContainer className="hide">
              <Text fontSize="xsm" style={styles.text}>
                {author}
              </Text>
              <Text fontSize="xsm" style={styles.text}>
                {publisher}
              </Text>
            </S.TextContainer>
            <Button href={link} type="exLink" styleType="plain" style={styles.button}>
              자세히 보기
            </Button>
          </>
        )}
        <Rate disabled defaultValue={rating} allowHalf />
      </div>
    </S.Container>
  );
}

export default BookInfo;
