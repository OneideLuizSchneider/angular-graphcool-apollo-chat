import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Apollo, ApolloModule } from 'apollo-angular';
import { onError } from 'apollo-link-error';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { ApolloLink } from 'apollo-link';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class ApolloConfigModule {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    const uri = 'https://api.graph.cool/simple/v1/cjkzujnek7amz0196f7zj9h5g';
    const http = httpLink.create({uri: uri});

    const linkError = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    apollo.create({
      link: ApolloLink.from([
        linkError,
        http
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: !environment.production
    });

  }

}
