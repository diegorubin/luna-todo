$(function() {

  $(document).on('click', '.open-overlay', function(event) {
    event.preventDefault();

    var url = $(this).attr("href");
    var overlay = '#' + $(this).attr("data-overlay");

    open_overlay(url, overlay);

  });

  $(document).on('click', '.submit-api-form', function(event) {
    event.preventDefault();

    var form = new ResourceForm($(this));
    form.submit();

  });

  $(document).on('keypress', "form input[type='text']", function(event) {
    if(event && event.keyCode == 13) {
      event.preventDefault();

      var form = new ResourceForm($(this).closest('form').find('.submit-api-form'));
      form.submit();
    }
  });

});

function list_errors_in_page(errors, div) {
  div.html();
  var list = $("<ul></ul");

  for(var error in errors){
    list.append("<li>" + error + ": " + errors[error] + "</li>");
  }

  div.html(list);
}

function get_attributes_in_form(form) {

  var attrs = {};
  var field_types = ["input", "select", "textarea", "hidden"];

  for(var j = 0; j < field_types.length; j++){
    var inputs = form.find(field_types[j]);

    for(var i = 0; i < inputs.length; i++) {
      var input = $(inputs[i]);
      attrs[input.attr("name")] = input.val();
    }

  }

  /* get values of radio and checkbox */
  var radios = $("input[type='radio']:checked");

  for(var i = 0; i < radios.length; i++) {
    var name = $(radios[i]).attr('name');
    attrs[name] = $(radios[i]).val();
  }

  var checkboxes = $("input[type='checkbox']");
  for(var i = 0; i < checkboxes.length; i++) {
    var name = $(checkboxes[i]).attr('name') || '';

    // utilizado normalmente por atributos com _ids
    if(name.match(/\[\]$/)) {

      if((typeof attrs[name]) == 'string') {attrs[name] = [];}
      if($(checkboxes[i]).is(":checked"))
        attrs[name].push($(checkboxes[i]).val());

    } else {

      attrs[name] =
        ($(checkboxes[i]).is(":checked") ? $(checkboxes[i]).val() : '');

    }
  }

  return attrs;
}

function open_overlay(url_service, overlay, data) {

  $.ajax({
    type: 'GET',
    dataType: 'html',
    data: data || {},
    url: url_service,
    success: function(data) {

      $(overlay).html(data);
      $(overlay).modal();

    },
    error: function() {
      location.reload();
    }
  });

}

function ApiServiceCall(url){
  var self = this;
  self.url = url;
  self.success = false;
  self.submit = function(options) {
    $.ajax({
      type: options['method'] || 'POST',
      dataType: options['type'] || 'json',
      data: options['data'] || {},
      url: self.url,
      success: function(data, textStatus, xhr) {
        if(self.success) self.success(data);
      },
      error: function(data) {
        location.reload();
      }
    });
  };
}

function ResourceForm(object) {
  var self = this;
  self.sender = object;

  self.form = self.sender.closest("form");
  self.model = self.sender.attr("data-model");

  self.method = self.form.find("input[name='_method']").val() || 'post';

  self.list_errors_in_form = function(errors) {
    var div = $(self.form.find("#" + self.model + "-errors"));
    list_errors(errors, div);
  };

  self.submit = function() {

    var attrs = get_attributes_in_form(self.form);
    var path = self.form.closest("form").attr("action");

    $.ajax({
      type: self.method,
      dataType: "json",
      data: attrs,
      url: path,

      success: function(data, textStatus, xhr) {
        if(data['status'] == 'ok') {

          if(self.on_ok_status) {
            self.on_ok_status(data);
          } else {

            if(data['to']) {
              location = data['to'];
            } else {
              location.reload();
            }
          }
        } else {
          self.list_errors_in_form(data['errors']);
        }
        $('.loading-box').css('display', 'none');
      },

      error: function() {
        location.reload();
      }
    });

  }
}

