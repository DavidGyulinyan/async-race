import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCars, setPage, selectCar, deleteCar } from '../../store/slices/garageSlice';
import { Car } from '../../types';
import CarForm from './CarForm';
import CarList from './CarList';
import RaceControls from './RaceControls';
import Pagination from '../Common/Pagination';

const Garage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cars, currentPage, totalCount } = useSelector((state: RootState) => state.garage);
  
  useEffect(() => {
    dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);
  
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSelectCar = (car: Car | null) => {
    if (car) {
      dispatch(selectCar(car));
    } else {
      dispatch(selectCar(null));
    }
  };

  const handleDeleteCar = (id: number) => {
    dispatch(deleteCar(id));
  };
  
  return (
    <div className="garage">
      <h1>Garage</h1>
      <CarForm />
      <RaceControls />
      <CarList cars={cars} onSelect={handleSelectCar} onDelete={handleDeleteCar} />
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={7}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Garage;
