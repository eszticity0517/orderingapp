/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Login} from './components/login';
import {Home} from './components/home';
import {Orders} from './components/orders';
import {News} from './components/news';
import {Profile} from './components/profile';
import {ForgottenPassword} from './components/forgotten-password';
import {PasswordSent} from './components/password-sent';
import {Favourites} from './components/favourites';

const AppNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    Home: {screen: Home},
    Orders: {screen: Orders},
    News: {screen: News},
    Profile: {screen: Profile},
    ForgottenPassword: {screen: ForgottenPassword},
    PasswordSent: {screen: PasswordSent},
    Favourites: {screen: Favourites},
  },
  {
    headerMode: 'screen',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App: () => React$Node = () => {
  return <AppContainer />;
};

export default App;
