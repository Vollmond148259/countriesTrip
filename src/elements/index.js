import { Button, styled, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import theme from '../../styles/theme';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: '10px',
  backgroundColor: theme.palette.background.search,
  fontSize: 20,
  '& label': {
    fontSize: 20,
    color: theme.palette.text.additional,
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
  '& label.Mui-focused': {
    fontSize: 20,
    color: theme.palette.text.main,
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.additional,
    '&:focused': {
      color: theme.palette.text.additional,
    },
  },
  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  height: '35px',
  paddingLeft: '50px',
  paddingRight: '50px',
  borderRadius: '50px',
  textTransform: 'none',
  backgroundColor: theme.palette.background.button,
  '&:hover': {
    '&:hover': {
      backgroundColor: '#6E42CA',
    },
  },
}));
export const StyledList = styled(Box)(() => ({
  backgroundColor: theme.palette.background.default,
}));
