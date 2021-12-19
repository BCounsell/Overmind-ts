import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import * as React from 'react';
import { render } from 'react-dom';
import { config } from './app';
import TodoApp from './components/TodoApp';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const rootElement = document.getElementById('root');

export const overmind = createOvermind(config, {
  devtools: false,
});

render(
  <Provider value={overmind}>
    <TodoApp />
  </Provider>,
  rootElement
);
