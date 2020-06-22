import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './clientConfig';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { muiTheme } from './theme';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={muiTheme}>
          <ApolloProvider client={client}>
            <Routes />
          </ApolloProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
