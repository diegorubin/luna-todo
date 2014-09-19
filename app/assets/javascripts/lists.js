function List(id) {
  var self = this;

  self.getForm = function() {
    return $('form');
  };

  self.getMethod = function() {
    return self.getForm().find("input[name='_method']").val() || 'post';
  }

  self.editItem = function(event) {
    var field = $(this).parent().find('.item-description-field');

    $(this).addClass('hide');
    field.removeClass('hide');
    field.focus();
  };

  self.updatePositions = function() {

    var items = $(".items li");
    for(var i = 0; i < items.length; i++) {
      var li = $(items[i]);
      li.find('input.position').val(i);
    }

    self.save();
  };

  self.notifySuccess = function() {
    $('.alert-success').css('display', 'block');
    $('.alert-success').removeClass('hidden');
    $('.alert-success').fadeOut(2000);
  };

  self.save = function(event) {
    if(event && event.keyCode != undefined && event.keyCode != 13) return true;

    var url = self.getForm().attr('action');
    data = get_attributes_in_form(self.getForm());

    var service = new ApiServiceCall(url);
    service.success = function(result) {
      if(result === '') {
        alert('não foi possivel salvar');
      } else {
        $('#page-content').html(result);
        self.notifySuccess();
        self.reload();
      }
    };
    service.submit({type: 'html', data: data, method: self.getMethod()});
  };

  self.destroy = function(event) {
    event.preventDefault();

    var li = $(this).parent();
    li.find(".destroy-item").attr('checked', 'checked');
    self.save();
  };

  self.reload = function() {
    // sortable
    $(".todo-items").sortable({stop: self.updatePositions});
  };

  // callbacks
  $('#page-content').on('click', '.item-description-label', self.editItem);

  // callbacks - save
  $("#page-content").on('keypress', ".item-description-field-static", self.save);
  $("#page-content").on('keypress', ".item-description-field-edit", self.save);
  $("#page-content").on('blur', ".item-description-field-edit", self.save);
  $('#page-content').on('click', '.item-done-field', self.save);

  // callbacks - destroy
  $('#page-content').on(
    'mouseenter', '.item-container', function(){$(this).find('a').removeClass('hide')});

  $('#page-content').on(
    'mouseleave', '.item-container', function(){$(this).find('a').addClass('hide')});

  $("#page-content").on('click', ".remove-item", self.destroy);

  self.reload();
}

