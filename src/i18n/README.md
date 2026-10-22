# Internationalization

`UIMessages` defines library-owned copy. English defaults are provider-optional. `getMessages(locale)` returns frozen English, French, or Malayalam catalogs, with regional fallback to the base language and English fallback for unsupported/malformed locales. Catalog selection is explicit: pass `messages={getMessages(locale)}` to UIProvider. Set direction explicitly; locale alone does not change it.

`formatResultCount(count, { locale, messages })` supports all six CLDR plural categories and locale-aware numbers. The Malayalam catalog uses singular and plural messages and left-to-right direction. Counts must be non-negative safe integers. Numbering follows BCP 47 locale options: `ml` uses Latin digits by default, while `ml-u-nu-mlym` explicitly requests Malayalam digits. Avoid concatenating translated sentence fragments.

Consumers may provide partial message overrides or their own complete catalog and retain any application translation framework. MFEs own application copy, such as panel titles and list content. Functions that prepare strings on the server stay in MFE server code; pass resolved strings or serializable message objects across client boundaries.

Pure unit tests cover catalogs, fallback, formatting, plural categories, custom messages, and invalid counts. Storybook Foundations/Internationalization shows messages and plurals side by side. New required message keys affect consumers implementing a complete UIMessages catalog; document those changes and version them appropriately.
