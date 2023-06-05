import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

export const login = createAction(
    "[Login Page] User Login", // Action type   [the source of the action in the app][ event or command that the action correspond to ]
    props<{ user: User }>() // call utility fun props take one generic parameter
)
export const logout = createAction(
    "[Top menu]  Logout",
)


//  ng add  @ngrx/store
// ng add  @ngrx/store-devtools --save
//  he uses a command to add store to a feature module

//
//  action is a plain javascript object containg type and payload (data), type tell the store what to do with an action  depending on type the store call reducer
//  reducer is a function that we need to pass to the store so that the store knows how to react to a given action
//  store is like in memory database that contains data that is going to get shared by multiple components of the application __ Each component does not modify the state directly.Instead of each component that wants to modify the data will dispatch an action.And action is just a plain JavaScript payload containing some data and a type.The type tells to the store what to do with the action depending on the type the store is going to call a reducer function.The reducer function. it's a plain JavaScript function that.It's a new version of the state, so in this case, our authentication reducer to the previous value of the authentication state, which was an empty object, it took the value of the action.It took then the value of the user login action, which contains the user profile.And it has calculated then the new version of the authentication state, which is an object that containsthe user profile.So with these, we now have a clear understanding of these two critical notions of actions and reducers.





// Store init need and store update reducers. So store init is the ngrx store initial action that gets dispatched automatically at application start up time in order to initialize the default values of our store.On the other hand, whenever we add new feature modules to our application, each time that that happens,we are going to be triggering the update reducers action.So these actions can be useful in certain circumstances. If we want to trigger something in response to one of these initialization events.




