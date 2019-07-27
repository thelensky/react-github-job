import * as React from 'react';

import './FormSearch.scss';
import { RouteComponentProps } from 'react-router';

interface IFormSearchState {
  location: string;
  description: string;
  full_time: boolean;
}

class FormSearch extends React.Component<
  RouteComponentProps,
  IFormSearchState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      location: '',
      description: '',
      full_time: true
    };
  }

  public render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className='form-row align-items-end'>
          <div className='col-4'>
            <div className='form-group mb-2'>
              <label className='font-weight-bold small' htmlFor='description'>
                Job Description
              </label>
              <div className='input-group rounded-0 shadow-sm'>
                <div className='input-group-prepend bg-white'>
                  <span className='input-group-text description-prepend rounded-0' />
                </div>
                <input
                  type='text'
                  className='form-control rounded-0 border-left-0 shadow-none'
                  placeholder='Filter by title, benefits, companies, expertise'
                  id='description'
                  name='description'
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group mb-2'>
              <label className='font-weight-bold small' htmlFor='location'>
                Location
              </label>
              <div className='input-group rounded-0 shadow-sm'>
                <div className='input-group-prepend bg-white'>
                  <span className='input-group-text location-prepend rounded-0' />
                </div>
                <input
                  type='text'
                  className='form-control rounded-0 border-left-0 shadow-none'
                  placeholder='Filter by city, state, zip code of country'
                  id='location'
                  name='location'
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className='col-auto'>
            <div className='form-group form-check mb-2 mx-3 pb-2'>
              <input
                type='checkbox'
                className='form-check-input'
                id='full-field'
                name='full_time'
                checked={this.state.full_time}
                onChange={this.handleChange}
              />
              <label
                className='form-check-label font-weight-bold small'
                htmlFor='full-field'
              >
                Full Time Only
              </label>
            </div>
          </div>
          <div className='col-auto'>
            <button type='submit' className='btn btn-secondary mb-2'>
              Search
            </button>
          </div>
        </div>
      </form>
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name) {
      const {
        target: { name, value, checked, type }
      } = e;
      const newState = {
        ...this.state,
        [name]: type === 'checkbox' ? checked : value
      };
      this.setState(newState);
    }
  };

  private handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStr = Object.keys(this.state)
    .filter(key => !!this.state[key as keyof IFormSearchState])
    .map(
      key => `${key}=${this.state[key as keyof IFormSearchState]}`
    ).join('&')
    this.props.history.push(
      `/positions?${searchStr}`
    );
    this.setState({
      location: '',
      description: '',
      full_time: true
    })
  };
}

export default FormSearch;
