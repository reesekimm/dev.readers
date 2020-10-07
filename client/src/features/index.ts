import { AnyAction } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IUser, IReview, ISearch, ILoading } from '@types';
import { initialState as userInitialState, reducer as userReducer } from './user';
import { initialState as reviewInitialState, reducer as reviewReducer } from './review';
import { initialState as searchInitialState, reducer as searchReducer } from './search';
import { initialState as loadingInitialState, reducer as loadingReducer } from './loading';

export interface RootState {
  user: IUser.UserState;
  review: IReview.ReviewState;
  search: ISearch.SearchState;
  loading: ILoading.LoadingState;
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
