import * as React from 'react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import './ContentPageContainer.scss';

import JobPage from '../JobPage';
import Sidbar from '../Sidbar';
import { IJob } from '../../JobsData';
import JobsList from '../JobsList';
import Title from '../Title';

interface IRoutes {
  path: string;
  exact?: boolean;
  sidebar?: React.ComponentType<any>;
  main: React.ComponentType<any>;
  header?: React.ComponentType<any>;
}

interface IContentPageState {
  job: IJob | null;
  showingJobs: number;
}

interface IContentPageProps {
  jobs: IJob[];
}

class ContentPage extends React.PureComponent<IContentPageProps, IContentPageState> {
  public routes: IRoutes[] = [
    {
      path: '/positions',
      main: () => {
        return (
          <JobsList jobs={this.props.jobs} activeJobs={this.setShowingJobs} />
        );
      },
      header: () => <Title title={`Showing ${this.state.showingJobs} jobs`} />
    },
    {
      path: '/proposition/:id',
      main: (routProps: RouteComponentProps<{ id: string }>) => (
        <JobPage
          {...routProps}
          job={this.state.job}
          handleId={this.setJobById}
        />
      ),
      header: () => (
        <Title
          title={this.state.job && this.state.job.title}
          suppertitle={
            this.state.job &&
            `${this.state.job.type} / ${this.state.job.location}`
          }
        />
      )
    }
  ];

  constructor(props: IContentPageProps ) {
    super(props);
    this.state = {
      job: null,
      showingJobs: 0,
    };
  }

  public render() {
    return (
      <div className='container'>
        <div className='content-border-wrap'>
          <div className='content'>
            <div className='row mb-3'>
              <div className='col mx-4 px-3 pt-3 pb-2 border-bottom'>
                {this.routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.header}
                  />
                ))}
              </div>
            </div>
            <div className='row'>
              <div className='col-8'>
                <Switch>
                  <Redirect exact={true} from='/' to='/positions' />
                  {this.routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      component={route.main}
                    />
                  ))}
                </Switch>
              </div>
              {/* sidebar */}
              <div className='col-4 px-4 py-1'>
                <Sidbar content={null} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private setJobById = (id: string | null) => {
    if (id) {
      const foundJob = this.props.jobs.filter(job => job.id === id);
      foundJob.length === 0
        ? this.setState({ job: null })
        : this.setState({ job: foundJob[0] });
    }
  };

  private setShowingJobs = (amount: number) => {
    this.setState({ showingJobs: amount });
  };
}

export default ContentPage;
