import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import EmpsLoginReducer from "../reducers/EmpsLoginReducer";
import EmpsLoginEmailReducer from "../reducers/EmpsLoginEmailReducer";


const rootReducer = combineReducers({
  EmpsLoginReducer,
  EmpsLoginEmailReducer
});

const store = createStore(  
  rootReducer,
    composeWithDevTools(applyMiddleware(thunk))   
  );
  

export default store;
