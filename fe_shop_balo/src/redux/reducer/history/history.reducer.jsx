import { createSlice } from '@reduxjs/toolkit';

export const historyReducer = createSlice({
  name: 'history',
  initialState: {
    key: 0,
    isDetailHistory: false,
    orderDetailById: {},
    checkReview:false,
  },
  reducers: {
    setIsDetailHistory: (state, action) => {
      state.isDetailHistory = action.payload;
    },
    setOrderDetailHistory: (state, action) => {
      state.orderDetailById = action.payload;
    },
    setCheckReview: (state, action) => {
      state.checkReview=action.payload;
    }
  },
});
export const { setIsDetailHistory, setOrderDetailHistory,setCheckReview } = historyReducer.actions;
export default historyReducer.reducer;
