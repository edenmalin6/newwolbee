import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // isLoading: true,
  header: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        role: action.payload.role,
        updateToken: action.payload.updateToken,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    // setLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    setLayout: (state, { payload }) => {
      state.layout = payload;
    },
    setToogleHeader: (state, { payload }) => {
      state.header = payload;
    },
  },
});

export const { login, logout,updateToken, setLoading, setLayout, setToogleHeader } =
  userSlice.actions;
export default userSlice.reducer;
