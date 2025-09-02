import React from 'react';
import { Car } from '../../types';
import CarItem from './CarItem';

interface CarListProps {
  cars: Car[];
  onSelect: (car: Car) => void;
  onDelete: (id: number) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, onSelect, onDelete }) => {
  if (!Array.isArray(cars)) {
    return <div>Loading cars...</div>;
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarItem
          key={car.id}
          car={car}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CarList;
