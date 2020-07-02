import {defineConfig} from 'umi';
import routes from './src/routes'

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
        exclude: []
    },
    cssLoader: {
        localsConvention: 'camelCase'
    },
    dynamicImport: {
        loading: "@/Loading"
    },
    hash: true,
    dva: {
        hmr: true,  //启用 dva model 的热更新。
        immer: true //启用 immer 以方便修改 reducer
    },
    routes
});
