import Search from "../src/components/search"
import Result from "../src/components/result"
import store from "../src/redux/store"
import { Provider } from 'react-redux'
import {Container} from "@mui/material"
function Home() {
  return (
    <>
      <Provider store={store}>
        <Container >
    <Search/>
        <Result/>
        </Container>
      </Provider>
    </>
  )

}
export default Home
