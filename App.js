import React from 'react'
import Navigator from './src/routes/homeStack'
import { useFonts } from 'expo-font'

export default function App() {
  const [loaded] = useFonts({
    'DMSans-regular': require('./src/assets/fonts/DMSans-Regular.ttf'),
    'DMSans-bold': require('./src/assets/fonts/DMSans-Bold.ttf'),
    'FiraCode-regular': require('./src/assets/fonts/FiraCode-Regular.ttf'),
    'FiraCode-bold': require('./src/assets/fonts/FiraCode-Bold.ttf'),
    'CourierPrime-regular': require('./src/assets/fonts/CourierPrime-Regular.ttf'),
    'CourierPrime-bold': require('./src/assets/fonts/CourierPrime-Bold.ttf'),
  })

  if (!loaded) {
    return null
  }

  return <Navigator />
}
