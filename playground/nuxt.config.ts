export default defineNuxtConfig({
  modules: ['../src/module'],
  srcDir: './src',
  devtools: {enabled: true},
  typescript: {
    typeCheck: true,
    shim: true,
    strict: true,
  }
})
