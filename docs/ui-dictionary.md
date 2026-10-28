# Web UI control dictionary

This is the shared web UI reference for software-system.design MFEs. The
[machine-readable inventory](ui-dictionary.json) defines the names, aliases,
categories, availability, imports and examples. In Storybook, open **Reference →
UI dictionary** to search by purpose or familiar terms and filter by category.
**Reference → Control gallery** shows the common controls together.

| Availability | Meaning |
| --- | --- |
| Component | Implemented public React API with local tests and typed stories |
| Recipe | Compose existing components or native HTML; read the stated contract |
| Reference | Named specialized pattern; no package component is advertised |

The dictionary is a maintained vocabulary, not a claim that a finite collection
implements every interface ever used on the web. Reference-only entries explicitly
identify contracts such as editable data grids, hierarchical trees, application
menus and rich-text editors. Do not replace these with unrelated controls or
infer support from a similar name.

## Categories and public APIs

| Category | Components |
| --- | --- |
| Actions | Button, ToggleButton, Link, ThemeToggle, Toolbar |
| Forms | TextInput, TextField, TextArea, NativeField, Checkbox, RadioButton, Switch, SelectField, RangeField, FileUpload, Fieldset, Autocomplete, SearchField |
| Navigation | Breadcrumbs, Tabs, Pagination, SiteHeader, SiteFooter |
| Feedback | Alert, ContentState, Spinner, ProgressBar, Meter, Skeleton |
| Overlays | Dialog, Tooltip |
| Content | Avatar, Badge, Separator, Disclosure, Accordion, ContentCard, SectionHeading, StepList, Callout, Timeline |
| Data display | Statistic, DataTable, DataChart, SearchPanel |
| Layout | ExplorerLayout, MarketingLayout, SplitLayout |

All components have root and kebab-case subpath imports. See the JSON inventory
for the exact subpath and Storybook destination. Import styles once:

```tsx
import '@software-system.design/ui/styles.css';
import {Checkbox} from '@software-system.design/ui/checkbox';
import {Fieldset, RadioButton, SelectField, NativeField} from '@software-system.design/ui';

<Fieldset legend="Delivery preferences">
  <Checkbox label="Send an email receipt" name="receipt" value="yes" />
  <RadioButton label="Standard delivery" name="order-delivery" value="standard" />
  <RadioButton label="Express delivery" name="order-delivery" value="express" />
  <SelectField label="Region" name="region" defaultValue="in">
    <option value="in">India</option><option value="eu">Europe</option>
  </SelectField>
  <NativeField type="date" label="Delivery date" name="delivery-date" />
</Fieldset>;
```

## Form contracts

- Visible labels, hints, errors, choices, units, action names and content are
  supplied by the MFE. Hints and errors compose with external `aria-describedby`
  IDs. `id`, `name`, native form attributes and refs address the actual input.
- Native controls use React's native controlled/uncontrolled contracts:
  `value/onChange` or `defaultValue`; `checked/onChange` or `defaultChecked`.
  Use `event.currentTarget.value`, `checked`, `files` or `selectedOptions` as
  appropriate. Keep ownership stable during an instance's lifetime.
- Checkbox mixed state is consumer-owned through `indeterminate`. Update it in
  response to selection changes; it is not a separate submitted form value.
  A Switch uses native checkbox behavior and a switch role, without mixed state.
- Give each independent native radio group a distinct `name`, including separate
  MFE roots sharing one HTML document. Use Fieldset/legend for group naming.
- TextInput/TextField retain their existing text, search, email, URL, telephone
  and password types. Use NativeField for number, date, datetime-local, time,
  month, week, color, range and file types. Native date values use HTML formats;
  display locale, browser support and picker appearance depend on the browser.
  `datetime-local` carries no time zone. MFEs own parsing and time-zone rules.
- RangeField and FileUpload are explicit conveniences over NativeField. File
  inputs are uncontrolled. Selection never uploads data. `accept` is a picker
  hint; applications still validate content and size at their service boundary.
