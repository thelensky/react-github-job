import * as React from 'react';
import { Link } from 'react-router-dom';

import { IJob } from '../../JobsData';

interface IJobItem {
  job: IJob;
}

const JobItem: React.FunctionComponent<IJobItem> = props => {
  return (
    <div className='row mx-4 border-bottom mb-3'>
      <div className='col-7 px-0'>
        <h6>
          <Link to={`/proposition/${props.job.id}`} className='text-primary '>
            {props.job.title}
          </Link>
        </h6>
        <p className='text-black-50'>
          {/* TODO find all proposition this company  "/company/:name" -> list of propsitions */}
          <a className='text-black-50' href='#'>
            {props.job.company}{' '}
          </a>
          {' – '}
          <span className='text-success font-weight-bold'>
            {props.job.type}
          </span>
        </p>
      </div>
      <div className='col-5 text-right px-0'>
        <p className='text-black-50 mb-0 small'>{props.job.location}</p>
        {/* TODO const timeAgo = (data): Date => sting */}
        <p className='text-black-50 mb-0 small'>{props.job.created_at}</p>
      </div>
    </div>
  );
};

export default JobItem;
