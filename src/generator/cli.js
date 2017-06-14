import path from 'path';
import fs from 'fs-extra';
import yargs from 'yargs';

import {
  writeFile,
  cleanDir,
} from '../util/file';

import formCodeGen from './form';
import sectionCodeGen from './section';
import fieldCodeGen from './field';

const DEST_DIR = path.resolve(__dirname, '../../dist');
const DEFAULT_CONFIG = path.resolve(__dirname, '../', 'config.js');

yargs
  .usage('$0 <cmd> [args]')
  .command(
    'run',
    'Generate React form component',
    {
      config: {
        alias: 'c',
        default: DEFAULT_CONFIG,
      },
      output: {
        alias: 'o',
        default: DEST_DIR,
      }
    },
    (argv) => {
      console.log('\n========Start========\n');
      cleanDir(argv.o)
      .then(() => require(argv.c))
      .then(d => {
        const { config, template, entry } = d.default;
        let codeGen = formCodeGen;
        //decide which codeGen should use.
        if(entry[0]){
          if(entry[0].type === 'section') codeGen = sectionCodeGen;
          if(entry[0].type === 'field') codeGen = fieldCodeGen;
        }
        return codeGen(config)(template)(entry)([])(argv.o)
      })
      .then(() => {
        console.log('\n========Finish all tasks========\n');
      })
    }
  )
  .help()
  .argv;



