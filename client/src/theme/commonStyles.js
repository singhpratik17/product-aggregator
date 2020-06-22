import makeStyles from '@material-ui/core/styles/makeStyles';

export const commonStyles = {
  iconRegular: {
    height: '16px',
    width: '16px'
  },
  iconMedium: {
    height: '24px',
    width: '24px'
  },
  iconLarge: {
    height: '32px',
    width: '32px'
  }
};

export default makeStyles(theme => commonStyles);
