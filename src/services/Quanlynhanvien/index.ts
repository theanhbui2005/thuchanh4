import axios from 'axios';

export const getEmployees = async () => {
  const res = await axios.get('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole');
  return res;
};

export const getServices = async () => {
  const res = await axios.get('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole'); 
  return res;
};

export const getWorkSchedules = async () => {
  const res = await axios.get('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole');
  return res;
};