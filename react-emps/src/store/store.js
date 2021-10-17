import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import EmpsLoginReducer from "../reducers/EmpsLoginReducer";
import EmpsEmailConfirmedReducer from "../reducers/EmpsEmailConfirmedReducer";

const rootReducer = combineReducers({
  EmpsLoginReducer,  
  EmpsEmailConfirmedReducer
});

const store = createStore(  
  rootReducer,
    composeWithDevTools(applyMiddleware(thunk))   
  );
  export default store;
