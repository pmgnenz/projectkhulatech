import { ADD_INFO, DELETE_INFO,ADD_SITES } from '../actions/types';

const initialState = {
  infoList: []
}
const initialState2 = {
  siteList: []
}
/*
const siteReducer = (state = initialState2, action) => {
  switch (action.type) {
    case ADD_SITES:
      tmp = []
      if(state.siteList.length() > 0)
      {    
        found = false;
        for(let i = 0; i < action.data.length(); i++){
              for(let j = 0; j < state.siteList.length(); j++){
                  if(action.data[i].id == state.siteList[j].id)
                  {
                    found = true;
                    continue;
                  }
                }
                if(found == false)
              {
                tmp.push(action.data[i])
              }
              found = false
      } 
      }else {
        tmp =action.data
    }
      return {
        ...state,
        siteList: state.siteList.concat(tmp)
      };
    default:
      return state;
  }
}
*/
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
          userToken: action.userToken,
          userTokenid: action.userTokenid
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