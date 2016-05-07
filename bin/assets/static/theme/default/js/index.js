/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mainListItem = __webpack_require__(4);
	
	var _mainListItem2 = _interopRequireDefault(_mainListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(function () {
	  {
	    var $checkbox = $('.j-checkbox');
	    $checkbox.each(function (index, el) {
	      var $el = $(el);
	      var $input = $el.find(':checkbox');
	      var random = Math.floor(Math.random() * 100000);
	      var on = $input.prop('checked');
	      var id = $input.attr('id');
	      if (!id) {
	        id = 'checkbox-' + random;
	        $input.attr('id', id);
	      }
	      $el.attr('for', id).addClass(on ? 'on' : 'off');
	      $input.change(function () {
	        on = $input.prop('checked');
	        $el.removeClass('on off').addClass(on ? 'on' : 'off');
	      });
	    });
	  }
	
	  {
	    var $time = $('.j-unixtime');
	    $time.each(function (index, el) {
	      var $el = $(el);
	      var unix = +$el.data('unix');
	      var t = moment.unix(unix);
	      var format1 = t.format('HH:mm');
	      var format2 = t.format('YYYY-MM-DD HH:mm:ss');
	      $el.text(format1);
	      $el.attr('title', format2);
	    });
	  }
	
	  {
	    (function () {
	      var renderList = function renderList(data) {
	        var realtime = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	        // eslint-disable-line
	        var html = '';
	        _.forEach(data, function (item) {
	          html += itemTpl(item);
	        });
	        if (!realtime) {
	          $list.append(html);
	        } else {
	          $list.prepend(html);
	        }
	      };
	
	      var $more = $('.j-main-list-more');
	      var $list = $('.j-main-list');
	      var itemTpl = _.template(_mainListItem2.default);
	      var isAjaxing = false;
	      setInterval(function () {
	        var createdAt = $list.find('.item').first().data('created-at');
	        var apiUrl = '/api-livenews?createdAt=' + createdAt + '&sort=1';
	        $.ajax({
	          url: apiUrl,
	          dataType: 'json'
	        }).done(function (data) {
	          if (data.status === 1) {
	            renderList(data.list, true);
	          }
	        });
	      }, 1000 * 60);
	      $more.click(function (e) {
	        if (isAjaxing) {
	          return;
	        }
	        e.preventDefault();
	        var createdAt = $list.find('.item').last().data('created-at');
	        var apiUrl = '/api-livenews?createdAt=' + createdAt;
	        isAjaxing = true;
	        $.ajax({
	          url: apiUrl,
	          dataType: 'json'
	        }).done(function (data) {
	          if (data.status === 1) {
	            renderList(data.list);
	          } else {
	            alert('数据加载失败.');
	          }
	        }).fail(function () {
	          alert('数据加载失败.');
	        }).always(function () {
	          isAjaxing = false;
	        });
	      });
	    })();
	  }
	
	  {
	    (function () {
	      var getMomentText = function getMomentText() {
	        // eslint-disable-line
	        var now = moment();
	        var dateText = now.format('YYYY-MM-DD HH:mm:ss');
	        var weekText = '星期';
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
	        var timeText = dateText + ' ' + weekText;
	        return timeText;
	      };
	
	      var $clock = $('.j-clocktime');
	      $clock.text(getMomentText());
	      setInterval(function () {
	        $clock.text(getMomentText());
	      }, 100);
	    })();
	  }
	}); /*global $, _, moment*/

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=\"item <% if (importance > 1) { %>imp<% } %>\" <% if (importance === 3) { %>style=\"font-weight: bold;\"<% } %>\r\n  data-created-at=\"<%= createdAt %>\"\r\n>\r\n  <div class=\"col-icon\">\r\n    <a href=\"/livenews-detail?id=<%= _id %>\" title=\"查看详情\" target=\"_blank\">\r\n      <span class=\"icon icon-news<% if (importance > 1) { %>-red<% } %>\"></span>\r\n    </a>\r\n  </div>\r\n  <div class=\"col-time\">\r\n    <span class=\"time j-unixtime\" data-unix=\"<%= createdAt %>\"\r\n      title=\"<%= moment.unix(createdAt).format('YYYY-MM-DD HH:mm:ss') %>\"\r\n    >\r\n      <%= moment.unix(createdAt).format('HH:mm') %>\r\n    </span>\r\n  </div>\r\n  <% if (imageUrls.length === 0) { %>\r\n  <div class=\"col-summary\">\r\n    <div class=\"summary\">\r\n      <%= contentHtml %>\r\n    </div>\r\n  </div>\r\n  <% } else { %>\r\n  <div class=\"col-img-summary\">\r\n    <div class=\"summary\">\r\n      <%= contentHtml %>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-img\">\r\n    <a href=\"/livenews-detail?id=<%= _id %>\" target=\"_blank\">\r\n      <img src=\"/static/theme/default/img/newspics/<%= imageUrls[0] %>\">\r\n    </a>\r\n  </div>\r\n  <% } %>\r\n</div>\r\n";

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGFhMGY2Y2UyOTE2YzI2ZDYzYWY/ZjRiZSoiLCJ3ZWJwYWNrOi8vLy4vZmQtc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2ZkLXNyYy9qcy9tYWluLWxpc3QtaXRlbS50cGwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDQTs7Ozs7O0FBRUEsR0FBRSxZQUFXO0FBQ2I7QUFDRSxTQUFNLFlBQVksRUFBRSxhQUFGLENBQWxCO0FBQ0EsZUFBVSxJQUFWLENBQWUsVUFBUyxLQUFULEVBQWdCLEVBQWhCLEVBQW9CO0FBQ2pDLFdBQU0sTUFBTSxFQUFFLEVBQUYsQ0FBWjtBQUNBLFdBQU0sU0FBUyxJQUFJLElBQUosQ0FBUyxXQUFULENBQWY7QUFDQSxXQUFNLFNBQVMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLE1BQTNCLENBQWY7QUFDQSxXQUFJLEtBQUssT0FBTyxJQUFQLENBQVksU0FBWixDQUFUO0FBQ0EsV0FBSSxLQUFLLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBVDtBQUNBLFdBQUksQ0FBQyxFQUFMLEVBQVM7QUFDUCw0QkFBaUIsTUFBakI7QUFDQSxnQkFBTyxJQUFQLENBQVksSUFBWixFQUFrQixFQUFsQjtBQUNEO0FBQ0QsV0FBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixFQUFoQixFQUNHLFFBREgsQ0FDWSxLQUFLLElBQUwsR0FBWSxLQUR4QjtBQUVBLGNBQU8sTUFBUCxDQUFjLFlBQVc7QUFDdkIsY0FBSyxPQUFPLElBQVAsQ0FBWSxTQUFaLENBQUw7QUFD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LHFCQUFYLENBQWpCO0FBQ0EsYUFBSSxXQUFXLElBQWY7QUFDQSxpQkFBUSxJQUFJLE1BQUosQ0FBVyxHQUFYLENBQVI7QUFDRSxnQkFBSyxHQUFMO0FBQ0UseUJBQVksR0FBWjtBQUNBO0FBQ0YsZ0JBQUssR0FBTDtBQUNFLHlCQUFZLEdBQVo7QUFDQTtBQUNGLGdCQUFLLEdBQUw7QUFDRSx5QkFBWSxHQUFaO0FBQ0E7QUFDRixnQkFBSyxHQUFMO0FBQ0UseUJBQVksR0FBWjtBQUNBO0FBQ0YsZ0JBQUssR0FBTDtBQUNFLHlCQUFZLEdBQVo7QUFDQTtBQUNGLGdCQUFLLEdBQUw7QUFDRSx5QkFBWSxHQUFaO0FBQ0E7QUFDRixnQkFBSyxHQUFMO0FBQ0UseUJBQVksR0FBWjtBQUNBO0FBQ0Y7QUFDRTtBQXZCSjtBQXlCQSxhQUFNLFdBQWMsUUFBZCxTQUEwQixRQUFoQztBQUNBLGdCQUFPLFFBQVA7QUFDRCxRQXJDSDs7QUFDRSxXQUFNLFNBQVMsRUFBRSxjQUFGLENBQWY7QUFDQSxjQUFPLElBQVAsQ0FBWSxlQUFaO0FBQ0EsbUJBQVksWUFBVztBQUNyQixnQkFBTyxJQUFQLENBQVksZUFBWjtBQUNELFFBRkQsRUFFRyxHQUZIO0FBSEY7QUFzQ0M7QUFDQSxFQWpJRCxFOzs7Ozs7QUNIQSw2REFBNEQsVUFBVSxnQ0FBZ0MsNkJBQTZCLE1BQU0sa09BQWtPLFdBQVcseVZBQXlWLG1JQUFtSSxPQUFPLCtVQUErVSxtQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNGFhMGY2Y2UyOTE2YzI2ZDYzYWZcbiAqKi8iLCIvKmdsb2JhbCAkLCBfLCBtb21lbnQqL1xuaW1wb3J0IHRwbCBmcm9tICcuL21haW4tbGlzdC1pdGVtLnRwbCc7XG5cbiQoZnVuY3Rpb24oKSB7XG57XG4gIGNvbnN0ICRjaGVja2JveCA9ICQoJy5qLWNoZWNrYm94Jyk7XG4gICRjaGVja2JveC5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xuICAgIGNvbnN0ICRpbnB1dCA9ICRlbC5maW5kKCc6Y2hlY2tib3gnKTtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApO1xuICAgIGxldCBvbiA9ICRpbnB1dC5wcm9wKCdjaGVja2VkJyk7XG4gICAgbGV0IGlkID0gJGlucHV0LmF0dHIoJ2lkJyk7XG4gICAgaWYgKCFpZCkge1xuICAgICAgaWQgPSBgY2hlY2tib3gtJHtyYW5kb219YDtcbiAgICAgICRpbnB1dC5hdHRyKCdpZCcsIGlkKTtcbiAgICB9XG4gICAgJGVsLmF0dHIoJ2ZvcicsIGlkKVxuICAgICAgLmFkZENsYXNzKG9uID8gJ29uJyA6ICdvZmYnKTtcbiAgICAkaW5wdXQuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgb24gPSAkaW5wdXQucHJvcCgnY2hlY2tlZCcpO1xuICAgICAgJGVsLnJlbW92ZUNsYXNzKCdvbiBvZmYnKS5hZGRDbGFzcyhvbiA/ICdvbicgOiAnb2ZmJyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG57XG4gIGNvbnN0ICR0aW1lID0gJCgnLmotdW5peHRpbWUnKTtcbiAgJHRpbWUuZWFjaChmdW5jdGlvbihpbmRleCwgZWwpIHtcbiAgICBjb25zdCAkZWwgPSAkKGVsKTtcbiAgICBjb25zdCB1bml4ID0gKyRlbC5kYXRhKCd1bml4Jyk7XG4gICAgY29uc3QgdCA9IG1vbWVudC51bml4KHVuaXgpO1xuICAgIGNvbnN0IGZvcm1hdDEgPSB0LmZvcm1hdCgnSEg6bW0nKTtcbiAgICBjb25zdCBmb3JtYXQyID0gdC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcbiAgICAkZWwudGV4dChmb3JtYXQxKTtcbiAgICAkZWwuYXR0cigndGl0bGUnLCBmb3JtYXQyKTtcbiAgfSk7XG59XG5cbntcbiAgY29uc3QgJG1vcmUgPSAkKCcuai1tYWluLWxpc3QtbW9yZScpO1xuICBjb25zdCAkbGlzdCA9ICQoJy5qLW1haW4tbGlzdCcpO1xuICBjb25zdCBpdGVtVHBsID0gXy50ZW1wbGF0ZSh0cGwpO1xuICBsZXQgaXNBamF4aW5nID0gZmFsc2U7XG4gIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIGxldCBjcmVhdGVkQXQgPSAkbGlzdC5maW5kKCcuaXRlbScpLmZpcnN0KCkuZGF0YSgnY3JlYXRlZC1hdCcpO1xuICAgIGxldCBhcGlVcmwgPSBgL2FwaS1saXZlbmV3cz9jcmVhdGVkQXQ9JHtjcmVhdGVkQXR9JnNvcnQ9MWA7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogYXBpVXJsLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAxKSB7XG4gICAgICAgIHJlbmRlckxpc3QoZGF0YS5saXN0LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgMTAwMCAqIDYwKTtcbiAgJG1vcmUuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGlmIChpc0FqYXhpbmcpIHtyZXR1cm47fVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY3JlYXRlZEF0ID0gJGxpc3QuZmluZCgnLml0ZW0nKS5sYXN0KCkuZGF0YSgnY3JlYXRlZC1hdCcpO1xuICAgIGxldCBhcGlVcmwgPSBgL2FwaS1saXZlbmV3cz9jcmVhdGVkQXQ9JHtjcmVhdGVkQXR9YDtcbiAgICBpc0FqYXhpbmcgPSB0cnVlO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IGFwaVVybCxcbiAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gMSkge1xuICAgICAgICByZW5kZXJMaXN0KGRhdGEubGlzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydCgn5pWw5o2u5Yqg6L295aSx6LSlLicpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICBhbGVydCgn5pWw5o2u5Yqg6L295aSx6LSlLicpO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgIGlzQWpheGluZyA9IGZhbHNlO1xuICAgIH0pO1xuICB9KTtcbiAgZnVuY3Rpb24gcmVuZGVyTGlzdChkYXRhLCByZWFsdGltZSA9IGZhbHNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBsZXQgaHRtbCA9ICcnO1xuICAgIF8uZm9yRWFjaChkYXRhLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICBodG1sICs9IGl0ZW1UcGwoaXRlbSk7XG4gICAgfSk7XG4gICAgaWYgKCFyZWFsdGltZSkge1xuICAgICAgJGxpc3QuYXBwZW5kKGh0bWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkbGlzdC5wcmVwZW5kKGh0bWwpO1xuICAgIH1cbiAgfVxufVxuXG57XG4gIGNvbnN0ICRjbG9jayA9ICQoJy5qLWNsb2NrdGltZScpO1xuICAkY2xvY2sudGV4dChnZXRNb21lbnRUZXh0KCkpO1xuICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAkY2xvY2sudGV4dChnZXRNb21lbnRUZXh0KCkpO1xuICB9LCAxMDApO1xuICBmdW5jdGlvbiBnZXRNb21lbnRUZXh0KCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XG4gICAgY29uc3QgZGF0ZVRleHQgPSBub3cuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XG4gICAgbGV0IHdlZWtUZXh0ID0gJ+aYn+acnyc7XG4gICAgc3dpdGNoIChub3cuZm9ybWF0KCdlJykpIHtcbiAgICAgIGNhc2UgJzAnOlxuICAgICAgICB3ZWVrVGV4dCArPSAn5pelJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICcxJzpcbiAgICAgICAgd2Vla1RleHQgKz0gJ+S4gCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnMic6XG4gICAgICAgIHdlZWtUZXh0ICs9ICfkuownO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJzMnOlxuICAgICAgICB3ZWVrVGV4dCArPSAn5LiJJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc0JzpcbiAgICAgICAgd2Vla1RleHQgKz0gJ+Wbmyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnNSc6XG4gICAgICAgIHdlZWtUZXh0ICs9ICfkupQnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJzYnOlxuICAgICAgICB3ZWVrVGV4dCArPSAn5YWtJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY29uc3QgdGltZVRleHQgPSBgJHtkYXRlVGV4dH0gJHt3ZWVrVGV4dH1gO1xuICAgIHJldHVybiB0aW1lVGV4dDtcbiAgfVxufVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2ZkLXNyYy9qcy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJpdGVtIDwlIGlmIChpbXBvcnRhbmNlID4gMSkgeyAlPmltcDwlIH0gJT5cXFwiIDwlIGlmIChpbXBvcnRhbmNlID09PSAzKSB7ICU+c3R5bGU9XFxcImZvbnQtd2VpZ2h0OiBib2xkO1xcXCI8JSB9ICU+XFxyXFxuICBkYXRhLWNyZWF0ZWQtYXQ9XFxcIjwlPSBjcmVhdGVkQXQgJT5cXFwiXFxyXFxuPlxcclxcbiAgPGRpdiBjbGFzcz1cXFwiY29sLWljb25cXFwiPlxcclxcbiAgICA8YSBocmVmPVxcXCIvbGl2ZW5ld3MtZGV0YWlsP2lkPTwlPSBfaWQgJT5cXFwiIHRpdGxlPVxcXCLmn6XnnIvor6bmg4VcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cXFwiaWNvbiBpY29uLW5ld3M8JSBpZiAoaW1wb3J0YW5jZSA+IDEpIHsgJT4tcmVkPCUgfSAlPlxcXCI+PC9zcGFuPlxcclxcbiAgICA8L2E+XFxyXFxuICA8L2Rpdj5cXHJcXG4gIDxkaXYgY2xhc3M9XFxcImNvbC10aW1lXFxcIj5cXHJcXG4gICAgPHNwYW4gY2xhc3M9XFxcInRpbWUgai11bml4dGltZVxcXCIgZGF0YS11bml4PVxcXCI8JT0gY3JlYXRlZEF0ICU+XFxcIlxcclxcbiAgICAgIHRpdGxlPVxcXCI8JT0gbW9tZW50LnVuaXgoY3JlYXRlZEF0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSAlPlxcXCJcXHJcXG4gICAgPlxcclxcbiAgICAgIDwlPSBtb21lbnQudW5peChjcmVhdGVkQXQpLmZvcm1hdCgnSEg6bW0nKSAlPlxcclxcbiAgICA8L3NwYW4+XFxyXFxuICA8L2Rpdj5cXHJcXG4gIDwlIGlmIChpbWFnZVVybHMubGVuZ3RoID09PSAwKSB7ICU+XFxyXFxuICA8ZGl2IGNsYXNzPVxcXCJjb2wtc3VtbWFyeVxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInN1bW1hcnlcXFwiPlxcclxcbiAgICAgIDwlPSBjb250ZW50SHRtbCAlPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvZGl2PlxcclxcbiAgPCUgfSBlbHNlIHsgJT5cXHJcXG4gIDxkaXYgY2xhc3M9XFxcImNvbC1pbWctc3VtbWFyeVxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInN1bW1hcnlcXFwiPlxcclxcbiAgICAgIDwlPSBjb250ZW50SHRtbCAlPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvZGl2PlxcclxcbiAgPGRpdiBjbGFzcz1cXFwiY29sLWltZ1xcXCI+XFxyXFxuICAgIDxhIGhyZWY9XFxcIi9saXZlbmV3cy1kZXRhaWw/aWQ9PCU9IF9pZCAlPlxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlxcclxcbiAgICAgIDxpbWcgc3JjPVxcXCIvc3RhdGljL3RoZW1lL2RlZmF1bHQvaW1nL25ld3NwaWNzLzwlPSBpbWFnZVVybHNbMF0gJT5cXFwiPlxcclxcbiAgICA8L2E+XFxyXFxuICA8L2Rpdj5cXHJcXG4gIDwlIH0gJT5cXHJcXG48L2Rpdj5cXHJcXG5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZmQtc3JjL2pzL21haW4tbGlzdC1pdGVtLnRwbFxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=