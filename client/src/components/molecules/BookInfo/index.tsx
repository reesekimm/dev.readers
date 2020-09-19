import React, { useMemo } from 'react';
import { Rate } from 'antd';

import { Text, Button, Img } from '@components';
import { IBook } from '@interfaces';
import * as S from './style';

interface Props extends IBook.Book {
  [key: string]: unknown;
  type: string;
  rating: number;
}

function BookInfo({
  title,
  author,
  publisher,
  pubDate,
  cover,
  description,
  rating,
  link,
  type,
  ...props
}: Props): React.ReactElement {
  const buttonStyle = useMemo(
    () => ({ position: 'absolute', right: 0, bottom: 0, padding: 0 }),
    []
  );

  const includeDetails = type !== 'list';

  return (
    <S.Container {...props}>
      <S.Summary>
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
          {includeDetails ? (
            <>
              <S.TextContainer className="hide">
                <Text fontSize="xsm">{author}</Text>
                <Text fontSize="xsm">{publisher}</Text>
              </S.TextContainer>
              <Button href={link} type="exLink" styleType="plain" style={buttonStyle}>
                자세히 보기
              </Button>
            </>
          ) : (
            <Rate disabled defaultValue={rating} allowHalf style={buttonStyle} />
          )}
        </div>
      </S.Summary>
      {includeDetails && <Text fontSize="sm">{description}</Text>}
    </S.Container>
  );
}

export default BookInfo;
