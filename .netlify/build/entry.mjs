import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_1Fj0ylIk.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/tag/_tag_/_---page_.astro.mjs');
const _page2 = () => import('./pages/blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/blog/_---page_.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.13_@types+node@22.9.0_rollup@4.40.1_sass-embedded@1.81.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/tag/[tag]/[...page].astro", _page1],
    ["src/pages/blog/[slug].astro", _page2],
    ["src/pages/blog/[...page].astro", _page3],
    ["src/pages/index.astro", _page4]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a485f871-dc87-4c3b-97fe-64bd6b7094f4"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
