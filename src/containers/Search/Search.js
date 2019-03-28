import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../components/ORGANISMS/Header-O/Header';
import FilmBody from '../../components/ORGANISMS/Discover-O/DiscoverBody';
import Spinner from '../../components/ATOMS/UI-A/Spinner-A/Spinner';
import * as actions from '../../store/actions/SearchActions';
import * as actionsTV from '../../store/actions/TVActions';
import * as actionsMovie from '../../store/actions/MoviesActions';
import * as u from '../../shared/Utility';
import c from './Search.module.scss';

class Search extends Component {
  state = { 
    currentQueryParams: ''
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const queryParams = params.get('q');
    this.props.onGetSearchbarResults(queryParams);
    this.setState({ currentQueryParams: queryParams });
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    if(!this.props.location.state || !this.props.location.state.modal) {
      const params = new URLSearchParams(this.props.location.search);
      const queryParams = params.get('q');
      
      if(queryParams !== this.state.currentQueryParams) {
        this.props.onGetSearchbarResults(queryParams);
        this.setState({ currentQueryParams: queryParams });
      }
    }
  }

  getFilmDetailsHandler = (videoId, videoType) => {
    if(videoType === 'tv') {      
      this.props.onGetTVDetails(videoId); 
    } else if(videoType === 'movie') {
      this.props.onGetMovieDetails(videoId); 
    }
  }

  arrowClickedHandler = (arrow) => {
    this.props.onChangeSearchList(arrow);
  }

  render() { 
    let listLength = this.props.listLength;
    let results = null;
    if(u.isArrayGT(this.props.results, 0)) {
      if(window.innerWidth <= 400) {
        listLength = 10;
      } else if(window.innerWidth <= 700) {
        listLength = 14;
      } else if(window.innerWidth <= 900) {
        listLength = 16;
      } 

      results = (
        <FilmBody
          context='discover'
          page={this.props.showPage}
          maxPage={this.props.maxPage}
          results={this.props.results}
          listLength={listLength}
          videoClicked={this.getFilmDetailsHandler}
          arrowClicked={this.arrowClickedHandler}
          isImgLoaded={!this.props.loading}
          isSearch
          hasPathPrefix />
      );
    }

    let pageTitle = 'Search';
    let resultsTitle = 'Results';
    if(this.state.currentQueryParams && this.state.currentQueryParams !== '') {
      pageTitle=['Searching for ', this.state.currentQueryParams, '...'].join('');
      resultsTitle = [this.props.totalResults, ' Results for ', this.state.currentQueryParams].join('');
    }

    return ( 
      <>
        <Spinner 
          loading={this.props.loadingInit} 
          pageTitle={pageTitle} />
        <div className={c.Search}>
          <Header context='search' headerTitle={resultsTitle} />
          {results}
        </div>
      </>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    results: state.search.searchResults,
    totalResults: state.search.totalResults,
    loadingInit: state.search.loadingInit,
    loading: state.search.loading,
    showPage: state.search.showPage,
    showLength: state.app.showLength,
    listLength: state.app.listLength

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetSearchbarResults: (query) => dispatch(actions.getSearchbarResults(query)),
    onChangeSearchList: (arrow) => dispatch(actions.changeSearchList(arrow)),
    onGetTVDetails: (tvId) => dispatch(actionsTV.getTVDetails(tvId)),    
    onGetMovieDetails: (movieId) => dispatch(actionsMovie.getMovieDetails(movieId))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));