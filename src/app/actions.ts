import { Overmind } from 'overmind';
import { Context } from '.';
import { Filter } from './state';

export const onInitializeOvermind = (
  { state, actions, effects }: Context,
  instance: Overmind<Context>
) => {
  state.todos = effects.storage.getTodos();

  instance.reaction(
    ({ todos }) => todos,
    (todos) => effects.storage.saveTodos(todos),
    { nested: true }
  );

  effects.router.initialize({
    '/': () => actions.changeFilter(Filter.ALL),
    '/active': () => actions.changeFilter(Filter.ACTIVE),
    '/completed': () => actions.changeFilter(Filter.COMPLETED),
  });
};

export const changeNewTodoTitle = ({ state }: Context, title: string) => {
  state.newTodoTitle = title;
};

export const addTodo = ({ state, effects }: Context) => {
  const id = effects.ids.create();

  state.todos[id] = {
    id,
    title: state.newTodoTitle,
    completed: false,
    isEditing: false,
    editedTitle: state.newTodoTitle,
  };

  state.newTodoTitle = '';

  if (state.filter === 'completed') {
    effects.router.goTo('/active');
  }
};

export const toggleTodo = ({ state }: Context, todoId: string) => {
  state.todos[todoId].completed = !state.todos[todoId].completed;
};

export const toggleAllTodos = ({ state }: Context) => {
  const isAllChecked = state.isAllTodosChecked;

  state.currentTodos.forEach((todo) => {
    todo.completed = !isAllChecked;
  });
};

export const removeTodo = ({ state }: Context, todoId: string) => {
  delete state.todos[todoId];
};

export const clearCompleted = ({ state }: Context) => {
  Object.values(state.todos).forEach((todo) => {
    if (todo.completed) {
      delete state.todos[todo.id];
    }
  });
};

export const changeEditingTodoTitle = (
  { state }: Context,
  {
    title,
    todoId,
  }: {
    title: string;
    todoId: string;
  }
) => {
  state.todos[todoId].editedTitle = title;
};

export const saveEditingTodoTitle = ({ state }: Context, todoId: string) => {
  const todo = state.todos[todoId];

  if (todo.isEditing) {
    todo.title = todo.editedTitle;
    todo.isEditing = false;
  }
};

export const editTodo = ({ state }: Context, todoId: string) => {
  const todo = state.todos[todoId];
  todo.isEditing = true;
  todo.editedTitle = todo.title;
};

export const cancelEditingTodo = ({ state }: Context, todoId: string) => {
  state.todos[todoId].isEditing = false;
};

export const changeFilter = ({ state }: Context, filter: Filter) => {
  state.filter = filter;
};
