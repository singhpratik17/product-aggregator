import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import Message from './components/Message';
import { SERVER_URL } from './envConstants';

const cache = new InMemoryCache();

const request = async operation => {
  operation.setContext({
    headers: {
      authorization: 'x'
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(
          ({ message, locations, path, extensions }, index) => {
            Message.error(message, index);
          }
        );
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        return null;
      }
    }),
    requestLink,
    new createUploadLink({
      uri: `http://${SERVER_URL}:8081/graphql`
    })
  ]),
  cache
});
