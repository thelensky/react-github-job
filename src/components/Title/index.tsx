import * as React from 'react';

interface ITitleProps {
  title: string | null;
  suppertitle?: string | null;
}

const Title: React.FunctionComponent<ITitleProps> = props => {
  return (
    <>
      <p className='font-weight-normal small text-muted'>{props.suppertitle}</p>
      <h4 className='font-weight-bold'>{props.title}</h4>
    </>
  );
};

Title.defaultProps = {
  suppertitle: null
};

export default Title;
