import { DELETE_SITES,ADD_SITES } from '../actions/types';

const initialState = {
  siteList: []
}

const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SITES:
      tmp = []
      if(state.siteList.length > 0)
      {    
        found = false;
        for(let i = 0; i < action.data.length; i++){
              for(let j = 0; j < state.siteList.length; j++){
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
      if(tmp.length == 0)
      {
        return {
            ...state,
            siteList: state.siteList
      }
        }
      return {
        ...state,
        siteList: state.siteList.concat(tmp)
      };
    case DELETE_SITES:
        return {
          ...state,
          siteList: []
            
        };
    default:
      return state;
  }
}

export default siteReducer;