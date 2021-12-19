import * as React from 'react';
import classNames from 'classnames';
import { useAppState, useActions } from '../app';
import { pluralize } from '../utils';
import { Filter } from '../app/state';

const TodoFooter: React.FC = () => {
  const state = useAppState();
  const actions = useActions();

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{state.activeTodoCount}</strong>{' '}
        {pluralize(state.activeTodoCount, 'item')} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="/"
            className={classNames({ selected: state.filter === Filter.ALL })}
          >
            All
          </a>
        </li>{' '}
        <li>
          <a
            href="/active"
            className={classNames({ selected: state.filter === Filter.ACTIVE })}
          >
            Active
          </a>
        </li>{' '}
        <li>
          <a
            href="/completed"
            className={classNames({
              selected: state.filter === Filter.COMPLETED,
            })}
          >
            Completed
          </a>
        </li>
      </ul>
      {state.hasCompletedTodos ? (
        <button
          className="clear-completed"
          onClick={() => actions.clearCompleted()}
        >
          Clear completed
        </button>
      ) : null}
    </footer>
  );
};

export default TodoFooter;
