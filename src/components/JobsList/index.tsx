import * as React from 'react';

import JobItem from '../JobItem';
import { IJob } from '../../JobsData';
import { RouteComponentProps, withRouter } from 'react-router';

interface IJobsListProps extends RouteComponentProps {
  jobs: IJob[];
  lengthListOfJobs: (amount: number) => void;
}

interface ISearchParams {
  location?: string;
  description?: string;
  type?: string;
}

const JobsList: React.FunctionComponent<IJobsListProps> = props => {
  const serchParam = new URLSearchParams(props.location.search);
  const searchObj: ISearchParams = {};
  [...serchParam.keys()].forEach(key =>
    Object.assign(searchObj, { [key]: serchParam.get(key) })
  );

  const filteredJob = props.jobs.filter(job => {
    if (searchObj.description || searchObj.location || searchObj.type) {
      return (
        (searchObj.description &&
          job.description
            .toLocaleLowerCase()
            .indexOf(searchObj.description.toLocaleLowerCase()) > -1) ||
        (searchObj.location &&
          job.location
            .toLocaleLowerCase()
            .indexOf(searchObj.location.toLocaleLowerCase()) > -1) ||
        (searchObj.type && job.type.toLocaleLowerCase().indexOf('full') > -1)
      );
    }
    return true;
  });

  React.useEffect(() => {
    props.lengthListOfJobs(filteredJob.length)
  })

  return (
    <div>
      {filteredJob.map(job => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default withRouter(JobsList);
