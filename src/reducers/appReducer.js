import { ADD_INFO, DELETE_INFO } from '../actions/types';

const initialState = {
  infoList: []
}

 const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INFO:
      return {
        ...state,
        infoList: state.infoList.concat({
          id: action.id,
          email: action.email,
          username: action.username, 
          firstname: action.firstname,
          secondname:action.secondname,
          password: action.password, 
          userToken: action.userToken
        })
      };
    case DELETE_INFO:
      return {
        ...state,
        infoList: []
          
      };
    default:
      return state;
  }
}

export default appReducer;