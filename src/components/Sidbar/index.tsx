import * as React from 'react';
import { IJob } from '../../JobsData';

interface ISidebarProps {
  content: IJob | null;
}

const Sidbar: React.FunctionComponent<ISidebarProps> = props => {
  const { content } = props;
  return (
    <>
      {!content ? null : (
        <div className='card border--3 shadow-sm p-2 mb-2'>
          {content && (
            <div className='card-title border-bottom'>{content.title}</div>
          )}
          <div className='card-body'>
            {content && content.company_logo && (
              <img
                key={content.company_logo}
                className='img-fluid img-thumbnail mb-1'
                src={content.company_logo}
                alt=''
              />
            )}
            {content && content.company_url && (
              <a href={content.company_url} className='card-link'>
                {content.company_url}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidbar;
