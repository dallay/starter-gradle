import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_BZagVjeS.mjs';
import { s as starlightConfig, B as BuiltInDefaultLocale, g as getEntry, a as getCollectionPathFromRoot, p as project } from '../chunks/translations_B1Ja9eit.mjs';
import { n as normalizeCollectionEntry, $ as $$Common } from '../chunks/common_BpZleRS3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = true;
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const { lang = BuiltInDefaultLocale.lang, dir = BuiltInDefaultLocale.dir } = starlightConfig.defaultLocale || {};
  let locale = starlightConfig.defaultLocale?.locale;
  if (locale === "root") locale = void 0;
  const entryMeta = { dir, lang, locale };
  const fallbackEntry = {
    slug: "404",
    id: "404",
    body: "",
    collection: "docs",
    data: {
      title: "404",
      template: "splash",
      editUrl: false,
      head: [],
      hero: { tagline: Astro2.locals.t("404.text"), actions: [] },
      pagefind: false,
      sidebar: { hidden: false, attrs: {} },
      draft: false
    },
    filePath: `${getCollectionPathFromRoot("docs", project)}/404.md`
  };
  const userEntry = await getEntry("docs", "404");
  const entry = userEntry ? normalizeCollectionEntry(userEntry) : fallbackEntry;
  const route = { ...entryMeta, entryMeta, entry, id: entry.id, slug: entry.slug };
  return renderTemplate`${renderComponent($$result, "CommonPage", $$Common, { "route": route })}`;
}, "/app/docs/website/node_modules/.pnpm/@astrojs+starlight@0.31.1_astro@5.17.1_jiti@2.6.1_rollup@4.46.2_typescript@5.9.3_yaml@2.8.1_/node_modules/@astrojs/starlight/routes/static/404.astro", void 0);

const $$file = "/app/docs/website/node_modules/.pnpm/@astrojs+starlight@0.31.1_astro@5.17.1_jiti@2.6.1_rollup@4.46.2_typescript@5.9.3_yaml@2.8.1_/node_modules/@astrojs/starlight/routes/static/404.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
