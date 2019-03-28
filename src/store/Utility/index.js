export * from './Utility';

// =========================== //
//        CREATE REDUCER       //
// =========================== //
// Instead of Switch statements (cleaner)
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if(handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}
