<!-- <img src=".logo.png" alt=expo-font-loader/><br/> -->

<div align="center">

[![npm](https://img.shields.io/npm/v/expo-font-loader)](https://www.npmjs.com/package/expo-font-loader)
[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![npm](https://img.shields.io/npm/dm/expo-font-loader)](https://www.npmjs.com/package/expo-font-loader)
</div>

# expo-font-loader

Almost 2 years ago [I've shared a little hack for expo-font](https://github.com/expo/google-fonts/issues/6). Now, it's improved and it's a npm package!

It's about smartly loading and using fonts with [@expo-google-fonts](https://github.com/expo/google-fonts) and icons with [@expo/vector-icons](https://github.com/expo/vector-icons).


## Installation
```bash
npm install expo-font-loader
# or
yarn add expo-font-loader
```

## Usage

#### Fonts setup
```tsx
import { Platform } from 'react-native';
// Your icons to be loaded on start
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
// Your fonts to be loaded on start
import * as Roboto from '@expo-google-fonts/roboto';
// You can load single fonts instead of the whole family
import { Inter_900Black } from '@expo-google-fonts/inter';

// F is an alias to Fonts, as I is an alias to Icons.
export const { F, Icons, useFonts } = createFontsToLoad({
  fontsToLoad: {
    ...Roboto,
    Inter_900Black
  },
  iconsToLoad: {
    MaterialCommunityIcons,
    Entypo,
  },
  aliases: {
    monospace: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
```

#### App init
```tsx
import { useFonts } from './fonts.ts'

const App () => {
  const [fontsLoaded, error] = useFonts();

  if (!fontsLoaded)
    // https://docs.expo.dev/versions/latest/sdk/app-loading/
    return <AppLoading/>

  return <Components ... />
}
```

#### Font and icon usage
```tsx
const styles = StyleSheet.create({
  text: {
    // Type safe and smart! And loaded when used!
    fontFamily: F.Roboto_500Medium
  },
  monoText: {
    // Alias are used in the same way!
    fontFamily: F.monospace
  }
});

const component = <Icons.MaterialCommunityIcons ... />
```

## [Changelog](CHANGELOG.md)