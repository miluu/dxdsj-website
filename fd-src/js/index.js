/*global $*/
alert();
$(function() {
  const $checkbox = $('.j-checkbox');
  $checkbox.each(function(index, el) {
    const $el = $(el);
    const $input = $el.find(':checkbox');
    const random = Math.floor(Math.random() * 100000);
    let on = $input.prop('checked');
    let id = $input.attr('id');
    if (!id) {
      id = `checkbox-${random}`;
      $input.attr('id', id);
    }
    $el.attr('for', id)
      .addClass(on ? 'on' : 'off');
    $input.change(function() {
      on = $input.prop('checked');
      $el.removeClass('on off').addClass(on ? 'on' : 'off');
    });
  });
});
