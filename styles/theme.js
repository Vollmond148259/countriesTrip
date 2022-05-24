import {createTheme} from '@mui/material';
// import IBMPlexSansRegular from "../public/fonts/IBM_Plex_Sans/IBM_Plex_Sans/IBMPlexSans-Bold.ttf"

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      ss: 380,
      sm: 600,
      md: 900,
      lg: 1200,
      bl: 1400,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#14072E',
      light: '#0059B2',

    },
    common: {
      text: '#1A76D2',
      black: '000000',
      main: '#FFFFFF',
      white: '#FFFFFF',
    },
    secondary: {
      main: '#6D8CAB',
      grey: '#B2BAC2',
      grey2: '#6a6e72',
      green: '#1DB45A',
      red: 'rgb(255, 80, 95)',
      blue: 'rgb(102, 178, 255)',
      blueStepper: '#99CCF3',
      clear: '#144F8A',
    },
    green: {
      main: '#1DB45A',
    },
    buttonOutlined: {
      main: 'rgba(51, 153, 255, 0.5)',
    },
    shadow: {
      main: '0 0 150px rgb(14, 75, 136)',
    },
    error: {
      main: '#FF001F',
      text: '#000000',
    },
    warning: {
      main: '#FFE7E8',
      text: '#000000',
      border: '#FFB274',
    },
    success: {
      main: '#C8FACD',
      text: '#000000',
      icon: '#1DB45A',
    },
    textfield: {
      main: "#22163B",
    },
    background: {
      skeleton: '#071B2F',
      search: "#21163B",
      button: "#21163B",
      //paper: '#22163B',
      default: '#0A081E',
      secondary: 'rgba(10, 25, 41, 0.5)',
      dark: '#071B2F',
    },
    searchlight: {
      main: '#132F4C',
    },
    text: {
      main: '#FFFFFF',
      additional: '#9391A9',
    },
    icon: {
      main: '#9391A9',
    },
    border: {
      main: '#1A76D2',
      secondary: 'rgb(30, 73, 118)',
    },
  },

  typography: {
    fontFamily: 'Roboto',
    p_terms: {
      fontWeight: 300,
      fontSize: 11,
    },
    button: {
      fontWeight: 500,
      fontSize: 16,
    }
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          label: {
            fontSize: 17,
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: {variant: 'outlined'},
          style: {
            minWidth: '170px',
            maxWidth: '200px',
            backgroundColor: '#15142B',
            '&:hover': {backgroundColor: '#6E42CA', color: "white"},
            borderRadius: 6,
            borderColor: '#6E42CA',
            color: "#6E42CA",
            textTransform: 'none',
            zIndex: 0,
          },
        },
        {
          props: {variant: 'containedDialog'},
          style: {
            backgroundColor: '#1A76D2',
            '&:hover': {backgroundColor: '#0052CC'},
            borderRadius: 10,
            textTransform: 'none',
            zIndex: 0,
          },
        },
      ],
    },

  },
});

export default theme;
