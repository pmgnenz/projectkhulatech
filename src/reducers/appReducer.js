import { TOKEN_CHANGE, DELETE_INFO,ADD_SITES } from '../actions/types';

const initialState = {
  changedtoken: false
}


 const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_CHANGE:
      return {
        ...state,
        changedtoken: action.itstates
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