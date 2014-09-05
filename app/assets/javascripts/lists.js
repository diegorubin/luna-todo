function List(id) {
  var self = this;

  self.form = $('form');
  self.method = self.form.find("input[name='_method']").val() || 'post';

  self.addItem = function(event) {
    event.preventDefault();
    var newItem = createItem();

    $("#items").append(newItem);

    self.updatePositions();
  }

  self.updatePositions = function() {

    var items = $("#items li");
    for(var i = 0; i < items.length; i++) {
      var li = $(items[i]);
      li.find('input.position').val(i);
    }

  }

  self.notifySuccess = function() {
    $('.alert-success').css('display', 'block');
    $('.alert-success').removeClass('hidden');
    $('.alert-success').fadeOut(2000);
  }

  self.save = function() {
    var url = self.form.attr('action');
    data = get_attributes_in_form(self.form);

    var service = new ApiServiceCall(url);
    service.success = function(result) {
      if(result === '') {
        alert('não foi possivel salvar');
      } else {
        $('#page-content').html(result);
        self.notifySuccess();
      }
    };
    service.submit({type: 'html', data: data, method: self.method});
  }

  // callbacks
  $('.add-item').click(self.addItem);

  // callbacks - save
  $("#items").on('blur', "input[type='text']", self.save);

}

