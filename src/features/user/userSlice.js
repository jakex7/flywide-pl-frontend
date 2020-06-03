import { createSlice } from '@reduxjs/toolkit';
import cookie from "react-cookies";

const initialStateWithCookie = {
  logged: cookie.load("isLogged") ? cookie.load("isLogged") : false,
  code: cookie.load("code") ? cookie.load("code") : null,
  user: {
    nickname: cookie.load("clientNickname") ? cookie.load("clientNickname") : null,
    uid: cookie.load("clientUid") ? cookie.load("clientUid") : null,
    dbid: cookie.load("clientDbid") ? cookie.load("clientDbid") : null,
  },
};
// const initialStateCopy = {
//   logged: false,
//   code: null,
//   user: {
//     nickname: null,
//     uid: null,
//     dbid: null,
//   },
// };

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateWithCookie,
  reducers: {
    logout: state => {
      cookie.remove("isLogged");
      cookie.remove('code');
      cookie.remove("clientNickname");
      cookie.remove("clientUid");
      cookie.remove("clientDbid");
      state.logged = false;
      state.code = null;
      state.user = {
        nickname: null,
        uid: null,
        dbid: null,
      };
    },
    login: (state, {payload}) => {
      state.logged = true;
      state.code = payload.code;
      state.user = {
        nickname: payload.nickname,
        uid: payload.uid,
        dbid: payload.dbid,
      };

      cookie.save('isLogged', true, { path: '/' });
      cookie.save('code', payload.code, { path: '/' });
      cookie.save('clientNickname', payload.nickname, { path: '/' });
      cookie.save('clientUid', payload.uid, { path: '/' });
      cookie.save('clientDbid', payload.dbid, { path: '/' });
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectIsLogged = state => state.user.logged;
export const selectCode = state => state.user.code;
export const selectNickname = state => state.user.user.nickname;

export default userSlice.reducer;
