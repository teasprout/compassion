import React from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AboutScreen from '../screens/AboutScreen';
import SearchScreen from '../screens/SearchScreen';
import BlockScreen from '../screens/BlockScreen';
import SponsorsScreen from '../screens/SponsorsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HistoryScreen from '../screens/HistoryScreen';
import Colors from '../constants/Colors';

const menuMargin = 18;
const iconSize = 35;

const SponsorsStack = createStackNavigator(
  {
    Sponsors: SponsorsScreen,
  }, {
    initialRouteName: "Sponsors",
    navigationOptions: ({ navigation} ) => ({
          drawerLabel: 'Sponsors',
          title: 'Sponsors',
          headerTitleStyle: {
            ...Platform.select({
              ios: { fontFamily: 'Arial', },
              android: { fontFamily: 'Roboto' },
            }),
            color: "white",
          },
          headerStyle: {
              backgroundColor: Colors.tintColor
          },
          headerLeft: (
            <View style={{
              marginLeft: menuMargin,
            }}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                type='ionicon'
                onPress={() => navigation.openDrawer()}
                color="white"
                underlayColor={Colors.tintColor}
                size={iconSize}
              />
            </View>
         )
    }),
  }
);

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  }, {
    initialRouteName: "About",
    navigationOptions: ({ navigation} ) => ({
          drawerLabel: 'About',
          title: 'About',
          headerTitleStyle: {
            ...Platform.select({
              ios: { fontFamily: 'Arial', },
              android: { fontFamily: 'Roboto' },
            }),
            color: "white",
          },
          headerStyle: {
              backgroundColor: Colors.tintColor
          },
          headerLeft: (
            <View style={{
              marginLeft: menuMargin,
            }}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                type='ionicon'
                onPress={() => navigation.openDrawer()}
                color="white"
                underlayColor={Colors.tintColor}
                size={iconSize}
              />
            </View>
         )
    }),
  }
);

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Block: BlockScreen,
  }, {
    initialRouteName: "Search",
    navigationOptions: ({ navigation} ) => ({
          drawerLabel: 'Search',
          title: 'Search',
          headerTitleStyle: {
            ...Platform.select({
              ios: { fontFamily: 'Arial', },
              android: { fontFamily: 'Roboto' },
            }),
            color: "#ffffff",
          },
          headerStyle: {
              backgroundColor: Colors.tintColor
          },
          headerLeft: (
            <View style={{
              marginLeft: menuMargin,
            }}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                type='ionicon'
                onPress={() => navigation.openDrawer()}
                color="#ffffff"
                underlayColor={Colors.tintColor}
                size={iconSize}
              />
            </View>
         )
    }),
  }
);

const FavoritesStack = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    Block: BlockScreen,
  }, {
    initialRouteName: "Favorites",
    navigationOptions: ({ navigation} ) => ({
          drawerLabel: 'Favorites',
          title: 'Favorites',
          headerTitleStyle: {
            ...Platform.select({
              ios: { fontFamily: 'Arial', },
              android: { fontFamily: 'Roboto' },
            }),
            color: "#ffffff",
          },
          headerStyle: {
              backgroundColor: Colors.tintColor
          },
          headerLeft: (
            <View style={{
              marginLeft: menuMargin,
            }}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                type='ionicon'
                onPress={() => navigation.openDrawer()}
                color="#ffffff"
                underlayColor={Colors.tintColor}
                size={iconSize}
              />
            </View>
         )
    }),
  }
);

const HistoryStack = createStackNavigator(
  {
    History: HistoryScreen,
    Block: BlockScreen,
  }, {
    initialRouteName: "History",
    navigationOptions: ({ navigation} ) => ({
          drawerLabel: 'History',
          title: 'History',
          headerTitleStyle: {
            ...Platform.select({
              ios: { fontFamily: 'Arial', },
              android: { fontFamily: 'Roboto' },
            }),
            color: "#ffffff",
          },
          headerStyle: {
              backgroundColor: Colors.tintColor
          },
          headerLeft: (
            <View style={{
              marginLeft: menuMargin,
            }}>
              <Icon
                name='menu'
                type='material-community'
                onPress={() => navigation.openDrawer()}
                color="#ffffff"
                underlayColor={Colors.tintColor}
                size={iconSize}
              />
            </View>
         )
    }),
  }
);

// Force the drawer navigation to have the right options
SponsorsStack.navigationOptions = {
    drawerLabel: 'Sponsors',
    drawerIcon: ({tintColor}) => (
      <Icon
        name='gift'
        type='material-community'
        color={tintColor}
      />
    ),
};

AboutStack.navigationOptions = {
    drawerLabel: 'About',
    drawerIcon: ({tintColor}) => (
      <Icon
        name='information-outline'
        type='material-community'
        color={tintColor}
      />
    ),
};

SearchStack.navigationOptions = {
    drawerLabel: 'Search',
    drawerIcon: ({tintColor}) => (
      <Icon
        name='magnify'
        type='material-community'
        color={tintColor}
      />
    ),
};

FavoritesStack.navigationOptions = {
    drawerLabel: 'Favorites',
    drawerIcon: ({tintColor}) => (
      <Icon
        name='heart-outline'
        type='material-community'
        color={tintColor}
      />
    ),
};

HistoryStack.navigationOptions = {
    drawerLabel: 'History',
    drawerIcon: ({tintColor}) => (
      <Icon
        name='history'
        type='material-community'
        color={tintColor}
      />
    ),
};

const AppNavigator = createDrawerNavigator (
  {
    SearchStack,
    AboutStack,
    SponsorsStack,
    HistoryStack,
    FavoritesStack
  }, {
    contentOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: "#222",
      labelStyle: {
        ...Platform.select({
          ios: { fontFamily: 'Arial', },
          android: { fontFamily: 'Roboto' },
        }),
      }
    },
  });

export default AppNavigator;
