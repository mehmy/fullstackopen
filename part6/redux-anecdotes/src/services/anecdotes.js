import axios from 'axios';
import { getId } from '../reducers/anecdoteReducer';
const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseURL);
  console.log(response.data);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, id: getId(), votes: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
};

export default { getAll, createNew };
