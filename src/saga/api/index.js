import axios from "axios";
const fetchArray=()=>axios.get("https://jsonplaceholder.typicode.com/posts")

export default fetchArray
