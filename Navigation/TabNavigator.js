import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../App/Movies'
import AddMovies from '../App/AddMovies'


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (  
        <NavigationContainer>
            <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return  null;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
            >
                <Tab.Screen name="Movies" component={Movies} />
                <Tab.Screen name="Add Movies" component={AddMovies} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}