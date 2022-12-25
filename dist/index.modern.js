import { memo, useState, useRef, useEffect, createElement } from 'react';

var styles = {"darkbox":"_styles-module__darkbox__3curk","fadeIn":"_styles-module__fadeIn__3uImN","lightbox":"_styles-module__lightbox__3cxVN","zoomIn":"_styles-module__zoomIn__J_W1U","header":"_styles-module__header__1aDvk","title":"_styles-module__title__2KezC","nav":"_styles-module__nav__oZdUT","selector":"_styles-module__selector__yof3Q","prevNext":"_styles-module__prevNext__3gTMH","navButton":"_styles-module__navButton__2s7Q2","monthName":"_styles-module__monthName__NWZcI","year":"_styles-module__year__38Og6","days":"_styles-module__days__3KAu7","calendar":"_styles-module__calendar__1yUS2","date":"_styles-module__date__1hglr","outside":"_styles-module__outside__2La4E","inside":"_styles-module__inside__1sbNu","footer":"_styles-module__footer__24OKz","zoomOut":"_styles-module__zoomOut__31Z79","fadeOut":"_styles-module__fadeOut__3y6_k"};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const OLD_YEAR = 1970;
const MAX_YEAR = new Date().getFullYear() + 3;

const DatePicker = ({
  isOpen: showCalendar,
  onClose,
  title,
  dayNames,
  headerFormat,
  showTitle: _showTitle = true,
  monthNames,
  defaultValue,
  minDate: _minDate = new Date(OLD_YEAR, 0, 1),
  maxDate: _maxDate = new Date(MAX_YEAR, 11, 31),
  colorScheme: _colorScheme = '#4527A0',
  headerTextColor: _headerTextColor = '#fff',
  closeText: _closeText = 'Close',
  clearText: _clearText = 'Clear',
  onChange,
  showFooter: _showFooter = true,
  showHeader: _showHeader = true
}) => {
  const [isOpen, setIsOpen] = useState(showCalendar);
  const [calendar, setCalendar] = useState([]);
  const [days] = useState((dayNames === null || dayNames === void 0 ? void 0 : dayNames.length) === 7 ? dayNames : DAY_NAMES);
  const [months] = useState((monthNames === null || monthNames === void 0 ? void 0 : monthNames.length) === 12 ? monthNames : MONTH_NAMES);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2022);
  const [selectedDate, setSelectedDate] = useState(defaultValue || null);
  const dbRef = useRef(null);
  const lbRef = useRef(null);

  const changeMonth = inc => {
    let curMonth = month + inc;
    let curYear = year;

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

  const selectDate = day => {
    setMonth(day.getMonth());
    setYear(day.getFullYear());
    setSelectedDate(day);
    onChange && onChange(day);
  };

  const getHeader = () => {
    const backup = new Date();
    const dayName = days[(selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getDay()) || backup.getDay()];
    const dateNum = selectedDate ? selectedDate.getDate() : backup.getDate();
    const date = dateNum < 10 ? `0${dateNum}` : dateNum.toString();
    const monthName = months[(selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getMonth()) || backup.getMonth()];
    const monthNum = (selectedDate ? selectedDate.getMonth() : backup.getMonth()) + 1;
    const monthWithZero = monthNum < 10 ? `0${monthNum}` : monthNum.toString();
    let result = headerFormat || 'DD, MM dd';
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

  const handleClear = () => {
    setSelectedDate(null);
    onChange && onChange(null);
  };

  const handleClose = () => {
    var _dbRef$current, _lbRef$current;

    (_dbRef$current = dbRef.current) === null || _dbRef$current === void 0 ? void 0 : _dbRef$current.classList.add(styles.fadeOut);
    (_lbRef$current = lbRef.current) === null || _lbRef$current === void 0 ? void 0 : _lbRef$current.classList.add(styles.zoomOut);
    setTimeout(() => {
      var _dbRef$current2, _lbRef$current2;

      setIsOpen(false);
      onClose && onClose();
      (_dbRef$current2 = dbRef.current) === null || _dbRef$current2 === void 0 ? void 0 : _dbRef$current2.classList.remove(styles.fadeOut);
      (_lbRef$current2 = lbRef.current) === null || _lbRef$current2 === void 0 ? void 0 : _lbRef$current2.classList.remove(styles.zoomOut);
    }, 300);
  };

  useEffect(() => {
    const firstDayThisMonth = new Date(year, month, 1).getDay();
    const temp = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(year, month, i - firstDayThisMonth + 1);
      temp.push(date);
    }

    setCalendar(temp);
  }, [month, year]);
  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.getTime() < _minDate.getTime()) {
        setMonth(_minDate.getMonth());
        setSelectedDate(_minDate);
      } else {
        setMonth(defaultValue.getMonth());
      }
    }
  }, []);
  useEffect(() => {
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
  }, _showHeader && createElement("div", {
    className: styles.header,
    style: {
      backgroundColor: _colorScheme,
      color: _headerTextColor
    }
  }, _showTitle && createElement("h4", {
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
    onChange: e => setMonth(parseInt(e.target.value)),
    value: month
  }, months.map((monthName, index) => createElement("option", {
    key: index,
    value: index
  }, monthName))), createElement("select", {
    onChange: e => setYear(parseInt(e.target.value)),
    value: year
  }, Array(_maxDate.getFullYear() - _minDate.getFullYear() + 1).fill(0).map((_, index) => createElement("option", {
    key: index,
    value: _maxDate.getFullYear() - index
  }, _maxDate.getFullYear() - index)))), createElement("div", {
    className: styles.prevNext
  }, createElement("button", {
    disabled: _minDate.getFullYear() === year && _minDate.getMonth() === month,
    className: styles.navButton,
    onClick: () => changeMonth(-1)
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
    disabled: _maxDate.getFullYear() === year && _maxDate.getMonth() === month,
    className: styles.navButton,
    onClick: () => changeMonth(+1)
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
  }, days.map(day => createElement("div", {
    className: styles.day,
    key: day
  }, day.substring(0, 3)))), createElement("div", {
    className: styles.calendar
  }, calendar.map((day, index) => createElement("div", {
    className: [styles.date, day.getMonth() === month ? styles.inside : styles.outside].join(' '),
    key: index
  }, createElement("button", {
    style: {
      backgroundColor: (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getTime()) === day.getTime() ? _colorScheme : '#fff',
      color: (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getTime()) === day.getTime() ? '#fff' : '#000'
    },
    onClick: () => selectDate(day),
    disabled: day.getTime() < _minDate.getTime() || day.getTime() > _maxDate.getTime()
  }, day.getDate()))))), _showFooter && createElement("div", {
    className: styles.footer
  }, createElement("button", {
    disabled: !selectedDate,
    onClick: handleClear,
    style: {
      color: _colorScheme
    }
  }, _clearText), createElement("button", {
    style: {
      color: _colorScheme
    },
    onClick: handleClose
  }, _closeText))));
};

var DatePicker$1 = memo(DatePicker);

export { DatePicker$1 as DatePicker };
//# sourceMappingURL=index.modern.js.map
