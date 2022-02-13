// https://docs.expo.dev/guides/using-custom-fonts/
// I first shared it in here: https://github.com/expo/google-fonts/issues/6
// Aditional fontWeights and to be used on iOS
import { Platform } from 'react-native';
import { useFonts as expoUseFonts } from 'expo-font';


/** Prettify obj type */
type Id<T> = unknown & { [P in keyof T]: T[P] };

type FontsToLoad = Id<{
  useFonts?: any;
  __metadata__?: any;
  // [x in string]: any
}>;


type SystemAliases = Record<string, string>;
// Simplified version, so we don't need `@expo/vector-icons` pkg to `import { Icon } from '@expo/vector-icons/build/createIconSet'`.
type Icon = {font: Record<string, any>};
type Icons = Record<string, Icon>;

type OmitFontsMeta<F extends FontsToLoad> = Omit<F, '__metadata__' | 'useFonts'>;
/** Omits meta props and converts the other FontsToLoad props to string type. */
type FontsToLoadToFonts<F extends FontsToLoad> = {[K in keyof OmitFontsMeta<F>]: string};
/** @defaul */
type Fonts<F extends FontsToLoad, A extends SystemAliases> = Id<FontsToLoadToFonts<F> & A>;




type FontsToLoadProps<F extends FontsToLoad, I extends Icons, A extends SystemAliases> = {
  /** The fonts to be loaded.
   *
   * @example
   * ```ts
   * // Load whole family
   * import * as Roboto from '@expo-google-fonts/roboto'
   * // Load single font
   * import { Inter_900Black } from '@expo-google-fonts/inter';
   *
   * const { F, useFonts } = createFontsToLoad({
   *   fontsToLoad: {
   *     ...Roboto,
   *     Inter_900Black
   *   }
   * })
   * ```
   * */
  fontsToLoad?: F;
  /** Your icons to be loaded/cached on useFonts.
   *
   * @example
   * ```ts
   * import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
   *
   * const { I, useFonts } = createFontsToLoad({
   *   iconsToLoad: {
   *     Entypo
   *     MaterialCommunityIcons
   *   }
   * })
   * ```
  */
  iconsToLoad?: I;
  /** Manual system fonts aliases to be added to Fonts.
   *
   * System fonts don't need to be loaded, this only adds the alias to Fonts.
   *
   * @example
   * ```ts
   * const { F } = createFontsToLoad({
   *   aliasesToSystemFonts: {
   *     monospace: Platform.OS === 'ios' ? 'Courier' : 'monospace',
   *   }
   * })
   * ```
   *
   *
  */
  aliases?: A;
};

type FontsToLoadRtn<F extends FontsToLoad, I extends Icons, A extends SystemAliases> = Id<{
  /** Short alias to `Fonts`.
   *
   * To be used in a style like `{fontFamily: F.Roboto_500Medium }` */
   F: Fonts<F, A>;
   /** To be used in a style like `{fontFamily: Fonts.Roboto_500Medium }` */
   Fonts: Fonts<F, A>;
   /** To be used just like the default useFonts(args), without the args. */
   useFonts: () => [fontsLoaded: boolean, error: Error | null];
   /** Short alias to `Icons`.
    *
    * Icons to be used via `<Icons.MaterialCommunityIcons/>`. */
   I: Id<I>; // Id here else it wouldn't remove the Record<never, never>.
   /** Icons to be used via `<Icons.MaterialCommunityIcons/>`. */
   Icons: Id<I>;
}>;

/** Instead of using the useFonts(fontsArg) hook to get the loaded state, use useMyFonts() on your App start. */
export function createFontsToLoad<F extends FontsToLoad = Record<never, never>, I extends Icons = Record<never, never>, A extends SystemAliases= Record<never, never>>({
  fontsToLoad = {} as F,
  iconsToLoad = {} as I,
  aliases = {} as A,
}: FontsToLoadProps<F, I, A>): FontsToLoadRtn<F, I, A> {

  const fontsToLoadInternal = { ...fontsToLoad } as Id<Omit<typeof fontsToLoad, '__metadata__' | 'useFonts'>>;
  // Remove non-font stuff
  delete (fontsToLoadInternal as any).__metadata__;
  delete (fontsToLoadInternal as any).useFonts;

  const iconsFonts = Object.values(iconsToLoad)
    .reduce((obj, icon) => ({ ...obj, ...icon.font }), {} as Record<string, number>);

  const useFontsArg = {
    ...fontsToLoadInternal,
    ...iconsFonts,
  };

  const Fonts = {
    ...Object.fromEntries(Object.keys(fontsToLoadInternal).map((key) => [key, key])),
    ...aliases,
    monospace: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  } as Fonts<F, A>;

  const useFonts = () => expoUseFonts(useFontsArg);

  return {
    F: Fonts,
    Fonts,
    useFonts,
    I: iconsToLoad,
    Icons: iconsToLoad,
  };
}

// Test Probe
// const a = createFontsToLoad({
//   aliases: {a: '4'}
// })
// a.