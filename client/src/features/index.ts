import { AnyAction } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IReview } from '@types';
import { UserState, reducer as userReducer, initialState as userInitialState } from './user';
import { initialState as reviewInitialState, reducer as reviewReducer } from './review';
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
  review: IReview.ReviewState;
  search: SearchState;
  loading: LoadingState;
}

export default function createReducer() {
  const rootReducer = combineReducers({
    index: (
      state: RootState = {
        user: userInitialState,
        review: reviewInitialState,
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
    review: reviewReducer,
    search: searchReducer,
    loading: loadingReducer,
  });

  return rootReducer;
}
