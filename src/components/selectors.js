// selectors.js
export const selectDriverLocation = (state) => state.driverLocation;
export const selectNearbyRideRequests = (state) => state.nearbyRideRequests;
export const selectRideRequestStatus = (state, rideId) => state.rideRequestStatus[rideId];