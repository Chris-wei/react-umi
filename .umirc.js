import { defineConfig } from 'umi';
import routes from './src/routes';
export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
        exclude: []
    },
    antd: {},
    dva: {
        immer: true,
        hmr: true,
    },
    routes
});
//# sourceMappingURL=.umirc.js.map