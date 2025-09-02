import { createIoCContainer } from './ioc';
import { Logger } from './services/logger';
import type { User } from './types';

const renderUsers = async (container: ReturnType<typeof createIoCContainer>) => {
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

  const container = createIoCContainer(config.api);

  renderUsers(container);
};

window.onload = (event: Event) => {
  const logger = new Logger();

  logger.info('Page is loaded.');

  app();
};
