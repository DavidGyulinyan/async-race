import React from 'react';
import { Car } from '../../types';
import { useRace } from '../../hooks/useRace';
import './CarItem.css';

interface CarItemProps {
  car: Car;
  onSelect: (car: Car) => void;
  onDelete: (id: number) => void;
}

const CarItem: React.FC<CarItemProps> = ({ car, onSelect, onDelete }) => {
  const { raceStatus, startCar, stopCar } = useRace();
  const status = raceStatus.get(car.id);
  
  const handleStart = async () => {
    await startCar(car);
  };
  
  const handleStop = async () => {
    await stopCar(car.id);
  };
  
  return (
    <div className="car-item">
      <div className="car-controls">
        <button onClick={() => onSelect(car)}>Select</button>
        <button onClick={() => onDelete(car.id)}>Delete</button>
        <button onClick={handleStart} disabled={status !== undefined}>
          Start
        </button>
        <button onClick={handleStop} disabled={status === undefined}>
          Stop
        </button>
      </div>
      <div className="car-info">
        <span>{car.name}</span>
        <div 
          className="car-icon"
          style={{ 
            color: car.color,
            transform: status ? `translateX(${status.position}%)` : 'translateX(0)',
            transition: status ? `transform ${status.time}s linear` : 'none'
          }}
        >
          🚗
        </div>
      </div>
    </div>
  );
};

export default CarItem;
