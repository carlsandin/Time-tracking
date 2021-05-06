export const REGISTER_USER = `mutation newUser($email: String!, $password: String!, $displayName: String!, $avatar: String) {
    createUser(userInput: {email: $email, password: $password, displayName: $displayName, avatar: $avatar}) {
      email
    }
  }
  `;

export const CREATE_TIME = `mutation newTime($title: String!, $date: String!, $creator: String!, $project: String!, $startTime: String!, $endTime: String!, $h: Int!, $m: Int!, $s: Int!){
  createTime(timeInput: {title: $title, date: $date, creator: $creator, project: $project, startTime: $startTime, endTime: $endTime, h: $h, m: $m, s: $s}) {
    title
    creator
  }
}`;

export const UPDATE_TIME = `mutation updateTime($id: ID!, $title: String!, $date: String!, $creator: String!, $project: String!, $startTime: String!, $endTime: String!, $h: Int!, $m: Int!, $s: Int!){
  updateTime(update: {_id: $id, title: $title, date: $date, creator: $creator, project: $project, startTime: $startTime, endTime: $endTime, h: $h, m: $m, s: $s}) {
    _id
    title
  }
}`;
