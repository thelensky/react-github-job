import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { IJob } from '../JobsData';
import {
  IJobFetchAction,
  IJobLoadingAction,
  IJobState,
  IJobsActionTypes
} from './JobsTypes';

const fetchAPI = async (page: number) => {
  const url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=${page}`;
  return await axios
    .get<IJob[]>(url, {
      headers: {
        origin: 'x-requested-with'
      }
    })
    .then(res => res.data)
    .catch(e => []);
};

const getJobs = async () => {
  let jobs: IJob[] = [];
  let page = 0;
  let load = true;

  while (load) {
    const gotJobs = await fetchAPI(page);
    if (gotJobs.length > 0) {
      const filteredJobs = gotJobs.filter(jobData =>
        jobs.every(job => job.id !== jobData.id)
      );
      jobs = jobs.concat(filteredJobs);
      page++;
    } else {
      load = false;
    }
  }
  return jobs;
};

export const loading: ActionCreator<IJobLoadingAction> = () => ({
  type: IJobsActionTypes.LOADING
});

export const fetchJobs: ActionCreator<
  ThunkAction<Promise<AnyAction>, IJobState, null, IJobFetchAction>
> = () => async (dispatch: Dispatch) => {
  dispatch(loading());
  const jobs = await getJobs();
  return dispatch({
    type: IJobsActionTypes.FETCH,
    jobs
  });
};
