import React from 'react';
import Utils from '../Utils';
import AppState from '../AppState';
import TodoListRowView from './TodoListRowView'

export default class TodoListsView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      headerTitle: "Kim's List",
      lists: [],
      newListInput: ""
    };
    this.addNewList = this.addNewList.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.handleListUpdated = this.handleListUpdated.bind(this)
    this.handleListDeleted = this.handleListDeleted.bind(this)
  }

  componentDidMount() {
    this.loadLists();
    AppState.on("todo_list.updated", this.handleListUpdated);
    AppState.on("todo_list.deleted", this.handleListDeleted);
  }

  componentWillUnmount() {
    AppState.off("todo_list.updated", this.handleListUpdated);
    AppState.off("todo_list.deleted", this.handleListDeleted);
  }

  loadLists() {
    Utils.request({
      url: "/api/lists",
      method: 'GET',
      callback: (resp)=> {
        if (resp.success) {
          this.setState({lists: resp.data});
        }
      }
    });
  }

  addNewList() {
    Utils.request({
      url: "/api/list",
      method: 'POST',
      data: {
        title: this.state.newListInput
      },
      callback: (resp)=> {
        if (resp.success) {
          this.loadLists();
          this.setState({newListInput: ""});
        } else {
          console.error("List could not be saved.");
        }
      }
    });
  }

  handleInputChanged(event) {
    this.setState({newListInput: event.target.value});
  }

  handleListUpdated(event) {
    var updated_list = event.list
    var lists = this.state.lists.map((list)=>{return (list.id == updated_list.id) ? updated_list : list});
    this.setState({lists: lists})
  }
  handleListDeleted(event) {
    var deleted_list = event.list;
    var newlists = this.state.lists.filter((list)=> { return list.id != deleted_list.id});
    this.setState({lists: newlists});
  }

  render() {
    let lists = this.state.lists;
    return (
      <div>

        <div class="lists-header">
          <h1>{ this.state.headerTitle }</h1>
        </div>

        <div class="lists-content content-panel">
          <div class="lists-new">
            <input class="lists-new-input" type="text" placeholder="Enter title of list" value={ this.state.newListInput } onChange={this.handleInputChanged} />
            <button class="new-add" onClick={ this.addNewList }>+</button>
          </div>

          <div class="lists-rows">

            { lists.map( (list) => (
              <TodoListRowView list={ list }/>
            ))}

          </div>
        </div>
      </div>
    );

  }

}
