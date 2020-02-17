import React from 'react';
import '../components/styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import api from '../api';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';
import PageLoading from '../components/PageLoading';

class Badges extends React.Component {
    state = {
      loading: true,
      error: null,
      data: undefined,
    };

    componentDidMount () {
      this.fetchData ();

      this.intervalId= setInterval(this.fetchData, 5000);
    } 

    componentWillUnmount(){
      clearInterval(this.intervalId)
    }

    fetchData = async () => {
      this.setState ({loading: true, error: null});
      
      try {
        const data = await api.badges.list();
        this.setState ({loading: false, data: data});
      } catch (error) {
        this.setState ({loading: false, error: error});
      }
    };

  render() {
 if (this.state.loading === true && !this.state.data === undefined) {
   return <PageLoading/> ;
 }
 if (this.state.error) {
  return <PageError error={this.state.error.message} />;
}

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <a href="/badges/new" className="btn btn-primary">
              New Badge
            </a>
            </div>
         
          <BadgesList badges={this.state.data} />
          {this.state.loading && <MiniLoader />}
        </div>
        </React.Fragment>
      );
  }
}

export default Badges;
