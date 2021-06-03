import pink from '@material-ui/core/colors/pink';
import indigo from '@material-ui/core/colors/indigo';
import { createMuiTheme } from '@material-ui/core/styles';

export const errorColor = '#ff6666';
export const successColor = '#4dff4d';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink
  }
});

export default theme;
