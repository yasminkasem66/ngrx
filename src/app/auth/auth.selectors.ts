// This is a mapping function, very similar to these mapping function that we have used here.But and like displaying the mapping function, the one created using the create selector utility has memory.So as long as our input state object does not change, the output is not going to be recalculated.This type of function is known in functional programming terms as a memorized function, meaning thatit keeps memory of previous executions and only executes itself if the inputs of the function have not been calculated before.After each new execution of the function, the memorized function is going to keep in the memory cache specific to the function. the result of each calculation.

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

// feature selector it's an easy  to access children of a selector map , the select of state is just a type safe version of these mapping function that we have
 
export const  selectAuthState= createFeatureSelector<AuthState>('auth')

export const isLoggedIn = createSelector(
    selectAuthState,
    auth=> !!auth.user
)
export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn=> !loggedIn
)