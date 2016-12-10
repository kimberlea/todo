var Todo = {};

window.Todo = Todo;

class Application extends QuickScript.Application {
  init() {

  }
}
Todo.Application = Application;


class TodoList extends QuickScript.Model {
  init() {
    this.addFields(['title'], "");
  }
}
Todo.TodoList = TodoList;
Todo.TodoList.includeAdapter({
  load_url: "/lists",
  save_url: "/list"
});


class ListsView extends QuickScript.View {
  init() {
    this.new_list_title = ko.observable("");
    this.lists = ko.observableArray();
    this.loadLists();
  }

  loadLists() {
    Todo.TodoList.Adapter.index({
      data: {scope: {with_type: 'groceries'}},
      callback: function(resp) {
        this.lists([]);
        for (var list_data of resp.data) {
          var list = new Todo.TodoList(list_data);
          this.lists.push(list)
        }
      }.bind(this)
    });
  }

  saveList() {
    var title = this.new_list_title();
    Todo.TodoList.Adapter.save({
      data: {title: title},
      callback: function(resp) {
        var list = new TodoList(resp.data);
        this.lists.push(list);
        this.new_list_title("");
      }.bind(this)
    });
    console.log("Saving new list title " + title);
  }
}
Todo.ListsView = ListsView;
