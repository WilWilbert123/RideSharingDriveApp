// actionTypes.js
export const UPDATE_DRIVER_LOCATION = 'UPDATE_DRIVER_LOCATION';
export const SET_NEARBY_RIDE_REQUESTS = 'SET_NEARBY_RIDE_REQUESTS';
export const UPDATE_RIDE_REQUEST_STATUS = 'UPDATE_RIDE_REQUEST_STATUS';
export const selectRideRequestStatus = (state, rideId) => state.rideStatus[rideId];
