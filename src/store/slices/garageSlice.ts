import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '../../types';
import { garageApi } from '../../services/api';
import { CAR_BRANDS, CAR_MODELS, COLORS } from '../../constants';

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

export const deleteCar = createAsyncThunk(
  'garage/deleteCar',
  async (id: number) => {
    await garageApi.deleteCar(id);
    return id;
  }
);

export const updateCar = createAsyncThunk(
  'garage/updateCar',
  async ({ id, car }: { id: number; car: Omit<Car, 'id'> }) => {
    const response = await garageApi.updateCar(id, car);
    return response;
  }
);

export const generateCars = createAsyncThunk(
  'garage/generateCars',
  async () => {
    const carsToCreate: Omit<Car, 'id'>[] = [];
    for (let i = 0; i < 100; i++) {
      const brand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
      const model = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const name = `${brand} ${model}`;
      carsToCreate.push({ name, color });
    }
    const createdCars = await Promise.all(carsToCreate.map(car => garageApi.createCar(car)));
    return createdCars;
  }
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    selectCar: (state, action: PayloadAction<Car | null>) => {
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
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.cars = state.cars.filter(car => car.id !== action.payload);
      state.totalCount -= 1;
    });
    builder.addCase(updateCar.fulfilled, (state, action) => {
      const index = state.cars.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state.cars[index] = action.payload;
      }
    });
    builder.addCase(generateCars.fulfilled, (state, action) => {
      state.cars.push(...action.payload);
      state.totalCount += action.payload.length;
    });
  },
});

export const { setPage, selectCar } = garageSlice.actions;
export default garageSlice.reducer;
