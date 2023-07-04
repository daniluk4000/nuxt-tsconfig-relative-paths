import {defineNuxtModule} from '@nuxt/kit'
import {join, relative} from "path";

// Module options TypeScript interface definition
export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-tsconfig-relative-paths',
    compatibility: {
      nuxt: '>=3.6.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    if (!nuxt.options.dev) return;

    const root = nuxt.options.rootDir;
    const slashRoot = join(root, '/');
    const cwd = process.cwd();
    const slashCwd = join(cwd, '/');

    nuxt.options.alias = {
      ...nuxt.options.alias ?? {},
      '##components': join(root, '.nuxt/components')
    }

    nuxt.hook('prepare:types', ({tsConfig}) => {
      let cwdRootRelative = relative(root, cwd);
      if (cwdRootRelative) cwdRootRelative += '/';

      tsConfig.compilerOptions!.baseUrl = relative(nuxt.options.buildDir, root);

      function replaceString(text: string) {
        if (text === root) return '.'
        if (text === `${root}/*`) return './*'

        return text.replace(slashRoot, '').replace(slashCwd, cwdRootRelative || '')
      }

      for (const [key, value] of Object.entries(tsConfig.compilerOptions!.paths)) {
        if (typeof value === 'object' && Array.isArray(value)) {
          value.map((value, index) => {
            if (!tsConfig.compilerOptions) return
            tsConfig.compilerOptions.paths[key][index] = replaceString(value);
          })
        } else if (typeof value === 'string') {
          tsConfig.compilerOptions!.paths[key] = replaceString(value);
        }
      }
    })
  }
})
