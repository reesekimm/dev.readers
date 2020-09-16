import React, { useCallback } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import { useInput } from '@hooks';
import * as S from './style';

function Search(): React.ReactElement {
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

  return (
    <S.Container onSubmit={onSubmitHandler}>
      <label htmlFor="search_query">
        <S.StyledInput
          id="search_query"
          name="search_query"
          type="text"
          aria-label="도서검색"
          placeholder="도서명을 검색해 주세요."
          value={searchInput}
          onChange={onChangeSearchInput}
        />
      </label>
      <S.StyledButton type="submit">
        <SearchOutlined style={{ fontSize: '18px' }} />
      </S.StyledButton>
    </S.Container>
  );
}

export default Search;
