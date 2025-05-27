import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  walletAddress: string | null;
  email: string | null;
  username: string | null;
  uid: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  walletAddress: null,
  email: null,
  username: null,
  uid: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
      state.isAuthenticated = true;
    },
    setEmailAuth: (state, action: PayloadAction<{email: string; username: string; uid: string}>) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.uid = action.payload.uid;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.walletAddress = null;
      state.email = null;
      state.username = null;
      state.uid = null;
    },
  },
});

export const { setWalletAddress, setEmailAuth, logout } = authSlice.actions;
export default authSlice.reducer;