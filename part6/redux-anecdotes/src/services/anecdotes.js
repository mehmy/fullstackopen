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

const getElementById = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`);
  return response.data;
};

const updateVote = async (id) => {
  const toBeUpdated = await getElementById(id);
  toBeUpdated.votes += 1;
  const response = await axios.put(`${baseURL}/${id}`, toBeUpdated);
  return response.data;
};

export default { getAll, createNew, updateVote, getElementById };
