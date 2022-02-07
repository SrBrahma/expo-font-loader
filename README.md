<!-- <img src=".logo.png" alt=expo-font-loader/><br/> -->

<div align="center">

[![npm](https://img.shields.io/npm/v/expo-font-loader)](https://www.npmjs.com/package/expo-font-loader)
[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
<!-- [![npm](https://img.shields.io/npm/dm/expo-font-loader)](https://www.npmjs.com/package/expo-font-loader) -->
</div>

# expo-font-loader

Almost 2 years ago [I've shared a little hack for expo-font](https://github.com/expo/google-fonts/issues/6). Now, it's improved and it's a npm package!

It's about smartly loading and using fonts with [@expo-google-fonts](https://github.com/expo/google-fonts) and icons with [@expo/vector-icons](https://github.com/expo/vector-icons) - icons are actually fonts!

Without this, you have to manually type the `fontFamily` in a Text style, e.g. `fontFamily: 'Roboto_500Medium'`. This is bad because you may not know or forget exactly what is its name, you may make a typo, you may have forgot to load it, you have to fully type it...

With this package, you speficify the fonts to be loaded, and it's returned a `Fonts` (or `F`, alias) object to be used in the fontFamily. As it's type smart, when you have `fontFamily: F.`, the IntelliSense will show all the available fontsFamilies you can use, and you can safely and quickly pick the one you want. It will complete with for example `F.Roboto_500Medium`. It's very useful when dealing with various fontsFamilies, so you can see all the options and quickly pick the one that best fits the text.

If you remove a font to be loaded and it's being used somewhere, there will be a Type error, as it knows that font isn't available to be used.

## 💿 Installation
```bash
npm install expo-font-loader
# or
yarn add expo-font-loader
```

## 📖 Usage

#### Fonts setup
```tsx
import { Platform } from 'react-native';
// Your icons to be loaded on start
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
// Your fonts to be loaded on start
import * as Roboto from '@expo-google-fonts/roboto';
// You can load single fonts instead of the whole family
import { Inter_900Black } from '@expo-google-fonts/inter';
import { createFontsToLoad } from 'expo-font-loader'

// F is an alias to Fonts, as I is an alias to Icons.
export const { F, Icons, useFonts } = createFontsToLoad({
  fontsToLoad: {
    ...Roboto,
    Inter_900Black
  },
  // If we don't previously load the icons, they may take a while to show up!
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

function Component() {
  return (<Icons.MaterialCommunityIcons ... />)
}

```

## 📰 [Changelog](CHANGELOG.md)
