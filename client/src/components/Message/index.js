import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import withTheme from '@material-ui/core/styles/withTheme';
import Snackbar from '@material-ui/core/Snackbar';

const GlobalMessage = props => {
  const { content, index } = props;

  return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        style={index > 0 ? {bottom: index * 80} : null}
        open={Boolean(content)}
        message={content}
      />
  );
};

class Message {
  static success(content, index) {
    this.message('success', content, index);
  }
  static warn(content, index) {
    this.message('warn', content, index);
  }
  static error(content, index) {
    this.message('error', content, index);
  }
  static message(type, content, index) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<GlobalMessage type={type} content={content} index={index}/>, container);
    setTimeout(() => {
      unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
    }, 3000);
  }
}

export default withTheme(Message);
