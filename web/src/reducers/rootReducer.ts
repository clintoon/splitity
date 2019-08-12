import { combineReducers } from 'redux';

const reducers = {
  currentUser: (): null => {
    return null;
  },
};

const rootReducer = combineReducers(reducers);

export { rootReducer };
