import React from 'react';
import AppState from '../AppState';
import Utils from '../Utils';

export default class TodoListRowView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      inputText: ""
    };
    this.textInput = React.createRef();
    this.promptDelete = this.promptDelete.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  promptDelete() {
    console.log("Should try to delete list.");
    $.confirm({
      title: "Confirm deletion",
      content: "Really delete this list?",
      buttons: {
        confirm: ()=>{
          this.deleteList();
        },
        cancel: ()=> { }
      }
    });
  }

  deleteList() {
    console.log("About to delete list.");
    var list = this.props.list;
    // 1. Tell server to delete the list (using the id)
    Utils.request({
      url: "/api/list",
      method: 'DELETE',
      data: {
        id: list.id
      },
      callback: (resp)=> {
        if (resp.success) {
          // 2. If server says cool, tell rest of site (all the other components)
          AppState.emit("todo_list.deleted", {list: list});
        }
      }
    });
  }

  startEditing() {
    //console.log("I want to edit this row: " + this.props.list.title);
    this.setState({isEditing: true, inputText: this.props.list.title});
  }

  stopEditing() {
    this.setState({isEditing: false});
    this.saveList();
  }

  handleInputChanged(event) {
    this.setState({inputText: event.target.value})
  }

  saveList() {
    var new_title = this.state.inputText;
    var list = this.props.list;
    Utils.request({
      url: "/api/list",
      method: 'POST',
      data: {
        id: list.id,
        title: new_title
      },
      callback: (resp)=> {
        if (resp.success) {
          AppState.emit("todo_list.updated", {list: resp.data});
        } else {
          $.alert({
            title: "Error",
            content: "Could not update list."
          })
        }
      }
    });
  }

  render() {
    const list = this.props.list;
    const editing = this.state.isEditing;
    var elTitle = (<a class="list-title" href="<%= list.view_path %>">{ list.title }</a>)
    var btnEdit = (
      <button class="edit-list btn-simple {editing ? 'hidden' : ''}" onClick={ this.startEditing }>
        <i class="fa fa-pencil"></i>
      </button>
    );
    var btnDone = (
      <button class="save-edit btn-simple {editing ? '' : 'hidden'}" onClick={ this.stopEditing }>
        <i class="fa fa-check"></i>
      </button>
    )
    if (this.state.isEditing == true) {
      elTitle = (<input type="text" class="list-title-edit" value={ this.state.inputText } onChange={this.handleInputChanged} />);
      btnEdit = null;
    } else {
      btnDone = null;
    }
    return (
      <div class="list-row">

        { elTitle }

        <div class="list-row-actions">
          { btnEdit }
          { btnDone }
          <button class="delete-list btn-simple" onClick={ this.promptDelete }>
            <i class="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }

}
