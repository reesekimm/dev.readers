export interface UserState {
  logInDone: boolean;
  logInError: string | null;
  me: Me | null;
}

export interface User {
  // TODO: DB 연동후 number로 고정
  id: number | string;
  nickname: string;
}

export interface Review {
  id: number | string;
  isbn13: string;
}

export interface Me {
  // TODO: DB 연동 후 id type number로 고정
  id: number | string;
  nickname: string;
  Reviews: Review[];
  Followings: User[];
  Followers: User[];
}
