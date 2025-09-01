import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Winner, SortBy, SortOrder } from '../../types';
import { winnersAPI } from '../../services/api';

interface WinnersState {
  winners: Winner[];
  currentPage: number;
  totalCount: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

const initialState: WinnersState = {
  winners: [],
  currentPage: 1,
  totalCount: 0,
  sortBy: 'id',
  sortOrder: 'ASC',
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async ({ page, sortBy, sortOrder }: { page: number; sortBy: SortBy; sortOrder: SortOrder }) => {
    const response = await winnersAPI.getWinners(page, 10, sortBy, sortOrder);
    return { winners: response, totalCount: 100 };
  }
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSort: (state, action: PayloadAction<{ sortBy: SortBy; sortOrder: SortOrder }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWinners.fulfilled, (state, action) => {
      state.winners = action.payload.winners;
      state.totalCount = action.payload.totalCount;
    });
  },
});

export const { setPage, setSort } = winnersSlice.actions;
export default winnersSlice.reducer;