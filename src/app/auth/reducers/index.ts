import {
  createReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
   user :User
}

export const initialAuthState: AuthState = {
  user : undefined
};

export const authReducer =createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action ) =>{
  //  state.user = action.user;
  //  return state;   this way make an error 

    return {
       user : action.user
    }
  }),
  on(AuthActions.logout, (state, action ) =>{
    return {
       user : undefined
    }
  }),

)




//we are going to define here a reducer function that takes the state and the action as inputs and returns as back a new instance of an authentication state object.So it's important, just like we did here in the login reducer to return here a new object instead of trying to modify the existing state that will help us ensure that we write correct reducers.So a reducer function always returns a new copy of the state and never mutate the existing state. Otherwise, our time traveling debugger that we are going to be using later on in the course would not work