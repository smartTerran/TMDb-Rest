import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/ORGANISMS/Carousel-O/Carousel';
import Category from '../../components/ATOMS/FilmList-A/Category-A/Category';
import TVBody from '../../components/ORGANISMS/Discover-O/DiscoverBody';
import Spinner from '../../components/ATOMS/UI-A/Spinner-A/Spinner';

import * as actions from '../../store/actions/TVActions';
import * as u from '../../shared/Utility';
import c from './TV.module.scss';

class TV extends Component {
  carouselSlideRef  = React.createRef();

  state = {
    categoryNames: {
      airingToday: 'Airing Today', 
      onTheAir: 'On The Air', 
      popular: 'Popular'
    }
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.resizeSlide);
    this.props.onFetchTVInit();
    this.startInterval();
    window.scrollTo(0, 0);
  }
  
  componentWillUnmount() {
    clearInterval(this.timeoutID);
    window.removeEventListener('resize', this.resizeSlide);
    this.props.onResetTranslateTV();
  }
  
  componentDidUpdate() {
    if(this.modalOpened && this.props.history.action === 'POP' && (!this.props.location.state || !this.props.location.state.modal)) {
      this.startInterval();
      this.modalOpened = false;
    }    
  }
  
  // Start auto rotation of carousel
  startInterval = () => {
    this.timeoutID = setInterval(() => this.arrowClickedHandler('right'), 5000);
  }

  // Manual changing of carousel tv
  dotClickedHandler = (tvId) => {
    this.props.onChangeCarouselTV(tvId, this.carouselSlideRef.current);
    this.resetCarouselAutoSlide();
  }
  
  arrowClickedHandler = (arrow) => {
    this.props.onChangeCarouselTVArrow(arrow, this.carouselSlideRef.current, this.props.showLength);
    this.resetCarouselAutoSlide();
  }
  
  resetCarouselAutoSlide = () => {
    clearInterval(this.timeoutID);
    this.startInterval()
  }
  
  // Adjust carousel translate amount on window resize
  resizeSlide = () => { 
    this.props.onResizeCarouselSlide(this.carouselSlideRef.current);
  }

  // Get tv details
  getTVDetailsHandler = (tvId) => {
    this.props.onGetTVDetails(tvId); 
    clearInterval(this.timeoutID);
    this.modalOpened = true;
  }

  listArrowClickedHandler = (arrow, category) => {
    this.props.onChangeTVList(arrow, category);
  }

  render() { 
    let carousel    = null,
        content     = null,
        listLength  = 12,
        filmList    = [];
    
    if(window.innerWidth <= 400) {
      listLength = 4;
    } else if(window.innerWidth <= 600) {
      listLength = 6;
    } else if(window.innerWidth <= 900) {
      listLength = 10;
    }

    if(u.isObjNotEmpty(this.props.tv)) {
      const tvPathBase = this.props.location.pathname,
            airingTodayTV = this.props.tv['airingToday'].videos;
            
      carousel = <Carousel 
        videos={airingTodayTV.slice(0, this.props.showLength)}
        dotClicked={this.dotClickedHandler}
        arrowClicked={this.arrowClickedHandler}
        translateX={this.props.translateSlide}
        slideRef={this.carouselSlideRef}
        videoClicked={this.getTVDetailsHandler}
        pathBase={tvPathBase} />;

      Object.entries(this.props.tv).forEach(([key, tvList]) => {
        filmList.push(
          <Fragment key={tvList.category}>
            <Category category={this.state.categoryNames[key]} />
            <TVBody
              category={tvList.category}
              results={tvList.videos}
              context='main'
              listLength={listLength}
              page={this.props.showPage[key]}
              arrowClicked={this.listArrowClickedHandler}
              videoClicked={this.getTVDetailsHandler}
              pathBase={tvPathBase}
              isImgLoaded={!this.props.loading[key]} />
          </Fragment>
        );
      });
      

      content = (
        <>
          {carousel}
          <div className={c.TV__Body}>
            {filmList}
          </div>
        </>
      );
    }
    
    return ( 
      <>
        <Spinner loading={this.props.loadingInit} pageTitle='TV' />
        {content}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tv: state.tv.tv,
    loadingInit: state.tv.loadingInit,
    loading: state.tv.loading,
    translateSlide: state.tv.translateSlide,
    showPage: state.tv.showPage,
    showLength: state.app.showLength,
    listLength: state.app.listLength
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTVInit: () => dispatch(actions.fetchTVInit()),
    onChangeCarouselTV: (tvId, element) => dispatch(actions.changeCarouselTV(tvId, element)),
    onChangeCarouselTVArrow: (arrow, element, showLength) => dispatch(actions.changeCarouselTVArrow(arrow, element, showLength)),
    onResizeCarouselSlide: (element) => dispatch(actions.resizeCarouselSlideTV(element)),
    onChangeTVList: (arrow, category) => dispatch(actions.changeTVList(arrow, category)),
    onGetTVDetails: (tvId) => dispatch(actions.getTVDetails(tvId)),
    onResetTranslateTV: () => dispatch(actions.resetTranslateTV())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TV);