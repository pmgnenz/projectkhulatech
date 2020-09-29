import { ADD_INFO, DELETE_INFO } from './types';

export const addInfo = (id1,email1,username1,firstname1,secondname1,
  password1, userToken1) => (
  {
    type: ADD_INFO,
    id: id1, 
    email: email1,
    username: username1, 
    firstname: firstname1,
    secondname:secondname1,
    password: password1, 
    userToken: userToken1
  }
);

export const deleteInfo = () => (
  {
    type: DELETE_INFO,
    
  }
);
