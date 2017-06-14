// import codeGen from './field';
// import codeGen from './section';
import codeGen from './form';
import config from '../config';

codeGen(config.config)(config.template)(config.entry)([])('../../dist');

