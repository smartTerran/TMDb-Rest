import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  imgConfig: null,
  tvGenres: null,
  listLength: null,
  loadingInit: false,
  loading: {
    airingToday: false,
    onTheAir: false,
    popular: false
  },
  loadingDetails: false,
  currentTVDetails: null,
  tv: {},
  searchString: {},
  page: null,
  maxPage: null,
  showPage: null,
  error: null,
  translateSlide: 0
};

// =========================== //
//     FETCHING TV FROM API    //
// =========================== //
const fetchTVStart = (state, action) => {
  const { listLength, imgConfig, tvGenres, showPage } = action;
  return { ...state, loadingInit: true, listLength, imgConfig, tvGenres, showPage };
};

const fetchTVInitSuccess = (state, action) => {
  const { fetchedTV, hasLooped, loopAgain, page, searchString } = action,
        {imgConfig, tvGenres} = state;
  
  const tv  = {},
        maxPage = {
          airingToday: fetchedTV['airingToday'].total_pages,
          onTheAir: fetchedTV['onTheAir'].total_pages,
          popular: fetchedTV['popular'].total_pages 
        };

  let airingToday  = null,
      onTheAir    = null,
      popular     = null,
      baseUrlBackdrop = u.getBaseUrl(imgConfig, 'backdrop', 3),
      baseUrlPoster   = u.getBaseUrl(imgConfig, 'poster', 1),
      baseUrl         = [baseUrlBackdrop, baseUrlPoster];

  // Extracting relevant data
  if(!hasLooped || loopAgain['airingToday']) {
    airingToday = u.filterByVideoData(fetchedTV['airingToday'].results, 'langImg');
    tv.airingToday = u.updateCategory('Airing Today', u.updateInitData(airingToday, baseUrl, tvGenres));
    if(loopAgain['airingToday']) {
      tv.airingToday.videos = state.tv.airingToday.videos.concat(tv.airingToday.videos);
    }
  }

  if(!hasLooped || loopAgain['onTheAir']) {
    onTheAir = u.filterByVideoData(fetchedTV['onTheAir'].results, 'langImg');
    tv.onTheAir = u.updateCategory('On The Air', u.updateInitData(onTheAir, baseUrl));
    if(loopAgain['onTheAir']) {
      tv.onTheAir.videos = state.tv.onTheAir.videos.concat(tv.onTheAir.videos);
    }
  }

  if(!hasLooped || loopAgain['popular']) {
    popular = u.filterByVideoData(fetchedTV['popular'].results, 'langImg');
    tv.popular = u.updateCategory('Popular', u.updateInitData(popular, baseUrl))
    if(loopAgain['popular']) {
      tv.popular.videos = state.tv.popular.videos.concat(tv.popular.videos);
    }
  }

  if(hasLooped) {
    return { 
      ...state, page, maxPage, loadingInit: false, searchString,
      tv: {...state.tv, ...tv}};
  } else {
    return { ...state, page, maxPage, loadingInit: false, tv, searchString };
  }
};

const fetchTVInitFail = (state, action) => {
  return { ...state, loadingInit: false, error: action.error };
};

// =========================== //
//        CHANGE TV LIST       //
// =========================== //
const changeTVListStart = (state, action) => {
  const { direction, hasLooped, category } = action;
  let   { maxPage, listLength, } = state;
  
  let page          = {...state.page},
      tv            = {...state.tv},
      showPage      = {...state.showPage},
      searchString  = {...state.searchString};
  
  if(direction === 'left' && showPage[category] > 1) {
    showPage[category]--;
  } else if(direction === 'right') {
    const sliceStart  = showPage[category] * listLength,
          sliceEnd    = (showPage[category]+1) * listLength;

    if(!hasLooped && tv[category].videos.slice(sliceStart, sliceEnd).length >= 0) {
      showPage[category]++;
    }
    if(page[category] < maxPage[category] && (tv[category].videos.slice(sliceStart, sliceEnd).length < listLength)) {
      page[category]++;
      searchString[category] = searchString[category].replace(/page=\d+(?=&?)/g, `page=${page[category]}`);
    } 
  }
  return { ...state, 
    page: { ...state.page, ...page }, 
    showPage: { ...state.showPage, ...showPage }, 
    searchString: { ...state.searchString, ...searchString }, 
    loading: {...state.loading, [category]: true} };
}

const changeTVListSuccess = (state, action) => {
  const { direction, category, newData: newDataAction } = action;
  const { imgConfig, tv } = state;

  if(direction === 'left' || newDataAction === -1) {
    return { ...state, loading: {...state.loading, [category]: false} };
  }

  const newData       = newDataAction.results,
        baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];  

  let updatedResults = u.filterByVideoData(newData, 'langPosterImg');
      updatedResults = u.updateInitData(updatedResults, baseUrl);

  let combinedResults     = tv[category].videos.concat(updatedResults),
      noDuplicateResults  = u.removeDuplicateById(combinedResults);
      
  return { 
    ...state, 
    tv: {
      ...tv,
      [category]: {
        ...tv[category],
        videos: noDuplicateResults
      }
    }, 
    loading: {...state.loading, [category]: false} };
}

const changeTVListFail = (state, action) => {
  return { ...state, error: action.error, loading: {...state.loading, [action.category]: false} };
}

