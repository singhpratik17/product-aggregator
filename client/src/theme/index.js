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
    borderRadius: 3
  },

  // Component style overrides

  overrides: {
    MuiToolbar: {
      root: {
        height: '122px',
        flexDirection: 'column'
      },
      gutters: {
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '35px',
        backgroundColor: colors.primary.light,
        color: colors.grey[200],
        padding: defaultTheme.spacing(0,2)
      }
    },
    MuiInputBase: {
      root: {
        '@media (min-width: 900px)': {
          minWidth: '520px',
        }
      },
    },
  }
});

export default muiTheme;
