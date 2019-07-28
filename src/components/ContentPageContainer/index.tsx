import * as React from 'react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import './ContentPageContainer.scss';

import JobPage from '../JobPage';
import Sidbar from '../Sidbar';
import { IJob } from '../../JobsData';
import JobsList from '../JobsList';
import Title from '../Title';
import Pagination from '../Pagination';

interface IRoutes {
  path: string;
  exact?: boolean;
  sidebar?: React.ComponentType<any>;
  main: React.ComponentType<any>;
  header?: React.ComponentType<any>;
}

interface IContentPageState {
  job: IJob | null;
  lengthListOfJobs: number;
}

interface IContentPageProps {
  jobs: IJob[];
}

class ContentPage extends React.PureComponent<
  IContentPageProps,
  IContentPageState
> {
  public routes: IRoutes[] = [
    {
      path: '/positions',
      main: () => {
        return (
          <>
            <JobsList
              jobs={this.props.jobs}
              lengthListOfJobs={this.setlengthListOfJobs}
            />
            <Pagination
              lengthOfList={this.state.lengthListOfJobs}
              divider={50}
              activePage={1}
            />
          </>
        );
      },
      header: () => (
        <Title title={`Showing ${this.state.lengthListOfJobs} jobs`} />
      )
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
      ),
      sidebar: () => <Sidbar content={this.state.job} />
    },
    {
      path: '/companies/:company',
      main: (routProps: RouteComponentProps<{ company: string }>) => {
        const companyJobs = this.props.jobs.filter(
          job => job.company === routProps.match.params.company
        );
        this.setState({ job: companyJobs[0] });
        return (
          <JobsList
            jobs={companyJobs}
            lengthListOfJobs={this.setlengthListOfJobs}
          />
        );
      },
      header: (routProps: RouteComponentProps<{ company: string }>) => (
        <Title
          title={`Showing ${this.state.lengthListOfJobs} jobs at ${routProps.match.params.company}`}
        />
      ),
      sidebar: (routProps: RouteComponentProps<{ company: string }>) => {
        return <Sidbar content={this.state.job} />;
      }
    }
  ];

  constructor(props: IContentPageProps) {
    super(props);
    this.state = {
      job: null,
      lengthListOfJobs: 0
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
                <Switch>
                  {this.routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      component={route.sidebar}
                    />
                  ))}
                </Switch>
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

  private setlengthListOfJobs = (amount: number) => {
    this.setState({ lengthListOfJobs: amount });
  };
}

export default ContentPage;
