import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      primary: {main: '#333333', contrastText: '#FFFFFF'},
      background: {default: '#fafafa'},
      error: {main: '#EC5757'},
      info: {main: '#828282'},
    },
    typography: {
      fontFamily: 'SF Pro Display',
      fontWeightLight:'400',
      fontWeightRegular:'700',
      h3:{
        fontSize:'17px',
        fontWeight:'700',
      },
      h4:{
        fontSize:'14px',
        fontWeight:'400',
      },
    }
  }
  );