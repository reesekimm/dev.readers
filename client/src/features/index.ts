import { AnyAction } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { UserState, reducer as userReducer, initialState as userInitialState } from './user';
import {
  SearchState,
  reducer as searchReducer,
  initialState as searchInitialState,
} from './search';
import {
  LoadingState,
  reducer as loadingReducer,
  initialState as loadingInitialState,
} from './loading';

export interface RootState {
  user: UserState;
  search: SearchState;
  loading: LoadingState;
}

export default function createReducer() {
  const rootReducer = combineReducers({
    index: (
      state: RootState = {
        user: userInitialState,
        search: searchInitialState,
        loading: loadingInitialState,
      },
      action: AnyAction
    ) => {
      switch (action.type) {
        case HYDRATE:
          return {
            ...state,
            ...action.payload,
          };
        default:
          return state;
      }
    },
    user: userReducer,
    search: searchReducer,
    loading: loadingReducer,
  });

  return rootReducer;
}
