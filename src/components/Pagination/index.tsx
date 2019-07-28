import * as React from 'react';
// import { RouteComponentProps } from 'react-router';

interface IPaginationProps {
  lengthOfList: number;
  divider: number;
  activePage: number;
}

const Pagination: React.FunctionComponent<IPaginationProps> = props => {
  console.log(props.lengthOfList, props.divider)
  const amountOfPages = new Array(Math.ceil(props.lengthOfList / props.divider)).fill(0)
  console.log(props.lengthOfList, props.divider, amountOfPages)
  return (
    <nav className="d-flex justify-content-center">
      <ul className='pagination'>
        <li className='page-item'>
          <a className='page-link' href='#' aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
          </a>
        </li>
        {amountOfPages.map((val, index) => (
          <li className='page-item' key={index}>
            <a className='page-link' href='#'>
              {index + 1}
            </a>
          </li>
        ))}
        <li className='page-item'>
          <a className='page-link' href='#' aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
