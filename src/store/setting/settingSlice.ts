import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SettingState {}

const initialState: SettingState = {};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {}
});

// Action creators are generated for each case reducer function
export const {} = settingSlice.actions;

export default settingSlice.reducer;
