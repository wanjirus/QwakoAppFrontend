import { createTheme, colors } from '@material-ui/core';
import shadows from './shadow';
import typography from './typography';

const theme = createTheme({
  palette: {

    background: {
      default: '#FFFFFF',
      custom:'#FFFFFF',
      paper: colors.common[100]
    },
    primary: {

      contrastText: '#636CA5',
      // main: '#ACBC99'
      // main: '#19FaEA'
      // main: '#ac7e9e
       main: '#8E7BAF'
      // main:'#636CA5'
   

    },
    customColor: {
      contrastText: '#9FB874',
      main: '#9FB874',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#483D8B',
      customColor: ''
    },
  },
  shadows,
  typography
});

export default theme;
