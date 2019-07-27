import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { IJobState } from './JobsTypes';
import { jobsReduser } from './JobsReducer';

export interface IAplicationState {
  jobs: IJobState;
}

const rootReducer = combineReducers<IAplicationState>({ jobs: jobsReduser });

export default function configStore(): Store<IAplicationState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
