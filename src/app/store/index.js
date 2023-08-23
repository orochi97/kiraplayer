import { createStore } from 'redux';
import reducer from './reducer';

export * from './action';

// Store
const store = createStore(reducer)

export default store;