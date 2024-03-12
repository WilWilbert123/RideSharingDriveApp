// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './src/navigator/navigation';

const App = () => {
  return (
   
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    
  );
};

export default App;


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './src/components/reducers';
// import HomeStackNavigator from './src/navigator/navigation';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <HomeStackNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }
