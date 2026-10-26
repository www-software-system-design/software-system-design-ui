import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const read=path=>readFileSync(resolve(root,path),'utf8');

export function validateDictionary(dictionary){
  assert.equal(dictionary.schemaVersion,1,'Unsupported dictionary schema');
  const pkg=JSON.parse(read('package.json'));
  const rootExports=read('src/index.ts');
  const ids=new Set();
  const components=new Set();
  for(const entry of dictionary.entries){
    assert.match(entry.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/,'Invalid stable ID');
    assert(!ids.has(entry.id),`Duplicate dictionary ID: ${entry.id}`);
    ids.add(entry.id);
    assert(dictionary.categories.includes(entry.category),`Unknown category: ${entry.category}`);
    assert(['component','recipe','reference'].includes(entry.kind),'Unknown availability');
    assert(entry.name&&entry.purpose&&Array.isArray(entry.aliases),'Missing entry contract');
    assert(entry.standard.startsWith('https://'),'References must use HTTPS');
    if(entry.component){
      const target=pkg.exports['./'+entry.subpath];
      assert(target?.import&&target?.types,`Missing public export for ${entry.name}`);
      assert(existsSync(resolve(root,entry.source)),`Missing implementation: ${entry.source}`);
      const localIndex=entry.source.replace(/[^/]+$/, 'index.ts');
      assert(read(localIndex).includes(entry.component),`Missing local export: ${entry.component}`);
      const importPath='./'+localIndex.replace(/^src\//,'').replace(/\.ts$/,'.js');
      assert(rootExports.includes(importPath),`Missing root export: ${entry.component}`);
    }
    if(entry.kind==='component'){
      assert(entry.component&&entry.subpath,'Component entries need a public API');
      components.add(entry.component);
    }
    if(entry.kind==='reference')assert(!entry.component&&!entry.subpath&&!entry.story,'Reference-only entries cannot advertise a shipped control');
    if(entry.story){
      assert(existsSync(resolve(root,entry.storyFile)),`Missing story: ${entry.storyFile}`);
      assert.match(entry.story,/^[a-z0-9-]+--[a-z0-9-]+$/,'Invalid Storybook ID');
    }
  }
  for(const level of ['atoms','molecules','organisms','templates']){
    for(const slug of readdirSync(resolve(root,'src/components',level))){
      const directory=resolve(root,'src/components',level,slug);
      if(!existsSync(resolve(directory,'index.ts')))continue;
      for(const file of readdirSync(directory).filter(file=>/^[A-Z].*\.tsx$/.test(file)&&!/[.](test|stories)[.]/.test(file))){
        const name=file.slice(0,-4);
        assert(components.has(name),`Public component missing from dictionary: ${name}`);
      }
    }
  }
  return {entries:ids.size,components:components.size};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const result=validateDictionary(JSON.parse(read('docs/ui-dictionary.json')));
  console.log(`Validated UI dictionary: ${result.entries} entries, ${result.components} public components.`);
}
