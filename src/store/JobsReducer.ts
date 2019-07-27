import { Reducer } from 'redux';
import { IJobState, IJobsActionTypes, JobsAction } from './JobsTypes';

const initJobsState: IJobState = {
  job: null,
  jobs: [],
  jobsLoading: false
};

export const jobsReduser: Reducer<IJobState, JobsAction> = (
  state = initJobsState,
  action
) => {
  switch (action.type) {
    case IJobsActionTypes.LOADING: {
      return { ...state, jobsLoading: true };
    }
    case IJobsActionTypes.FETCH: {
      return { ...state, jobs: action.jobs, jobsLoading: false };
    }
    case IJobsActionTypes.SET_ACTIVE_JOB: {
      const jobActive = state.jobs.filter(job => job.id === action.id);
      return { ...state, job: jobActive.length > 0 ? jobActive[0] : null };
    }
    default:
      return state;
  }
};
