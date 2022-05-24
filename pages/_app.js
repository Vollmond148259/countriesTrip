import store from "../src/redux/store";
import PropTypes from "prop-types"
import {Provider} from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import {CacheProvider} from '@emotion/react';
import {ThemeProvider} from '@mui/material/styles';

import createEmotionCache from '../src/components/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props
  return (
    <>
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps}/>
            <CssBaseline/>
          </ThemeProvider>
        </Provider>
      </CacheProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
}
export default MyApp
