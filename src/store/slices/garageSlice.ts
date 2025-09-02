import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '../../types';
import { garageApi } from '../../services/api';

interface GarageState {
  cars: Car[];
  currentPage: number;
  totalCount: number;
  selectedCar: Car | null;
}

const initialState: GarageState = {
  cars: [],
  currentPage: 1,
  totalCount: 0,
  selectedCar: null,
};

export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async (page: number) => {
    const response = await garageApi.getCars(page);
    return response;
  }
);

export const createCar = createAsyncThunk(
  'garage/createCar',
  async (car: Omit<Car, 'id'>) => {
    const response = await garageApi.createCar(car);
    return response;
  }
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    selectCar: (state, action: PayloadAction<Car>) => {
      state.selectedCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload.cars;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.cars.push(action.payload);
      state.totalCount += 1;
    });
  },
});

export const { setPage, selectCar } = garageSlice.actions;
export default garageSlice.reducer;
