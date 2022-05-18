import axios from "axios";
function fetchArray(){
  const result=axios.get("https://jsonplaceholder.typicode.com/posts")
  console.log(result)
  return(result)
}
export default fetchArray
