import { AnyAction } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IUser, IReview, ISearch, ILoading, IModal } from '@types';
import { reducer as userReducer } from './user';
import { reducer as reviewReducer } from './review';
import { reducer as searchReducer } from './search';
import { reducer as loadingReducer } from './loading';
import { reducer as modalReducer } from './modal';

export interface RootState {
  user: IUser.UserState;
  review: IReview.ReviewState;
  search: ISearch.SearchState;
  loading: ILoading.LoadingState;
  modal: IModal.ModalState;
}

export default function createReducer() {
  const rootReducer = (state: RootState | undefined, action: AnyAction) => {
    switch (action.type) {
      case HYDRATE:
        return action.payload;
      default: {
        const combinedReducer = combineReducers({
          user: userReducer,
          review: reviewReducer,
          search: searchReducer,
          loading: loadingReducer,
          modal: modalReducer,
        });
        return combinedReducer(state, action);
      }
    }
  };
  return rootReducer;
}
