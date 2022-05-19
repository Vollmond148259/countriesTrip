import React, { useState } from "react";
import { dataLoading, tryGetValue } from "../../redux/slice/countTest";
import {TextField, Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import map from "lodash/map";
function Test() {
  const dispatch = useDispatch();
  const val = useSelector((state) => state.countTest.value);
  const posts = useSelector((state) => state.countTest.postCollection);
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
      <p>{val}</p>
      {console.log(posts)}
      <Box>
        {map(posts, (post) => (
          <p>{post.title}</p>
        ))}
      </Box>
    </>
  );
}
export default Test;
