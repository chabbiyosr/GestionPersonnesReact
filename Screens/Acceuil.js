import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import ListProfils from './HomeScreens/ListProfils';
import Groups from './HomeScreens/Groups';
import MyAccount from './HomeScreens/MyAccount';

const Tab=createMaterialBottomTabNavigator();//creation tabulation ili houma screens 

export default function Acceuil(props) {//props jet men navigation container
  console.log("home" + props.route.params.currentid);//route w navigation ahma zouz parametres
  return (
    <Tab.Navigator>
      <Tab.Screen name='listprofils' component={ListProfils} initialParams={{currentid:props.route.params.currentid}}/>
      
      <Tab.Screen name='groups' component={Groups} />
      <Tab.Screen 
      name='myAccount' 
      component={MyAccount}
      initialParams={{currentid:props.route.params.currentid}}
      />


    </Tab.Navigator>
  )
}