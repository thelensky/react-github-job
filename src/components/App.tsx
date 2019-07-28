import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps
} from 'react-router-dom';

import Header from './Header';
import FormSearch from './FormSearch';
import ContentPage from './ContentPageContainer';
import './App.scss';
import { IJob } from '../JobsData';
import { connect } from 'react-redux';
import { fetchJobs, loading } from '../store/JobsActions';
import { IAplicationState } from '../store/Store';

interface IAppProps {
  fetchJobs: typeof fetchJobs;
  jobs: IJob[];
  loading: boolean;
}

interface IAppRouterProps extends RouteComponentProps {
  jobs: IJob[];
  loading: boolean;
}

class App extends React.Component<IAppProps> {
  public componentDidMount() {
    this.props.fetchJobs();
  }

  public render() {
    return (
      <Router>
        <Route
          // tslint:disable-next-line: jsx-no-lambda
          render={props => (
            <AppRouter
              {...props}
              loading={this.props.loading}
              jobs={this.props.jobs}
            />
          )}
        />
      </Router>
    );
  }
}

const AppRouter: React.FC<IAppRouterProps> = props => {
  return (
    <Route>
      <Header />
      <Switch>
        <div className='container mb-3'>
          <Route exact={true} path='/positions' component={FormSearch} />
          {['/proposition', '/companies'].map(route => (
            <Route
              key={route}
              path={`${route}`}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => {
                return (
                  <button
                    className='btn btn-link font-weight-bold small'
                    onClick={() => props.history.goBack()}
                  >
                    Go back
                  </button>
                );
              }}
            />
          ))}
        </div>
      </Switch>

      {props.loading ? (
        <div className='d-flex justify-content-center mt-5'>
          <div className='spinner-grow' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <ContentPage jobs={props.jobs} />
      )}
    </Route>
  );
};

const mapStateToProps = (store: IAplicationState) => ({
  loading: store.jobs.jobsLoading,
  jobs: store.jobs.jobs
});

const mapDispatchProps = (dispatch: any) => {
  return {
    fetchJobs: () => dispatch(fetchJobs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(App);
