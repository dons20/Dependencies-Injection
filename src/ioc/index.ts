import IoCContainer from 'ioc-lite';

import { Logger } from '../services/logger';
import { HTTP } from '../services/http';
import { Users } from '../services/users';
import type { ApiConfig } from 'src/types';

export const createIoCContainer = (config?: ApiConfig) =>  {
  const ioc = new IoCContainer();
  
  if (config) {
    ioc.register('config', config);
  }

  ioc.registerClass('logger', Logger);
  ioc.registerClass('http', HTTP);
  ioc.registerClass('users', Users);

  return ioc;
};
