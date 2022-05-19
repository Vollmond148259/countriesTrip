import store from "../src/redux/store";
import PropTypes from "prop-types"
import {Provider} from "react-redux";


function MyApp({Component, pageProps}) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps}/>
      </Provider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
}
export default MyApp
