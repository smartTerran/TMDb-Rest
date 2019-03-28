import { combineReducers } from 'redux';
import appReducer from './AppReducer';
import moviesReducer from './MoviesReducer';
import searchReducer from './SearchReducer';
import discoverReducer from './DiscoverReducer';
import tvReducer from './TVReducer';
import loginReducer from './LoginReducer';
import profileReducer from './ProfileReducer';
import peopleReducer from './PeopleReducer';

export default combineReducers(
  {
    movies: moviesReducer,
    tv: tvReducer,
    search: searchReducer,
    discover: discoverReducer,
    app: appReducer,
    login: loginReducer,
    profile: profileReducer,
    people: peopleReducer
  }
);