- SelectField supports native option/optgroup children, `multiple`, and `size`.
  Autocomplete is a native datalist with free-text entry, not a selection-only or
  async combobox. Browser and assistive-technology datalist support varies.
- Native form submission, disabled fieldsets, constraints and uncontrolled reset
  remain native. MFEs must reset their own controlled state and own validation,
  request state, persistence, submission and error summaries.

## Composite interaction contracts

Tabs supports controlled `value/onValueChange` or `defaultValue`. Arrow keys wrap
among enabled tabs and automatically activate the focused tab. Home/End select
the first/last enabled tab; vertical orientation uses Up/Down and horizontal RTL
reverses Left/Right. All panels remain mounted so local child state is preserved.
Values should be unique and stable. If a selected item disappears or becomes
disabled, presentation falls back to the first enabled tab without changing the
consumer's value. Avoid tabs for expensive asynchronous panels without a
consumer-owned loading strategy.

Toolbar is a group of buttons or ToggleButton controls. It supplies arrow-key
roving focus, Home/End, vertical orientation and RTL. It never invokes commands
while moving focus. Do not place text inputs, nested toolbars or menus in this
button-only toolbar. ToggleButton has controlled `pressed/onPressedChange` or
`defaultPressed` state and preserves the underlying Button contract.

Accordion is a named collection of independent native Disclosure sections.
It does not impose document-global exclusive group names. Use individual
controlled Disclosure components when the MFE coordinates expansion.

## Overlay and feedback contracts

Dialog is controlled through `open/onOpenChange` in an MFE client wrapper. Its
native `showModal()` call runs after hydration; SSR markup is initially closed,
including when the requested initial state is open. The browser owns modality,
focus containment, Escape dispatch and restoration to the opener. Supply a
visible title, optional description and explicit actions. The default close label
uses caller `closeLabel`, scoped optional `messages.close`, then English.
Use the native platform in modern browsers; no browser polyfill is bundled.
The dialog stays inside its provider DOM scope, including when rendered in the
browser's top layer. Modal focus/inert behavior is verified in browser tests.

Tooltip accepts one focusable DOM element or a component that forwards DOM ARIA
and keyboard props. It preserves existing descriptions and keyboard handlers,
opens on hover/focus, persists while hovered, and closes with Escape or after
hover/focus leave. Content is noninteractive plain text. Use Dialog or a dedicated
popover contract for links, inputs or buttons inside floating content. Tooltips
must not be the only place essential instructions are available. Placement is
simple and in-scope; collision-aware placement is not implemented.

Alert uses polite `status` announcements by default. Request `urgency="assertive"`
only for urgent content. Color tone does not determine urgency. MFEs own toast
queues, notification timing and focus. A static live region on initial page load
does not guarantee an announcement; mount or update it when feedback occurs.
ProgressBar is task completion, optionally indeterminate; Meter is a bounded
measurement. Invalid finite bounds/values throw rather than silently clamp.
Skeleton is decorative; use one meaningful status announcement around the loading
section. Spinner has a visible, localizable loading label and respects reduced
motion. Avatar falls back to caller initials or derived initials after image
failure; it is not an interactive profile menu.

## Adoption and maintenance

These APIs are additive for the next minor release. Existing components, chart
work, imports and complete message catalogs remain compatible. No runtime npm
dependency is added. Do not copy library sources into MFEs or depend on private
selectors. Use scoped semantic tokens and UIProvider for locale, direction and
light/dark/system themes. Keep initial configuration consistent during hydration.

When adding or changing a public component, update its dictionary entry, API,
stories, tests, root/subpath exports, changelog and relevant consumer checks
together. `npm run lint` checks dictionary coverage and destinations. Story-only
filtering and reference data never enter the published runtime. Run the normal
repository validation suite; inventory checks do not prove accessibility.

The automated browser target is Chromium. Native pickers and assistive technology
behavior need device/browser verification for each MFE's supported environment.
The reference follows [HTML form controls](https://html.spec.whatwg.org/multipage/input.html),
[WAI-ARIA patterns](https://www.w3.org/WAI/ARIA/apg/patterns/),
[tabs keyboard guidance](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), and
[native dialog behavior](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element).
