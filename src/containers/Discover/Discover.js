import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/ATOMS/UI-A/Spinner-A/Spinner';
import Header from '../../components/ORGANISMS/Header-O/Header';
import DiscoverBody from '../../components/ORGANISMS/Discover-O/DiscoverBody';

import c from './Discover.module.scss';
import * as actions from '../../store/actions/DiscoverActions';
import * as actionsMovie from '../../store/actions/MoviesActions';
import * as actionsTV from '../../store/actions/TVActions';
import * as u from '../../shared/Utility';

class Discover extends Component {
  state = {
    filters: {
      sortBy: {
        inputType: 'select',
        value: 'Sort Order',
        hasDictionary: true,
        inputConfig: {
          name: 'sort_by',
          defaultVal: 'Sort Order'
        },
        options: [
          { text: 'Sort Order' },
          { text: 'Popularity: High to Low' },
          { text: 'Popularity: Low to High' },
          { text: 'Rating: High to Low' },
          { text: 'Rating: Low to High' },
          { text: 'Release Date: New to Old' },
          { text: 'Release Date: Old to New' },
          { text: 'Title: A to Z' },
          { text: 'Title: Z to A' },
          { text: 'Revenue: High to Low' },
          { text: 'Revenue: Low to High' }
        ]
      },
      year: {
        inputType: 'select',
        value: 'By Year',
        inputConfig: {
          name: 'primary_release_year',
          defaultVal: 'By Year'
        },
        options: u.getOptionsIntRange('By Year', 50, u.getCurrentYear(), 'desc')
      },
      rating: {
        inputType: 'select',
        value: 'By Rating',
        inputConfig: {
          name: 'vote_average.gte',
          defaultVal: 'By Rating'
        },
        options: u.getOptionsIntRange('By Rating', 10, 10, 'desc')
      },
      media: {
        inputType: 'select',
        value: 'Movie',
        inputConfig: {
          isMedia: true
        },
        options: [
          {text: 'Movie'}, 
          {text: 'TV'}
        ]
      },
      keywords: {
        inputType: 'text',
        value: '',
        inputConfig: {
          type: 'text',
          placeholder: 'Keywords',
          name: 'with_keywords'
        }
      },
      people: {
        inputType: 'text',
        value: '',
        inputConfig: {
          type: 'text',
          placeholder: 'People Involved',
          name: 'with_people'
        }
      }
    },
    initFilters: {
      media: { name: 'movie', value: 'Movie' },
      year: { name: 'primary_release_year', value: u.getCurrentYear() }
    },
    searchQueryPath: '',
    isLoaded: false
  }

  componentDidMount() {
    const { initFilters } = this.state,
          newPath = ['/discover?', initFilters.year.name, '=',initFilters.year.value, '&media=', initFilters.media.name].join('');
          
    this.setState({ searchQueryPath: newPath });
    this.props.onGetDiscoverInit(initFilters);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps,) {
    const { page: prevPage } = prevProps,
          { location, history, page, loading, listLength } = this.props;
    const { searchQueryPath, isLoaded } = this.state;
    
    if(searchQueryPath !== '' && prevPage !== page) {
      history.push(searchQueryPath.concat(['&page=', page].join('')))
    }

    if(listLength) {
      if(!isLoaded && !loading) { 
        this.setState({ isLoaded: true });
      } else if(isLoaded && loading && !location.state) {
        this.setState({ isLoaded: false });
      }
    }
  }
  
  updateInputValueHandler = (e, stateKey, updateKey) => {
    let newValue = '';
    if(e.target && e.target.value) {
      newValue = e.target.value;
    } else if(typeof e === 'string') {
      newValue = e;
    }
    
    this.setState({
      [stateKey]: u.setStateDirectChildValue(stateKey, updateKey, newValue, this.state)
    });
  }

  applyFiltersHandler = (e) => {
    e.preventDefault();
    const queries = {},
          path    = [];
    
    Object.entries(this.state.filters).forEach(([key, data]) => {
      let { inputConfig, value, inputType, hasDictionary } = data;
      let { name, defaultVal, isMedia } = inputConfig;

      if(inputType === 'select' && defaultVal !== value) {
        if(hasDictionary) {
          value = u.getDiscoverOrderQueryValue(value);
        }
        if(isMedia) {
          name = value.toLowerCase();
          path.push(['media', name].join('='));
        } else {
          path.push([name, value].join('='));
        }
        queries[key] = { name, value };
      } else if(inputType !== 'select' && value !== '') {
        path.push([name, value].join('='));
        queries[key] = { name, value };
      }
    });

    const { history, onGetDiscoverResults, page } = this.props;

    if(u.isObjNotEmpty(queries)) {
      const searchQueryPath = ['/discover?', path.join('&')].join(''),
            pushQueryPath   = [searchQueryPath, '&page=', page].join('');
      onGetDiscoverResults(queries);
      history.push(pushQueryPath);
      this.setState({ searchQueryPath });
    } else {
      history.push('/discover');
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
    this.props.onChangeDiscoverList(arrow);
  }

  render() {
    let discoverBody = (
      <DiscoverBody 
        context='discover'
        page={this.props.page}
        maxPage={this.props.maxPage}
        results={this.props.results}
        listLength={this.props.listLength}
        videoClicked={this.getFilmDetailsHandler}
        arrowClicked={this.arrowClickedHandler}
        mediaType={this.state.filters.media.value.toLowerCase()}
        isImgLoaded={this.state.isLoaded}
        isDiscover
        hasPathPrefix />
    );
    
    let resultsFound = null;
    if(!this.props.loading && !this.props.loadingInit) {
      if(this.props.results.length === 0) {
        discoverBody = <p className={c.Discover__NoResults}>{this.props.totalResults} results found</p>;
      } else {
        resultsFound = <p className={c.Discover__Results}>{this.props.totalResults} results found</p>;
      }
    }

    return (
      <> 
        <Spinner 
          loading={this.props.loadingInit} 
          pageTitle='Discover More' />
        <div className={c.Discover}>
          <Header
            headerTitle='Discover'
            context='discover'
            stateKey='filters'
            applyFilters={this.applyFiltersHandler}
            updateInputValue={this.updateInputValueHandler}
            filters={this.state.filters} />
          {resultsFound}
          {discoverBody}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.discover.results,
    totalResults: state.discover.totalResults,
    loadingInit: state.discover.loadingInit,
    loading: state.discover.loading,
    page: state.discover.showPage,
    loadedPage: state.discover.page,
    maxPage: state.discover.maxPage,
    listLength: state.app.listLength
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDiscoverInit: (query) => dispatch(actions.getDiscoverInit(query)),
    onGetDiscoverResults: (query) => dispatch(actions.getDiscoverResults(query)),
    onChangeDiscoverList: (arrow) => dispatch(actions.changeDiscoverList(arrow)),
    onGetMovieDetails: (movieId) => dispatch(actionsMovie.getMovieDetails(movieId)),
    onGetTVDetails: (tvId) => dispatch(actionsTV.getTVDetails(tvId))
  };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Discover);