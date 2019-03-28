// To camel case
export const toCamelCase = (string) => {
  return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (char, index) => {
    if(+char === 0) return '';
    return index === 0 ? char.toLowerCase() : char.toUpperCase();
  });
}

// GET CURRENT YEAR
export const getCurrentYear = () => new Date().getFullYear().toString();

// CREATE INPUT SELECT OPTION INTEGER RANGE FROM LENGTH OF ARRAY
export const getOptionsIntRange = (header, range, initValue, order) => {
  return [{text: header}].concat(Array.from({length: range}).map((v = initValue, i) => {
    let textValue = null;
    if(order === 'asc') {
      textValue = +v+i;
    } else if(order === 'desc') {
      textValue = +v-i;
    }

    return { text: textValue.toString() };
  }))
};

export const isArrayGT = (testObj, greaterThan) => {
  return Array.isArray(testObj) && testObj.length > greaterThan;
};

export const isObjNotEmpty = (object) => {
  return !!object && Object.keys(object) && Object.keys(object).length > 0;
}

export const setStateDirectChildValue = (stateKey, updateKey, updatedValue, state) => {
  return {
    ...state[stateKey],
    [updateKey]: {
      ...state[stateKey][updateKey],
      value: updatedValue
    }
  };
};

export const randomNumber = (num) => {
  return Math.floor(Math.random() * Math.floor(num));
}

export const HtoMS = (hour) => {
  return hour * 3.6 * Math.pow(10,6);
}

// DICTIONARY FOR FILTER QUERY - THEMOVIEDB
export const getDiscoverOrderQueryValue = (value) => {
  switch(value) {
    case 'Popularity: High to Low':
      return 'popularity.desc';
    case 'Popularity: Low to High':
      return 'popularity.asc';    
    case 'Rating: High to Low':
      return 'vote_average.desc';
    case 'Rating: Low to High':
      return 'vote_average.asc';
    case 'Release Date: New to Old':
      return 'release_date.desc';
    case 'Release Date: Old to New':
      return 'release_date.asc';
    case 'Title: A to Z':
      return 'original_title.asc';
    case 'Title: Z to A':
      return 'original_title.desc';
    case 'Revenue: High to Low':
      return 'revenue.desc';
    case 'Revenue: Low to High':
      return 'revenue.asc';
    default:
      return null;
  }
}



