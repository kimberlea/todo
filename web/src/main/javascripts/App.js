import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import TodoListsView from './views/TodoListsView';

export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div class="container">
          <div class="root container-content">
            <Route exact path="/" component={ TodoListsView }/>
          </div>
          <div class="list-footer">
            <Link to="/">Home</Link>
            |
            <span>Created by Kimberlea</span>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

