const levels = ['atoms', 'molecules', 'organisms', 'templates'];
module.exports = {
  forbidden: [
    { name: 'no-cycles', severity: 'error', from: {}, to: { circular: true } },
    { name: 'no-next-runtime', severity: 'error', from: { path: '^src/' }, to: { path: '(^|/)next(/|$)' } },
    ...levels.slice(0, -1).map((level, index) => ({
      name: `${level}-cannot-import-higher-layers`, severity: 'error',
      from: { path: `^src/components/${level}/` },
      to: { path: `^src/components/(${levels.slice(index + 1).join('|')})/` }
    })),
    { name: 'foundations-cannot-import-components', severity: 'error', from: { path: '^src/(hooks|providers|tokens|i18n|utilities)/' }, to: { path: '^src/components/' } }
  ],
  options: { tsConfig: { fileName: 'tsconfig.json' }, doNotFollow: { path: 'node_modules' }, exclude: '\\.(test|stories)\\.' }
};
