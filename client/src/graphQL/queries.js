export const SIGN_IN = `
    mutation logIn($email: String!, $password: String!){
      login(email: $email password: $password) {
        userId
        email
        displayName
        createdAt
        token
        tokenExpire
      }
    }
    
    `;

export const TIMES = `
    query Times($creator: String!, $date: String!){
     times(test: {creator: $creator, date: $date}) {
       title
       _id
       project
       date
       startTime
       endTime
       h
       m
       s
     }
   }
   
  `;

export const ALL_TIMES = `query($creator: String!) {
  allTimes(filter: {creator: $creator}) {
    date
    project
    h
    m
    s
  }
}
`;