// =========================== //
//      FETCHING TV DETAILS    //
// =========================== //
const getTVDetailsStart = (state, action) => {
  return { ...state, loadingDetails: true };
}

const getTVDetailsSuccess = (state, action) => {
  const { config: imgConfig, fetchedDetails } = action;
  
  const videos  = u.filterByVideoData(fetchedDetails['videos'].results, 'videoSite'),
        details = fetchedDetails['details'],
        reviews = fetchedDetails['reviews'].results,
        cast    = u.extractUpTo(fetchedDetails['credits'].cast, 11),
        crew    = u.extractUpTo(fetchedDetails['credits'].crew, 11),
        prod    = u.extractUpTo(details.production_companies, 11);

  const baseUrlBackdrop   = u.getBaseUrl(imgConfig, 'backdrop', 0),
        baseUrlBackdropLg = u.getBaseUrl(imgConfig, 'backdrop', 3),
        baseUrlProfile    = u.getBaseUrl(imgConfig, 'poster', 2),
        baseUrlLogo       = u.getBaseUrl(imgConfig, 'logo', 4);
  
  u.sortVideoType(videos);
  u.getProfilePath(cast, baseUrlProfile);
  u.getProfilePath(crew, baseUrlProfile);
  u.getLogoPath(prod, baseUrlLogo);
  
  const currentTVDetails = {
    ...details, videos, cast, crew, reviews, prod,
    backdrop_path: baseUrlBackdrop.concat(details.backdrop_path),
    backdrop_path_large: baseUrlBackdropLg.concat(details.backdrop_path)
  };
    
  return { ...state, currentTVDetails, loadingDetails: false };
};

const getTVDetailsFail = (state, action) => {
  return { ...state, loadingDetails: false, error: action.error };
};

const clearTVDetails = (state, action) => {
  return { ...state, currentTVDetails: null }
}

const resetTranslateTV = (state, action) => {
  return { ...state, translateSlide: 0 };
}

// =========================== //
//           CAROUSEL          //
// =========================== // 
const changeCarouselTV = (state, action) => {
  const airingToday      = state.tv['airingToday'].videos;
  const activeIndex     = airingToday.findIndex(tv => tv.active);
  const newActiveIndex  = airingToday.findIndex(tv => tv.id === action.tvId);

  const updatedAiringTodayTV = {
    ...state.tv['airingToday'],
    videos: u.updateCarouselState(airingToday, activeIndex, newActiveIndex)
  };
  const updatedTranslateSlide = -newActiveIndex * action.element.offsetWidth;

  return { 
    ...state, 
    tv: {...state.tv, airingToday: updatedAiringTodayTV}, 
    translateSlide: updatedTranslateSlide };
};

const changeCarouselTVArrow = (state, action) => {
  const airingToday  = state.tv['airingToday'].videos;
  const activeIndex = airingToday.findIndex(tv => tv.active);  
  
  let showLength = action.showLength;
  if(airingToday.length < action.showLength) {
    showLength = airingToday.length;
  }

  const {newActiveIndex, updatedTranslateSlide} = u.updateIndexAndTranslation(action.arrowDirection, activeIndex, action.element, showLength);
  
  const updatedAiringTodayTV = {
    ...state.tv['airingToday'],
    videos: u.updateCarouselState(airingToday, activeIndex, newActiveIndex)
  };
  
  return { 
    ...state, 
    tv: {...state.tv, airingToday: updatedAiringTodayTV},
    translateSlide: updatedTranslateSlide };
};

const resizeCarouselSlideTV = (state, action) => {
  const activeIndex       = state.tv['airingToday'].videos.findIndex(tv => tv.active);
  const newTranslateSlide = -action.element.offsetWidth * activeIndex;
  return { ...state, translateSlide: newTranslateSlide };
};

// =========================== //
//           REDUCER           //
// =========================== //
const reducer = u.createReducer(initialState, {
  [actionTypes.FETCH_TV_START]: fetchTVStart,
  [actionTypes.FETCH_TV_INIT_SUCCESS]: fetchTVInitSuccess,
  [actionTypes.FETCH_TV_INIT_FAIL]: fetchTVInitFail,
  [actionTypes.CHANGE_TV_LIST_START]: changeTVListStart,
  [actionTypes.CHANGE_TV_LIST_SUCCESS]: changeTVListSuccess,
  [actionTypes.CHANGE_TV_LIST_FAIL]: changeTVListFail,  
  [actionTypes.CHANGE_CAROUSEL_TV]: changeCarouselTV,
  [actionTypes.CHANGE_CAROUSEL_TV_ARROW]: changeCarouselTVArrow,
  [actionTypes.RESIZE_CAROUSEL_SLIDE_TV]: resizeCarouselSlideTV,
  [actionTypes.GET_TV_DETAILS_START]: getTVDetailsStart,
  [actionTypes.GET_TV_DETAILS_SUCCESS]: getTVDetailsSuccess,
  [actionTypes.GET_TV_DETAILS_FAIL]: getTVDetailsFail,
  [actionTypes.CLEAR_TV_DETAILS]: clearTVDetails,
  [actionTypes.RESET_TRANSLATE_TV]: resetTranslateTV,
});

export default reducer;