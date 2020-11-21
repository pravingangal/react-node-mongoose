import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import EmpsLoginReducer from "../reducers/EmpsLoginReducer";




const store = createStore(  
    EmpsLoginReducer,
    composeWithDevTools(applyMiddleware(thunk))   
  );
  

export default store;
