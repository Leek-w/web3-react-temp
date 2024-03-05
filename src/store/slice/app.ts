import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "..//createAppSlice"

export interface AppSliceState {
  isPC: boolean
  status: "idle" | "loading" | "failed"
}

const initialState: AppSliceState = {
  isPC: true,
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const AppSlice = createAppSlice({
  name: "App",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    setIsPC: (state: { isPC: boolean }, action: PayloadAction<boolean>) => {
      state.isPC = action.payload
    },
  }),
})

// Action creators are generated for each case reducer function.
export const { setIsPC } = AppSlice.actions
