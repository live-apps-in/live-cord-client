import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_DATA, USER_STATE } from "src/model";

const initialState: USER_STATE = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (_state: USER_STATE, action: PayloadAction<AUTH_DATA>) => ({
      ..._state,
      profile: {
        ...action.payload,
      },
    }),
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
