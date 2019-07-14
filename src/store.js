import { applyMiddleware, createStore } from "redux";

const initialState = {
  walletInstance: {},
  esInstance: {},
  timeallyInstance: {},
  providerInstance: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD-WALLET-INSTANCE':
      return {...state, walletInstance: action.payload};
    case 'LOAD-ES-INSTANCE':
      return {...state, esInstance: action.payload};
    case 'LOAD-TIMEALLY-INSTANCE':
      return {...state, timeallyInstance: action.payload};
    case 'LOAD-PROVIDER-INSTANCE':
      return {...state, providerInstance: action.payload}
    default:
      return state;
    }
};

// middleware
const walletChangeUpdater = store => next => action => {

  // we are getting action on every dispatch. can write logic to update the navbar set state.
  try {
    window.updateTheNavbar(action);
  } catch (e) {
    //console.log(e.message);
  }

  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
}

const store = createStore(reducer, initialState, applyMiddleware(walletChangeUpdater));

window.reduxStore = store;

export default store;
