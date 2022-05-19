import Search from "../src/components/search";
import Result from "../src/components/result";
import {Container} from "@mui/material";


function Home() {

  return (
    <>
      <Container>
        <Search/>
        <Result/>
      </Container>
    </>
  )
}

export default Home;
