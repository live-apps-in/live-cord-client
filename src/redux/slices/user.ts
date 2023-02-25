import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_STATE, USER_PROFILE } from "src/model";

const initialState: USER_STATE = {
  profile: {
    donor_registered: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (
      _state: USER_STATE,
      action: PayloadAction<Partial<USER_PROFILE>>
    ) => ({
      ..._state,
      profile: {
        ...action.payload,
      },
    }),
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
