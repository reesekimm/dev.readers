import { AnyAction } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { UserState, reducer as userReducer, initialState as userInitialState } from './user';
import {
  LoadingState,
  reducer as loadingReducer,
  initialState as loadingInitialState,
} from './loading';

export interface RootState {
  user: UserState;
  loading: LoadingState;
}

export default function createReducer() {
  const rootReducer = combineReducers({
    index: (
      state: RootState = {
        user: userInitialState,
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
    loading: loadingReducer,
  });

  return rootReducer;
}
