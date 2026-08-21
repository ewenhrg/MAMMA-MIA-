/**
 * The English dictionaries are declared `as const` so every key is checked and
 * autocompleted. `Translated` widens those literal types back to plain strings
 * so other locales can be typed against the English shape without having to
 * repeat the English wording.
 */
export type Translated<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer Item)[]
        ? readonly Translated<Item>[]
        : { readonly [Key in keyof T]: Translated<T[Key]> };
