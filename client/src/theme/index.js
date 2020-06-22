import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from './colors';
import { typography } from './typography';

const defaultTheme = createMuiTheme();

export const muiTheme = createMuiTheme({
  palette: {
    ...colors
  },
  typography: {
    ...typography
  },
  shape: {
    borderRadius: 1
  },

  // Component style overrides

  overrides: {}
});

export default muiTheme;
