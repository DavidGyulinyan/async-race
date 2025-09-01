import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createCar } from '../../store/slices/garageSlice';

const CarForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createCar({ name: name.trim(), color }));
      setName('');
      setColor('#000000');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <input
        type="text"
        placeholder="Car name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit">Create Car</button>
    </form>
  );
};

export default CarForm;
