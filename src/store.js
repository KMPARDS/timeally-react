import { applyMiddleware, createStore } from "redux";
import { network } from './env';

const initialState = {
  walletInstance: {},
  esInstance: {},
  nrtInstance: {},
  timeallyInstance: {},
  sipInstance: {},
  petInstance: {},
  providerInstance: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD-WALLET-INSTANCE':
      return {...state, walletInstance: action.payload};
    case 'LOAD-ES-INSTANCE':
      return {...state, esInstance: action.payload};
    case 'LOAD-NRT-INSTANCE':
      return {...state, nrtInstance: action.payload};
    case 'LOAD-TIMEALLY-INSTANCE':
      return {...state, timeallyInstance: action.payload};
    case 'LOAD-SIP-INSTANCE':
      return {...state, sipInstance: action.payload};
    case 'LOAD-PET-INSTANCE':
      return {...state, petInstance: action.payload};
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
    network === 'homestead' || console.log(e.message);
  }

  network === 'homestead' || console.group(action.type);
  network === 'homestead' || console.info('dispatching', action);
  let result = next(action);
  network === 'homestead' || console.log('next state', store.getState());
  network === 'homestead' || console.groupEnd();
  return result;
}

const store = createStore(reducer, initialState, applyMiddleware(walletChangeUpdater));

window.reduxStore = store;

export default store;
