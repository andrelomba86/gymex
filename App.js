import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'

import Navigation from './Navigation'
import { Colors } from './Theme'

import DB from './Database'

import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito'

// const db = new DB()

export default function AppContainer() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        await Font.loadAsync(MaterialIcons.font)
        await DB.init(() => {
          console.log('DB ready')
        })
      } catch (e) {
        // error caching font, not a big deal, will load on the fly
      } finally {
        setReady(true)
      }
    })()
  }, [])

  if (ready) {
    return <App />
  }
  return <AppLoading />
}

function App() {
  const [fontsLoaded] = useFonts({ Nunito_400Regular, Nunito_700Bold })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return <Navigation />
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.Background,
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    color: Colors.Text,
    fontSize: 20,
    paddingBottom: 20,
  },
})
