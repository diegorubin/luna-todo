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

