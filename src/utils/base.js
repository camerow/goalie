import Rebase from 're-base';
import config from './firebase-config';

var base = Rebase.createClass(config, 'myApp');

export default base;