/*global $, _, moment*/
import tpl from './main-list-item.tpl';

$(function() {
{
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
}

{
  const $time = $('.j-unixtime');
  $time.each(function(index, el) {
    const $el = $(el);
    const unix = +$el.data('unix');
    const t = moment.unix(unix);
    const format1 = t.format('HH:mm');
    const format2 = t.format('YYYY-MM-DD HH:mm:ss');
    $el.text(format1);
    $el.attr('title', format2);
  });
}

{
  const $more = $('.j-main-list-more');
  const $list = $('.j-main-list');
  const itemTpl = _.template(tpl);
  let isAjaxing = false;
  setInterval(function() {
    let createdAt = $list.find('.item').first().data('created-at');
    let apiUrl = `/api-livenews?createdAt=${createdAt}&sort=1`;
    $.ajax({
      url: apiUrl,
      dataType: 'json'
    })
    .done(function(data) {
      if (data.status === 1) {
        renderList(data.list, true);
      }
    });
  }, 1000 * 60);
  $more.click(function(e) {
    if (isAjaxing) {return;}
    e.preventDefault();
    let createdAt = $list.find('.item').last().data('created-at');
    let apiUrl = `/api-livenews?createdAt=${createdAt}`;
    isAjaxing = true;
    $.ajax({
      url: apiUrl,
      dataType: 'json'
    })
    .done(function(data) {
      if (data.status === 1) {
        renderList(data.list);
      } else {
        alert('数据加载失败.');
      }
    })
    .fail(function() {
      alert('数据加载失败.');
    })
    .always(function() {
      isAjaxing = false;
    });
  });
  function renderList(data, realtime = false) { // eslint-disable-line
    let html = '';
    _.forEach(data, function(item) {
      html += itemTpl(item);
    });
    if (!realtime) {
      $list.append(html);
    } else {
      $list.prepend(html);
    }
  }
}

{
  const $clock = $('.j-clocktime');
  $clock.text(getMomentText());
  setInterval(function() {
    $clock.text(getMomentText());
  }, 100);
  function getMomentText() { // eslint-disable-line
    const now = moment();
    const dateText = now.format('YYYY-MM-DD HH:mm:ss');
    let weekText = '星期';
    switch (now.format('e')) {
      case '0':
        weekText += '日';
        break;
      case '1':
        weekText += '一';
        break;
      case '2':
        weekText += '二';
        break;
      case '3':
        weekText += '三';
        break;
      case '4':
        weekText += '四';
        break;
      case '5':
        weekText += '五';
        break;
      case '6':
        weekText += '六';
        break;
      default:
        break;
    }
    const timeText = `${dateText} ${weekText}`;
    return timeText;
  }
}
});
