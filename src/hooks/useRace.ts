import { useState, useCallback } from 'react';
import { Car, RaceStatus } from '../types';
import { engineAPI } from '../services/api';

export const useRace = () => {
  const [raceStatus, setRaceStatus] = useState<Map<number, RaceStatus>>(new Map());
  
  const startCar = useCallback(async (car: Car) => {
    try {
      const engine = await engineAPI.startEngine(car.id);
      const driveResponse = await engineAPI.drive(car.id);
      
      if (driveResponse.success) {
        const time = engine.distance / engine.velocity;
        setRaceStatus(prev => new Map(prev).set(car.id, {
          id: car.id,
          position: 100,
          finished: true,
          time,
          success: true,
        }));
        return { success: true, time };
      } else {
        setRaceStatus(prev => new Map(prev).set(car.id, {
          id: car.id,
          position: 0,
          finished: false,
          time: 0,
          success: false,
        }));
        return { success: false, time: 0 };
      }
    } catch (error) {
      console.error('Error starting car:', error);
      return { success: false, time: 0 };
    }
  }, []);
  
  const stopCar = useCallback(async (carId: number) => {
    try {
      await engineAPI.stopEngine(carId);
      setRaceStatus(prev => {
        const newStatus = new Map(prev);
        newStatus.delete(carId);
        return newStatus;
      });
    } catch (error) {
      console.error('Error stopping car:', error);
    }
  }, []);
  
  return { raceStatus, startCar, stopCar };
};