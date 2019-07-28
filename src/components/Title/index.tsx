import * as React from 'react';

interface ITitleProps {
  title: string | null;
  suppertitle?: string | null;
}

const Title: React.FunctionComponent<ITitleProps> = props => {
  return (
    <>
      <div className='row'>
        <div className='col-11'>
          <p className='font-weight-normal small text-muted'>
            {props.suppertitle}
          </p>
          <h4 className='font-weight-bold'>{props.title}</h4>
        </div>
        <div className='col-1'>
          <select className='form-control form-control-sm'>
            {['All', 5, 10, 25, 50].map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

Title.defaultProps = {
  suppertitle: null
};

export default Title;
