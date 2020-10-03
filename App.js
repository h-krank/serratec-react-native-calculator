import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';


import Calculator from './src/pages/calculator'

export default function App() {

  return (
    <>
      <SafeAreaProvider>
        <StatusBar style='inverted'></StatusBar>
        <Calculator />
      </SafeAreaProvider>
    </>


  )
}

