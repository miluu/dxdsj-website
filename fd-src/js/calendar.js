/* global $, moment */
$(function() {
{
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
}

{
  const $showtime = $('.j-showtime');
  const $showdate = $('.j-showdate');
  $showtime.each(function(index, el) {
    const $el = $(el);
    const $tr = $(el).parent('tr');
    let timeStr = $tr.data('timestr');
    timeStr = timeStr.split(' ')[1];
    let timeArr = timeStr.split(':');
    timeStr = timeArr[0] + ':' + timeArr[1];
    $el.text(timeStr);
  });
  $showdate.each(function(index, el) {
    const $el = $(el);
    const $tr = $(el).parent('tr');
    let timeStr = $tr.data('timestr');
    let timeArr = timeStr.split(' ')[0].split('-');
    timeStr = timeArr[1] + '-' + timeArr[2];
    $el.text(timeStr);
  });
}

{
  const $nodata = $('.j-nodata');
  $nodata.each(function(index, el) {
    let $el = $(el);
    let $tbody = $el.parents('tbody');
    let $allTr = $tbody.find('tr');
    if ($allTr.size() <= 1) {
      $el.show();
    }
  });
}

{
  const todayStr = window.__queryDate;
  const today = moment(todayStr);
  const preWeek = moment(todayStr).add(-7, 'day');
  const nextWeek = moment(todayStr).add(7, 'day');
  const firstDat = moment(today).startOf('isoWeek');
  for (let i = 0; i < 7; i++) {
    let day = moment(firstDat).add(i, 'day');
    const $a = $(`.j-w${i + 1}`);
    $a.find('.j-weekdate').text(day.format('MM/DD'));
    $a.attr('href', `/calendar?date=${day.format('YYYY-MM-DD')}`);
    if (today.weekday() === day.weekday()) {
      $a.parents('.week-item').addClass('active');
    }
  }
  $('.j-preweek').attr('href', `/calendar?date=${preWeek.format('YYYY-MM-DD')}`);
  $('.j-nextweek').attr('href', `/calendar?date=${nextWeek.format('YYYY-MM-DD')}`);
}
});
