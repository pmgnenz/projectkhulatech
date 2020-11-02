import { TOKEN_CHANGE, DELETE_INFO,ADD_SITES,DELETE_SITES } from './types';

export const changet = (states) => (
  {
    type: TOKEN_CHANGE, 
    itstates: states
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

