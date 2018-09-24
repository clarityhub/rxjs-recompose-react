import React from 'react';
import { compose } from 'recompose';
import { mapPropsStream, withHandlers } from 'recompose';
import { combineLatest} from 'rxjs/operators';

import todos from './todos/store';

const App = ({ todos, onSubmit, onToggleComplete }) => {
  return (
    <div className="App">
      <header className="header">
        <h1>Todos</h1>
          
        <form onSubmit={onSubmit}>
          <input
            className="new-todo"
            name="text"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        <ul className="todo-list">
          {todos.items.map((todo, i) => (
            <li key={i}>
              <div className="view">
                <input
                  className="toggle"
                  onChange={onToggleComplete(i)}
                  type="checkbox"
                  checked={todo.completed}
                />
                <label>
                  {todo.text}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const withHandler = withHandlers({
  onSubmit: props => e => {
    e.preventDefault();

    props.todosActions.create(e.target.text.value);

    e.target.text.value = '';
  },

  onToggleComplete: props => index => () => {
    props.todosActions.toggleComplete(index);
  }
});

const withStore = mapPropsStream(props$ => props$.pipe(
  combineLatest(
    todos.observable$,
    (props, store) => ({
      ...props,
      todos: store,
      todosActions: todos.actions,
    }),
  )
))

export default compose(
  withStore,
  withHandler
)(App);
