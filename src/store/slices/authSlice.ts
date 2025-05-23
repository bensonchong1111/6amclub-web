import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  walletAddress: string | null;
  email: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  walletAddress: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
      state.isAuthenticated = true;
    },
    setEmailAuth: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.walletAddress = null;
      state.email = null;
    },
  },
});

export const { setWalletAddress, setEmailAuth, logout } = authSlice.actions;
export default authSlice.reducer;