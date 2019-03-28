import axios from 'axios';

export const axiosTMDB3 = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});