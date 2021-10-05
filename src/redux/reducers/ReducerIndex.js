import loggedReducer from './isLogged'
import sharedTitle from './SharedTitles'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    logged: loggedReducer,
    title: sharedTitle
})

export default allReducers