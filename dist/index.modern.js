import { memo, useState, useRef, useEffect, createElement } from 'react';

var styles = {"darkbox":"_3curk","fadeIn":"_3uImN","lightbox":"_3cxVN","zoomIn":"_J_W1U","header":"_1aDvk","title":"_2KezC","nav":"_oZdUT","selector":"_yof3Q","prevNext":"_3gTMH","navButton":"_2s7Q2","monthName":"_NWZcI","year":"_38Og6","days":"_3KAu7","calendar":"_1yUS2","date":"_1hglr","outside":"_2La4E","inside":"_1sbNu","footer":"_24OKz","zoomOut":"_31Z79","fadeOut":"_3y6_k"};

var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var OLD_YEAR = 1970;
var MAX_YEAR = new Date().getFullYear() + 3;

var DatePicker = function DatePicker(_ref) {
  var showCalendar = _ref.isOpen,
      onClose = _ref.onClose,
      title = _ref.title,
      dayNames = _ref.dayNames,
      headerFormat = _ref.headerFormat,
      _ref$showTitle = _ref.showTitle,
      showTitle = _ref$showTitle === void 0 ? true : _ref$showTitle,
      monthNames = _ref.monthNames,
      defaultValue = _ref.defaultValue,
      _ref$minDate = _ref.minDate,
      minDate = _ref$minDate === void 0 ? new Date(OLD_YEAR, 0, 1) : _ref$minDate,
      _ref$maxDate = _ref.maxDate,
      maxDate = _ref$maxDate === void 0 ? new Date(MAX_YEAR, 11, 31) : _ref$maxDate,
      _ref$colorScheme = _ref.colorScheme,
      colorScheme = _ref$colorScheme === void 0 ? '#4527A0' : _ref$colorScheme,
      _ref$headerTextColor = _ref.headerTextColor,
      headerTextColor = _ref$headerTextColor === void 0 ? '#fff' : _ref$headerTextColor,
      _ref$closeText = _ref.closeText,
      closeText = _ref$closeText === void 0 ? 'Close' : _ref$closeText,
      _ref$clearText = _ref.clearText,
      clearText = _ref$clearText === void 0 ? 'Clear' : _ref$clearText,
      onChange = _ref.onChange;

  var _React$useState = useState(showCalendar),
      isOpen = _React$useState[0],
      setIsOpen = _React$useState[1];

  var _React$useState2 = useState([]),
      calendar = _React$useState2[0],
      setCalendar = _React$useState2[1];

  var _React$useState3 = useState((dayNames === null || dayNames === void 0 ? void 0 : dayNames.length) === 7 ? dayNames : DAY_NAMES),
      days = _React$useState3[0];

  var _React$useState4 = useState((monthNames === null || monthNames === void 0 ? void 0 : monthNames.length) === 12 ? monthNames : MONTH_NAMES),
      months = _React$useState4[0];

  var _React$useState5 = useState(0),
      month = _React$useState5[0],
      setMonth = _React$useState5[1];

  var _React$useState6 = useState(2022),
      year = _React$useState6[0],
      setYear = _React$useState6[1];

  var _React$useState7 = useState(defaultValue || null),
      selectedDate = _React$useState7[0],
      setSelectedDate = _React$useState7[1];

  var dbRef = useRef(null);
  var lbRef = useRef(null);

  var changeMonth = function changeMonth(inc) {
    var curMonth = month + inc;
    var curYear = year;

    if (curMonth === 12) {
      curMonth = 0;
      curYear++;
    } else if (curMonth === -1) {
      curMonth = 11;
      curYear--;
    }

    setMonth(curMonth);
    setYear(curYear);
  };

  var selectDate = function selectDate(day) {
    setMonth(day.getMonth());
    setYear(day.getFullYear());
    setSelectedDate(day);
    onChange && onChange(day);
  };

  var getHeader = function getHeader() {
    var backup = new Date();
    var dayName = days[(selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getDay()) || backup.getDay()];
    var dateNum = selectedDate ? selectedDate.getDate() : backup.getDate();
    var date = dateNum < 10 ? "0" + dateNum : dateNum.toString();
    var monthName = months[(selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getMonth()) || backup.getMonth()];
    var monthNum = (selectedDate ? selectedDate.getMonth() : backup.getMonth()) + 1;
    var monthWithZero = monthNum < 10 ? "0" + monthNum : monthNum.toString();
    var result = headerFormat || 'DD, MM dd';
    result = result.replaceAll('D', '_D');
    result = result.replaceAll('M', '_M');
    result = result.replaceAll('d', '_d');
    result = result.replaceAll('m', '_m');
    result = result.replaceAll('_D_D', dayName);
    result = result.replaceAll('_D', dayName.substring(0, 3));
    result = result.replaceAll('_M_M', monthName);
    result = result.replaceAll('_M', monthName.substring(0, 3));
    result = result.replaceAll('_m_m', monthWithZero);
    result = result.replaceAll('_m', monthNum.toString());
    result = result.replaceAll('_d_d', date);
    result = result.replaceAll('_d', date.replace(/^0/, ''));
    return result;
  };

  var handleClear = function handleClear() {
    setSelectedDate(null);
    onChange && onChange(null);
  };

  var handleClose = function handleClose() {
    var _dbRef$current, _lbRef$current;

    (_dbRef$current = dbRef.current) === null || _dbRef$current === void 0 ? void 0 : _dbRef$current.classList.add(styles.fadeOut);
    (_lbRef$current = lbRef.current) === null || _lbRef$current === void 0 ? void 0 : _lbRef$current.classList.add(styles.zoomOut);
    setTimeout(function () {
      var _dbRef$current2, _lbRef$current2;

      setIsOpen(false);
      onClose && onClose();
      (_dbRef$current2 = dbRef.current) === null || _dbRef$current2 === void 0 ? void 0 : _dbRef$current2.classList.remove(styles.fadeOut);
      (_lbRef$current2 = lbRef.current) === null || _lbRef$current2 === void 0 ? void 0 : _lbRef$current2.classList.remove(styles.zoomOut);
    }, 300);
  };

  useEffect(function () {
    var firstDayThisMonth = new Date(year, month, 1).getDay();
    var temp = [];

    for (var i = 0; i < 42; i++) {
      var date = new Date(year, month, i - firstDayThisMonth + 1);
      temp.push(date);
    }

    setCalendar(temp);
  }, [month, year]);
  useEffect(function () {
    if (defaultValue) {
      if (defaultValue.getTime() < minDate.getTime()) {
        setMonth(minDate.getMonth());
        setSelectedDate(minDate);
      } else {
        setMonth(defaultValue.getMonth());
      }
    }
  }, []);
  useEffect(function () {
    setIsOpen(showCalendar);
  }, [showCalendar]);

  if (!isOpen) {
    return null;
  }

  return createElement("div", {
    className: styles.darkbox,
    ref: dbRef
  }, createElement("div", {
    className: styles.lightbox,
    ref: lbRef
  }, createElement("div", {
    className: styles.header,
    style: {
      backgroundColor: colorScheme,
      color: headerTextColor
    }
  }, showTitle && createElement("h4", {
    className: styles.title
  }, title || 'Select Date'), createElement("span", {
    className: styles.monthName
  }, getHeader()), createElement("br", null), createElement("span", {
    className: styles.year
  }, selectedDate ? selectedDate.getFullYear() : year)), createElement("div", {
    className: styles.nav
  }, createElement("div", {
    className: styles.selector
  }, createElement("select", {
    onChange: function onChange(e) {
      return setMonth(parseInt(e.target.value));
    },
    value: month
  }, months.map(function (monthName, index) {
    return createElement("option", {
      key: index,
      value: index
    }, monthName);
  })), createElement("select", {
    onChange: function onChange(e) {
      return setYear(parseInt(e.target.value));
    },
    value: year
  }, Array(maxDate.getFullYear() - minDate.getFullYear() + 1).fill(0).map(function (_, index) {
    return createElement("option", {
      key: index,
      value: maxDate.getFullYear() - index
    }, maxDate.getFullYear() - index);
  }))), createElement("div", {
    className: styles.prevNext
  }, createElement("button", {
    disabled: minDate.getFullYear() === year && minDate.getMonth() === month,
    className: styles.navButton,
    onClick: function onClick() {
      return changeMonth(-1);
    }
  }, createElement("svg", {
    width: 24,
    height: 24,
    xmlns: 'http://www.w3.org/2000/svg',
    className: 'h-6 w-6',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: '#888',
    strokeWidth: 2
  }, createElement("path", {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    d: 'M15 19l-7-7 7-7'
  }))), createElement("button", {
    disabled: maxDate.getFullYear() === year && maxDate.getMonth() === month,
    className: styles.navButton,
    onClick: function onClick() {
      return changeMonth(+1);
    }
  }, createElement("svg", {
    width: 24,
    height: 24,
    xmlns: 'http://www.w3.org/2000/svg',
    className: 'h-6 w-6',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: '#888',
    strokeWidth: 2
  }, createElement("path", {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    d: 'M9 5l7 7-7 7'
  }))))), createElement("div", {
    className: styles.body
  }, createElement("div", {
    className: styles.days
  }, days.map(function (day) {
    return createElement("div", {
      className: styles.day,
      key: day
    }, day.substring(0, 3));
  })), createElement("div", {
    className: styles.calendar
  }, calendar.map(function (day, index) {
    return createElement("div", {
      className: [styles.date, day.getMonth() === month ? styles.inside : styles.outside].join(' '),
      key: index
    }, createElement("button", {
      style: {
        backgroundColor: (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getTime()) === day.getTime() ? colorScheme : '#fff',
        color: (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getTime()) === day.getTime() ? '#fff' : '#000'
      },
      onClick: function onClick() {
        return selectDate(day);
      },
      disabled: day.getTime() < minDate.getTime() || day.getTime() > maxDate.getTime()
    }, day.getDate()));
  }))), createElement("div", {
    className: styles.footer
  }, createElement("button", {
    disabled: !selectedDate,
    onClick: handleClear,
    style: {
      color: colorScheme
    }
  }, clearText), createElement("button", {
    style: {
      color: colorScheme
    },
    onClick: handleClose
  }, closeText))));
};

var DatePicker$1 = memo(DatePicker);

export { DatePicker$1 as DatePicker };
//# sourceMappingURL=index.modern.js.map
