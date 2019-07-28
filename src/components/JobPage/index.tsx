import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IJob } from '../../JobsData';

interface IJobPageProps extends RouteComponentProps<{ id: string }> {
  handleId: (id: string) => void;
  job: IJob | null;
}

const JobPage: React.FC<IJobPageProps> = props => {
  React.useEffect(() => {
    if (props.match.params && props.match.params.id) {
      props.handleId(props.match.params.id);
    }
    window.scrollTo(0, 0)
  });

  return (
    <>
      {props.job && (
        <div className='card mx-2 border-0'>
          <div
            className='card-body'
            dangerouslySetInnerHTML={{ __html: props.job.description }}
          />
        </div>
      )}
    </>
  );
};

export default JobPage;
