// =========================== //
//            UTILITY          //
// =========================== //
export function updateInitData(originalData, baseUrls, genres) {
  const updatedData = [];
  if(genres) {
    for(let result of originalData) {
      const genre = result.genre_ids.map(id => genres.find(genre => genre.id === id).name);
      updatedData.push({ 
        ...result, 
        active: false, 
        genre, 
        backdrop_path: baseUrls[0] ? 
          baseUrls[0].concat(result.backdrop_path) : result.backdrop_path,
        poster_path: baseUrls[1] ? 
          baseUrls[1].concat(result.poster_path) : result.poster_path,
        vote_average: result.vote_average.toFixed(1)
      });
    }
    if(updatedData.length > 0 && updatedData[0].hasOwnProperty('active')) {
      updatedData[0].active = true;
    }
  } else {    
    for(let result of originalData) {
      updatedData.push({ 
        ...result, 
        backdrop_path: baseUrls[0] ? 
          baseUrls[0].concat(result.backdrop_path) : result.backdrop_path,
        poster_path: baseUrls[1] ? 
          baseUrls[1].concat(result.poster_path) : result.poster_path,
        vote_average: result.vote_average.toFixed(1)
      });
    }
  }
  
  return updatedData;
}

export function updateCategory(category, videos) {
  return { category, videos };
}

export function removeDuplicateById(arrayToFilter) {
  return arrayToFilter.filter(
    (set => item => !set.has(item.id) && set.add(item.id))(new Set()));
}

export function filterByVideoData(videos, filterBy) {
  if(filterBy === 'langImg') {
    return videos.filter(video => video && video.backdrop_path && video.original_language === 'en');
  } else if(filterBy === 'search') {
    return videos.filter(video => video && video.poster_path && (video.media_type === 'movie' || video.media_type === 'tv'));
  } else if(filterBy === 'videoSite') {
    return videos.filter(video => video && video.site === 'YouTube');
  } else if(filterBy === 'langPosterImg') {
    return videos.filter(video => video && video.poster_path && video.original_language === 'en');
  }
}

export const extractUpTo = (data, max) => data.slice(0, max) || data;

export function sortVideoType(videos) {
  videos.sort((a, b) => {
    let nameA = a.type.toLowerCase();
    let nameB = b.type.toLowerCase();
    return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
  });
}

export function getProfilePath(staffData, baseUrl) {
  for (let i = 0; i < staffData.length; i++) {
    if(staffData[i].profile_path) {
      staffData[i].profile_path = baseUrl.concat(staffData[i].profile_path);
    }
  }
}

export function getLogoPath(data, baseUrl) {
  for (let i = 0; i < data.length; i++) {
    if(data[i].logo_path) {
      data[i].logo_path = baseUrl.concat(data[i].logo_path);
    }
  }
}

export function getBaseUrl(imgConfig, type, size) {
  if(type === 'backdrop') {
    return imgConfig.secure_base_url.concat(imgConfig.backdrop_sizes[size]);
  } else if(type === 'poster') {
    return imgConfig.secure_base_url.concat(imgConfig.poster_sizes[size]);
  } else if(type === 'logo') {
    return imgConfig.secure_base_url.concat(imgConfig.logo_sizes[size]);
  } else if(type === 'profile') {
    return imgConfig.secure_base_url.concat(imgConfig.profile_sizes[size]);
  }
}

// =========================== //
//       CAROUSEL UTILITY      //
// =========================== // 
export const updateCarouselState = (videos, activeIndex, newActiveIndex) => {
  let updatedState              = [...videos];
  updatedState[activeIndex]     = { ...updatedState[activeIndex], active: false };
  updatedState[newActiveIndex]  = { ...updatedState[newActiveIndex], active: true };
  return updatedState;
}

export const updateIndexAndTranslation = (arrowDir, activeInd, element, showLength) => {
  let newActiveIndex = null,
      updatedTranslateSlide = null;

  if(arrowDir === 'left') {
    if(activeInd - 1 >= 0) {
      newActiveIndex = activeInd - 1;
      updatedTranslateSlide += element.offsetWidth * -(newActiveIndex);
    } else {
      newActiveIndex = showLength-1;
      updatedTranslateSlide = element.offsetWidth * -(showLength-1);
    }
  } else {
    if(activeInd + 1 < showLength) {
      newActiveIndex = activeInd + 1;
      updatedTranslateSlide -= element.offsetWidth * (newActiveIndex);
    } else {
      newActiveIndex = 0;
      updatedTranslateSlide = 0;
    }
  }

  return { newActiveIndex, updatedTranslateSlide };
}