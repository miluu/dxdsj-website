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

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	/*global $*/
	alert();
	$(function () {
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
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDQ4ODA5NjA5NzNkMDhlYTU4YWY/MDM3MyoqIiwid2VicGFjazovLy8uL2ZkLXNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQSxHQUFFLFlBQVc7QUFDWCxPQUFNLFlBQVksRUFBRSxhQUFGLENBQWxCO0FBQ0EsYUFBVSxJQUFWLENBQWUsVUFBUyxLQUFULEVBQWdCLEVBQWhCLEVBQW9CO0FBQ2pDLFNBQU0sTUFBTSxFQUFFLEVBQUYsQ0FBWjtBQUNBLFNBQU0sU0FBUyxJQUFJLElBQUosQ0FBUyxXQUFULENBQWY7QUFDQSxTQUFNLFNBQVMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLE1BQTNCLENBQWY7QUFDQSxTQUFJLEtBQUssT0FBTyxJQUFQLENBQVksU0FBWixDQUFUO0FBQ0EsU0FBSSxLQUFLLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBVDtBQUNBLFNBQUksQ0FBQyxFQUFMLEVBQVM7QUFDUCwwQkFBaUIsTUFBakI7QUFDQSxjQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLEVBQWxCO0FBQ0Q7QUFDRCxTQUFJLElBQUosQ0FBUyxLQUFULEVBQWdCLEVBQWhCLEVBQ0csUUFESCxDQUNZLEtBQUssSUFBTCxHQUFZLEtBRHhCO0FBRUEsWUFBTyxNQUFQLENBQWMsWUFBVztBQUN2QixZQUFLLE9BQU8sSUFBUCxDQUFZLFNBQVosQ0FBTDtBQUNBLFdBQUksV0FBSixDQUFnQixRQUFoQixFQUEwQixRQUExQixDQUFtQyxLQUFLLElBQUwsR0FBWSxLQUEvQztBQUNELE1BSEQ7QUFJRCxJQWhCRDtBQWlCRCxFQW5CRCxFIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwNDg4MDk2MDk3M2QwOGVhNThhZlxuICoqLyIsIi8qZ2xvYmFsICQqL1xuYWxlcnQoKTtcbiQoZnVuY3Rpb24oKSB7XG4gIGNvbnN0ICRjaGVja2JveCA9ICQoJy5qLWNoZWNrYm94Jyk7XG4gICRjaGVja2JveC5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xuICAgIGNvbnN0ICRpbnB1dCA9ICRlbC5maW5kKCc6Y2hlY2tib3gnKTtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApO1xuICAgIGxldCBvbiA9ICRpbnB1dC5wcm9wKCdjaGVja2VkJyk7XG4gICAgbGV0IGlkID0gJGlucHV0LmF0dHIoJ2lkJyk7XG4gICAgaWYgKCFpZCkge1xuICAgICAgaWQgPSBgY2hlY2tib3gtJHtyYW5kb219YDtcbiAgICAgICRpbnB1dC5hdHRyKCdpZCcsIGlkKTtcbiAgICB9XG4gICAgJGVsLmF0dHIoJ2ZvcicsIGlkKVxuICAgICAgLmFkZENsYXNzKG9uID8gJ29uJyA6ICdvZmYnKTtcbiAgICAkaW5wdXQuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgb24gPSAkaW5wdXQucHJvcCgnY2hlY2tlZCcpO1xuICAgICAgJGVsLnJlbW92ZUNsYXNzKCdvbiBvZmYnKS5hZGRDbGFzcyhvbiA/ICdvbicgOiAnb2ZmJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2ZkLXNyYy9qcy9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=