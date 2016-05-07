/* global $, moment */
$(function() {
  const $time = $('[data-unix]');
  const unix = +$time.data('unix');
  const timeText = moment.unix(unix).format('YYYY-MM-DD HH:mm:ss');
  $time.text(timeText);
});
