// actions.js
import { SET_DRIVER_LOCATION, SET_RIDE_STATUS } from './actionTypes';

export const setDriverLocation = (location) => ({
  type: SET_DRIVER_LOCATION,
  payload: location,
});

export const setRideStatus = (rideId, status) => ({
  type: SET_RIDE_STATUS,
  payload: { rideId, status },
});
