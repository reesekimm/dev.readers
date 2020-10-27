import { delay, put, call } from 'redux-saga/effects';
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { actions as loadingActions } from 'features/loading';

export type ActionType =
  | ActionCreatorWithPayload<any, string>
  | ActionCreatorWithoutPayload<string>;
export type Request = (args?: any) => Promise<AxiosResponse<unknown>>;

export default function createRequestSaga(type: ActionType, request: Request) {
  const success = `${type}Success`;
  const failure = `${type}Failure`;

  return function* (action: PayloadAction): Generator {
    yield put(loadingActions.start(type.toString()));
    try {
      let result: any;
      if (typeof request === 'string') {
        yield delay(1000);
      } else {
        result = yield call(request, action.payload);
      }
      yield put({
        type: success,
        payload: result ? result.data : action.payload,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: failure,
        payload: e.response.data,
      });
    }
    yield put(loadingActions.finish(type.toString()));
  };
}
