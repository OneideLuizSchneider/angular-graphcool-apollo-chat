import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-graphcool-chat';

  constructor(
    private apollo: Apollo
  ) {
    this.allUsers();
  }

  allUsers(): void {

    this.apollo.query({
      query: gql `
        query{
          allUsers{
            id
            name
            email
          }
        }`
    }).subscribe(res => console.log('query : ', res));

  }

  createUser(): void {

    const body = {
      query: `
        mutation CreateNewUser($name: String!, $email: String!, $password: String!){
          createUser(name: $name, email: $email, password: $password) {
            id
            name
            email
          }
        }`,
        variables: {
          name: 'Fletchat',
          email: 'fletchat@gmail.com',
          password: '123'
        }
    };

    this.apollo.mutate({
      mutation: gql `
        mutation CreateNewUser($name: String!, $email: String!, $password: String!){
          createUser(name: $name, email: $email, password: $password) {
            id
            name
            email
          }
        }`,
        variables: {
          name: 'Iron',
          email: 'iron@gmail.com',
          password: '123'
        }
    }).subscribe(res => console.log('query : ', res));


  }

}
