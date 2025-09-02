import { Car, Engine, SortBy, SortOrder, Winner } from "../types";

const BASE_URL = 'http://localhost:3000';

export const garageApi = {
    getCars:async (page: number, limit: number = 7):Promise<{cars: Car[], totalCount: number}> => {
        const response = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
        const cars = await response.json();
        const totalCount = parseInt(response.headers.get('X-Total-Count') || '0');
        return { cars, totalCount };
    },

    getCar:async(id:number):Promise<Car> => {
        const response = await fetch(`${BASE_URL}/garage/${id}`);
        return response.json();
    },

    createCar: async (car: Omit<Car, 'id'>): Promise<Car> => {
    const response = await fetch(`${BASE_URL}/garage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        return await response.json();
  },

    deleteCar: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/garage/${id}`, {
            method: 'DELETE',
        });
    },
}

export const engineAPI = {
  startEngine: async (id: number): Promise<Engine> => {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, { method: 'PATCH' });
        return await response.json();
  },
  
  stopEngine: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, { method: 'PATCH' });
      return await response.json();
  },
  
  drive: async (id: number): Promise<{ success: boolean }> => {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, { method: 'PATCH' });
      return await response.json();
  },
};

export const winnersAPI = {
  getWinners: async (page: number, limit: number = 10, sort?: SortBy, order?: SortOrder): Promise<Winner[]> => {
    let url = `${BASE_URL}/winners?_page=${page}&_limit=${limit}`;
    if (sort) url += `&_sort=${sort}&_order=${order?.toLowerCase()}`;
    const response = await fetch(url);
        return await response.json();
  },
  
};
