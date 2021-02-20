import { combineReducers } from 'redux';

const defaultUserState = {
  username: '',
  phoneNumber: '',
  pendingRequests: [],
  friends: [],
  favorites: {
    teams: [],
    players: []
  }
};

const userReducer = (state = defaultUserState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer
});