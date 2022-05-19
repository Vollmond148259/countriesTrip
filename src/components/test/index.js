import React, {useState} from "react";
import {dataLoading, tryGetValue} from "../../redux/slice/countTest";
import {userLoading} from "../../redux/slice/userTest";
import {Box, Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import map from "lodash/map";


function Test() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.countTest.postCollection);
  const users = useSelector((state) => state.users.userCollection)

  const val = useSelector((state) => state.countTest.value);

  const [value, setValue] = useState(null);
  return (
    <>
      <TextField
        onChange={() => setValue(event.target.value)}
        variant="standard"
      />
      <Button onClick={() => dispatch(tryGetValue())} variant="contained">
        add value
      </Button>
      <Button onClick={() => dispatch(dataLoading())} variant="contained">
        get all planets
      </Button>
      <Button onClick={() => dispatch(userLoading())} variant="contained">
        get all users
      </Button>
      <p>{val}</p>
      {console.log(posts)}
      <Box>
        <p>RENDER ON CLIENT POSTS</p>
        {map(posts, (post) => (
          <p>{post.title}</p>
        ))}
        <p>RENDER ON CLIENT POSTS</p>
      </Box>
      {console.log("efwfee" + users)}
      <Box>
        {map(users, (user) => (
          <p>{user.name}</p>
        ))}
      </Box>
    </>
  );
}


export default Test;
