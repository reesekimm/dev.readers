export interface UserState {
  logInDone: boolean;
  logInError: string | null;
  me: Me | null;
}

export interface User {
  id: number | string;
  nickname: string;
}

interface ReviewId {
  id: number | string;
}

interface Me {
  // TODO: 서버 연결 후 id type number로 고정
  id: number | string;
  nickname: string;
  Reviews: ReviewId[];
  Followings: User[];
  Followers: User[];
}
