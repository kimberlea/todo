
/* LIST METHODS */

function addNewList() {
  var $input = $("input.lists-new-input");
  var new_title = $input.val();
  console.log(new_title);

  // send to server
  apiRequest({
    url: "/list",
    method: "POST",
    data: {title: new_title},
    success: function (resp) {
      updatePage([".lists-rows"]);
    }
  })
}

function editList(id) {
  $row = $('.list-row-' + id);
  console.log($row);
  var $link_title = $row.find('a.list-title');
  var $input_title = $row.find('input.list-title-edit');
  var $save_button = $row.find('button.save-edit-list');
  var $edit_button = $row.find('button.edit-list');
  // 1. hide the link with the title this is english
  $link_title.hide();
  $edit_button.hide();
  // 2. display the textbox
  $input_title.show();
  $save_button.show();
  // 3. Put the title in the textbox
  $input_title.val($link_title.text());
}



function saveEditList(id) {
  $row = $('.list-row-' + id);
  console.log($row);
  var $input = $row.find('input.list-title-edit');
  var new_title = $input.val();

  apiRequest({
    url: "/list",
    method: "POST",
    data: {id: id, title: new_title},
    success: function(resp) {
      updatePage(["lists-rows"]);
    }
  })
}

function deleteList(id) {
  apiRequest({
    url: "/list",
    method: "DELETE",
    data: {id: id},
    success: function (resp) {
      updatePage([".lists-rows"]);
    }
  })
}

/* ITEM METHODS */

function addNewItem() {
  // get list id
  var list_id = $("input[name=list_id]").val();
  // get the text from the input box
  var item_title = $("input.items-new-input").val();
  console.log(item_title);

  apiRequest({
    url: "/item",
    method: "POST",
    data: {title: item_title, list_id: list_id},
    success: function (resp) {
      updatePage([".item-rows"]);
      $("input.items-new-input").val("");
    }
  })
}

function editItem(id) {
  var $row = $('.item-row-' + id);
  console.log($row);
  var $link_title = $row.find('span.item-title');
  var $input_title = $row.find('input.item-title-edit');
  var $edit_button = $row.find('button.item-edit');
  var $save_button = $row.find('button.save-edit-item');

  //hide title
  $link_title.hide();
  //hide edit button
  $edit_button.hide();
  //dispaly textbox
  $input_title.show();
  $save_button.show();
  // put new title in textbox
  $input_title.val($link_title.text())
}

function saveEditItem(id) {
  var $row = $('.item-row-' + id);
  console.log($row);
  var $input = $row.find('input.item-title-edit');
  var new_title = $input.val();

  apiRequest({
    url: "/item",
    method: "POST",
    data: {id: id, title: new_title},
    success: function (resp) {
      updatePage([".item-rows"]);
    }
  })

}

function deleteItem(id) {
  apiRequest({
    url: "/item",
    method: "DELETE",
    data: {id: id},
    success: function (resp) {
      updatePage([".item-rows"]);
    }
  })
}

function changeItemCompleted(id) {
  console.log("Clicked " + id);
  // determine if row is checked or not
  is_checked = $(".item-row-" + id + " input[name=is_completed]").is(":checked")
  console.log ("Item " + id + " is checked: " + is_checked);
  // update the item at the server
  apiRequest({
    url: "/item",
    method: "POST",
    data: {id: id, is_completed: is_checked},
    success: function (resp) {
      updatePage([".item-rows"]);
    }
  })
}

function handleNewItemTyping() {
  // get text in the input now
  var text = $('input.items-new-input').val();
  //console.log(text);
  updatePage([".item-rows"], {params: {filter: text}});
}

/* HELPER METHODS */

function apiRequest(opts) {
  opts.dataType = opts.dataType || 'json';
  opts.method = opts.method || 'POST';
  $.ajax(opts);
}

function updatePage(element_classes, opts) {
  var url = location.pathname;
  opts = opts || {};
  var data = opts.params || {};
  apiRequest({
    data: data,
    url: url,
    method: 'GET',
    dataType: 'html',
    success: function (resp) {
      $new_html = $(resp);
      for (var element_class of element_classes) {
        //console.log(element_class);
        changed = $new_html.find(element_class).addBack(element_class).html();
        //console.log(changed);
        $(element_class).html(changed);
      }
    }
  })
}
