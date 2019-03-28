import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/PeopleActions';
import * as actionsMovie from '../../store/actions/MoviesActions';
import * as actionsTV from '../../store/actions/TVActions';

import Header from '../../components/ORGANISMS/People-O/Header-O/Header';
import Body from '../../components/ORGANISMS/People-O/Body-O/Body';
import Spinner from '../../components/ATOMS/UI-A/Spinner-A/Spinner';
import c from './People.module.scss';

class People extends Component {
  componentDidMount() {    
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.onClearPersonDetails();
  }

  filmClickedHandler = (videoId, videoType) => {
    if(videoType === 'movie') {
      this.props.onGetMovieDetails(videoId);
    } else if(videoType === 'tv') {
      this.props.onGetTVDetails(videoId);
    }
  }

  render() {
    let header  = null,
        body    = null;

    const { profile } = this.props;

    if(profile) {
      header = (
        <Header
          backdrop={profile.backdrop}
          birthPlace={profile.birthPlace}
          birthday={profile.birthday}
          deathday={profile.deathday}
          department={profile.department}
          gender={profile.gender}
          name={profile.name}
          profilePicture={profile.profilePicture} />
      );
      
      body = (
        <Body 
          aka={profile.aka}
          bio={profile.bio}
          work={profile.work}
          filmClicked={this.filmClickedHandler} />
      );
    }

    let pageTitle = '';
    if(profile && profile.name) {
      pageTitle = profile.name;
    }

    return (
      <>
        <Spinner 
          loading={this.props.loadingInit}
          pageTitle={pageTitle} />
        <div className={c.People}>
          {header}
          {body}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.people.profile,
    loadingInit: state.people.loadingInit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearPersonDetails: () => dispatch(actions.clearPersonDetails()),
    onGetMovieDetails: (id) => dispatch(actionsMovie.getMovieDetails(id)),
    onGetTVDetails: (id) => dispatch(actionsTV.getTVDetails(id))
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(People);