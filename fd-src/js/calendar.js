/* global $ */
$(function() {
  const $panels = $('.j-filter-panel');
  $panels.each(function(index, el) {
    const $panel = $(el);
    const $more = $panel.find('.j-more');
    const $li = $panel.find('.j-hide');
    $more.addClass('icon-arr-down-white');
    $li.addClass('hide');
    $more.click(function(e) {
      e.preventDefault();
      $li.toggleClass('hide');
      $more.toggleClass('icon-arr-down-white').toggleClass('icon-arr-up-white');
    });
  });
});
