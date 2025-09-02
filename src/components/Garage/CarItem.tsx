import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Car } from "../../types";
import { useRace } from "../../hooks/useRace";
import { updateCar } from "../../store/slices/garageSlice";
import { AppDispatch, RootState } from "../../store";
import "./CarItem.css";

interface CarItemProps {
  car: Car;
  onSelect: (car: Car | null) => void;
  onDelete: (id: number) => void;
}

const CarItem: React.FC<CarItemProps> = ({ car, onSelect, onDelete }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { raceStatus, startCar, stopCar } = useRace();
  const selectedCar = useSelector((state: RootState) => state.garage.selectedCar);
  const status = raceStatus.get(car.id);
  const isSelected = selectedCar?.id === car.id;

  const [editName, setEditName] = useState(car.name);
  const [editColor, setEditColor] = useState(car.color);

  useEffect(() => {
    if (isSelected) {
      setEditName(car.name);
      setEditColor(car.color);
    }
  }, [isSelected, car.name, car.color]);

  const handleStart = async () => {
    await startCar(car);
  };

  const handleStop = async () => {
    await stopCar(car.id);
  };

  const handleSave = () => {
    dispatch(updateCar({ id: car.id, car: { name: editName, color: editColor } }));
    onSelect(null as any);
  };

  const handleCancel = () => {
    onSelect(null as any);
  };

  return (
    <div className={`car-item ${isSelected ? 'selected' : ''}`}>
      <div className="car-controls">
        <button onClick={() => onSelect(car)}>Update</button>
        <button onClick={() => onDelete(car.id)}>Delete</button>
        {isSelected ? (
          <div className="edit-form">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Car name"
            />
            <input
              type="color"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <span>{car.name}</span>
        )}
      </div>
      <div className="car-info">
        <button onClick={handleStart} disabled={status !== undefined}>
          Start
        </button>
        <button onClick={handleStop} disabled={status === undefined}>
          Stop
        </button>
        <div className="race-track">
          <div
            className="car-icon"
            style={{
              color: isSelected ? editColor : car.color,
              transform: status
                ? `translateX(${status.position}%)`
                : "translateX(0)",
              transition: status ? `transform ${status.time}s linear` : "none",
            }}
          >
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 18C6.34 18 5 16.66 5 15C5 13.34 6.34 12 8 12C9.66 12 11 13.34 11 15C11 16.66 9.66 18 8 18ZM32 18C30.34 18 29 16.66 29 15C29 13.34 30.34 12 32 12C33.66 12 35 13.34 35 15C35 16.66 33.66 18 32 18ZM37 7H31L28 2H12L9 7H3C1.9 7 1 7.9 1 9V15C1 16.1 1.9 17 3 17H5C5 19.21 6.79 21 9 21H11C13.21 21 15 19.21 15 17H25C25 19.21 26.79 21 29 21H31C33.21 21 35 19.21 35 17H37C38.1 17 39 16.1 39 15V9C39 7.9 38.1 7 37 7Z" />
            </svg>
          </div>
          <div className="car-item__finish-line">🏁</div>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
