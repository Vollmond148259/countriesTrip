import axios from "axios";

const fetchArray = () =>
  axios.get("https://jsonplaceholder.typicode.com/posts");

export const fetchUsers = () => axios.get("https://jsonplaceholder.typicode.com/users")

export default fetchArray;
