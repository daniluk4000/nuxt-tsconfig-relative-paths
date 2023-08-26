# Skip using this module
Nuxt Team has fixed relative paths issue in Nuxt 3.7.0. Please remove this module if you had it and don't use if you wanted to.

# Nuxt TSConfig Relative Paths

This module allows you to rollback to relative paths in tsconfig for Nuxt 3.6.x. See https://github.com/nuxt/nuxt/issues/21827 for more
information.

Module only works in development mode and on ~3.6 versions.

## Configuration
If you want to silence upgrade warning for now, you can do that via Nuxt Config:

```typescript
export default defineNuxtConfig({
  tsconfigRelativePaths: {
    disableUpgradeWarning: true,
  },
});
```

## #Components alias

As `#components` are inserted AFTER custom module hooks I wasn't able to modify this entry. The reason behind this is
that for example in prepare hook "prepare:types" is the last hook. #components are being added AFTER "last hook",
therefore without tricky solutions I will not be able to replace #components path.

If you need types, as workaround you can use `##components` alias for now. But I highly recommend to stay
on `#components` and upgrade to Nuxt ^3.7 ASAP.

## Quick Setup

1. Add `nuxt-tsconfig-relative-paths` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-tsconfig-relative-paths

# Using yarn
yarn add --dev nuxt-tsconfig-relative-paths

# Using npm
npm install --save-dev nuxt-tsconfig-relative-paths
```

2. Add `nuxt-tsconfig-relative-paths` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'other-modules',
    'nuxt-tsconfig-relative-paths'
  ]
})
```
