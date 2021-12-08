import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../signupAuth';
import GetPersonInfo from '../personInfo';


export const SignUpInfo = React.createContext();
export const SignUpsetInfo = React.createContext();

const SignUpStack = createStackNavigator();

export default function SignupNav() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const signUpInfoValue = {
        email :email,
        password:password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
}

    const signUpsetInfoValue = {
        setEmail: setEmail,
        setPassword: setPassword,
        setConfirmPassword: setConfirmPassword,
        setFirstName: setFirstName,
        setLastName: setLastName,
        setPhoneNumber: setPhoneNumber
    }
    return (
        <SignUpInfo.Provider value={signUpInfoValue}>
            <SignUpsetInfo.Provider value={signUpsetInfoValue}>
                <SignUpStack.Navigator >
                    <SignUpStack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
                    <SignUpStack.Screen name="GetPersonInfo" component={GetPersonInfo} />
                </SignUpStack.Navigator>
            </SignUpsetInfo.Provider>
        </SignUpInfo.Provider>
    );
}