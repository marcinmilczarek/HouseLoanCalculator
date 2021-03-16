import { environment as defaultEnvironment } from './environment.defaults';
import { environment as Environment } from './environment.defaults';

export const environment = {
  ...defaultEnvironment,
  ...Environment,

  production: false  
};
