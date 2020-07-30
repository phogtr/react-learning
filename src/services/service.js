import axios from "axios";
const url = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(url);
  return req.then((res) => res.data);
};

const create = (obj) => {
  const req = axios.post(url, obj);
  return req.then((res) => res.data);
};

const update = (obj) => {
  const req = axios.put(`${url}/${obj.id}`, obj);
  return req.then((res) => res.data);
};

const remove = (id) => {
  const req = axios.delete(`${url}/${id}`);
  return req.then((res) => res.data);
};

export default { getAll, create, update, remove };
