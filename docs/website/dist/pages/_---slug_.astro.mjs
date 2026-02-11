import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_BZagVjeS.mjs';
import { $ as $$Common, p as paths } from '../chunks/common_BpZleRS3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = true;
async function getStaticPaths() {
  return paths;
}
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "CommonPage", $$Common, { "route": Astro2.props })}`;
}, "/app/docs/website/node_modules/.pnpm/@astrojs+starlight@0.31.1_astro@5.17.1_jiti@2.6.1_rollup@4.46.2_typescript@5.9.3_yaml@2.8.1_/node_modules/@astrojs/starlight/routes/static/index.astro", void 0);

const $$file = "/app/docs/website/node_modules/.pnpm/@astrojs+starlight@0.31.1_astro@5.17.1_jiti@2.6.1_rollup@4.46.2_typescript@5.9.3_yaml@2.8.1_/node_modules/@astrojs/starlight/routes/static/index.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	getStaticPaths,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
