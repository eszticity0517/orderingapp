/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Root } from 'native-base';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Login} from '../components/login';
import {Home} from '../components/home';
import {Orders} from '../components/orders';
import {News} from '../components/news';
import {Profile} from '../components/profile';
import {ForgottenPassword} from '../components/forgotten-password';
import {PasswordSent} from '../components/password-sent';
import {Favourites} from '../components/favourites';
import {EmptyCart} from '../components/empty-cart';
import {Chat} from '../components/chat';
import {Products} from '../components/products';
import {ReceiptInfo} from '../components/receipt-info';
import {Reorder} from '../components/reorder';
import {OrderInProgress} from '../components/order-in-progress';
import {OrderIsDone} from '../components/order-is-done';

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
    EmptyCart: {screen: EmptyCart},
    Chat: {screen: Chat},
    Products: {screen: Products},
    ReceiptInfo: {screen: ReceiptInfo},
    Reorder: {screen: Reorder},
    OrderInProgress: {screen: OrderInProgress},
    OrderIsDone: {screen: OrderIsDone},
  },
  {
    headerMode: 'screen',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App: () => React$Node = () => {
  return (
    <Root>
      <AppContainer />
    </Root>
  );
};

export default App;
