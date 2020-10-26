import { ADD_INFO, DELETE_INFO,ADD_SITES,DELETE_SITES } from './types';

export const addInfo = (id1,email1,username1,firstname1,secondname1,
  password1, userToken1,userToken1id) => (
  {
    type: ADD_INFO,
    id: id1, 
    email: email1,
    username: username1, 
    firstname: firstname1,
    secondname:secondname1,
    password: password1, 
    userToken: userToken1,
    userTokenid: userToken1id
  }
);

export const deleteInfo = () => (
  {
    type: DELETE_INFO,
    
  }
);
export const Addsites = (datas) => (
  {
    type: ADD_SITES,
    data: datas

    
  }
);
export const Deletesites = () => (
  {
    type: DELETE_SITES
    
  }
);

