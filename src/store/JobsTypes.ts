import { IJob, jobs } from '../JobsData';

export enum IJobsActionTypes {
  FETCH = 'JOB/FETCH',
  LOADING = 'JOB/LOADING',
  SET_ACTIVE_JOB = 'SET_ACTIVE_JOB'
}

export interface IJobFetchAction {
  type: IJobsActionTypes.FETCH;
  jobs: IJob[];
}

export interface IJobLoadingAction {
  type: IJobsActionTypes.LOADING;
}

export interface IJobSetActivJobAction {
  type: IJobsActionTypes.SET_ACTIVE_JOB;
  id: string;
}

export type JobsAction =
  | IJobFetchAction
  | IJobLoadingAction
  | IJobSetActivJobAction;

export interface IJobState {
  readonly jobs: IJob[];
  readonly jobsLoading: boolean;
  readonly job: IJob | null;
}
