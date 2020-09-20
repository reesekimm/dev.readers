import React, { useCallback, useMemo } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import { Button } from '@components';
import { useInput } from '@hooks';
import * as S from './style';

interface Props {
  [key: string]: unknown;
}

function Search({ ...props }: Props): React.ReactElement {
  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!searchInput) return;
      console.log(searchInput);
      setSearchInput('');
    },
    [searchInput]
  );

  const iconStyle = useMemo(() => ({ color: '#616161', fontSize: '18px' }), []);

  return (
    <S.Container onSubmit={onSubmitHandler} {...props}>
      <label htmlFor="search_query">
        <S.StyledInput
          id="search_query"
          name="search_query"
          type="text"
          aria-label="검색창"
          placeholder="도서명을 검색해 보세요"
          value={searchInput}
          onChange={onChangeSearchInput}
        />
      </label>
      <Button btnType="submit" styleType="plain">
        <SearchOutlined style={iconStyle} />
      </Button>
    </S.Container>
  );
}

export default Search;
