import { createIoCContainer } from './ioc';
import { Logger } from './services/logger';
import type { ApiConfig, User } from './types';

const container = createIoCContainer();

const renderUsers = async (config: ApiConfig) => {
  if (config) {
    container.register('config', config);
  }
  
  const usersService = container.resolve('users');

  if (!usersService || !usersService.getUsers) {
    console.error('Users service is not available');
    return;
  }

  const users = await usersService.getUsers() || [];

  const listNode = document.getElementById('users-list');
  if (!listNode) return;

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;

  renderUsers(config.api);
};

window.onload = (_event: Event) => {
  const logger = new Logger();

  logger.info('Page is loaded.');

  app();
};
