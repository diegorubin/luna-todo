function List(id) {
  var self = this;

  self.addItem = function(event) {
    event.preventDefault();
    var newItem = createItem();

    $("#items").append(newItem);
  }

  self.save = function() {
    var url = $('form').attr('action');
    var service = new ApiServiceCall(url);
  }

  $('.add-item').click(self.addItem);

}

