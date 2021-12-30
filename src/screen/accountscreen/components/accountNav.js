import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Account from '../account';
import EditProfile from '../stacks/editProfile';
const AccountStack = createStackNavigator();

export default function AccountNav({navigation}) {
    return(
        <AccountStack.Navigator >
            <AccountStack.Screen name="AccountInfo" component={Account} options={{
                headerShown: false
            }} />
            <AccountStack.Screen name="EditProfile" component={EditProfile} />
        </AccountStack.Navigator>
    );
}