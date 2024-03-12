// reducers.js
import { combineReducers } from 'redux';
export const SET_NEARBY_RIDE_REQUESTS = 'SET_NEARBY_RIDE_REQUESTS';

const driverLocationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_DRIVER_LOCATION':
      return action.payload;
    default:
      return state;
  }
};

const nearbyRideRequestsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NEARBY_RIDE_REQUESTS':
      return action.payload;
    default:
      return state;
  }
};

const rideStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RIDE_STATUS':
      return { ...state, [action.payload.rideId]: action.payload.status };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  driverLocation: driverLocationReducer,
  nearbyRideRequests: nearbyRideRequestsReducer,
  rideStatus: rideStatusReducer,
});

export default rootReducer;
