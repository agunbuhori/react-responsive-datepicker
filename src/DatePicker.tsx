/* eslint-disable no-unused-expressions */
import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  title?: string
  dayNames?: string[]
  monthNames?: string[]
  showTitle?: boolean
  defaultValue?: Date
  minDate?: Date
  maxDate?: Date
  headerFormat?: string
  headerTextColor?: string
  colorScheme?: string
  isOpen?: boolean
  closeText?: string
  clearText?: string
  onClose?: () => void
  onChange?: (date: Date | null) => void
  showFooter?: boolean
  showHeader?: boolean
  clickOutsideToClose?: () => void
}

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const OLD_YEAR = 1970
const MAX_YEAR = new Date().getFullYear() + 3

const DatePicker = ({
  isOpen: showCalendar,
  onClose,
  title,
  dayNames,
  headerFormat,
  showTitle = true,
  monthNames,
  defaultValue,
  minDate = new Date(OLD_YEAR, 0, 1),
  maxDate = new Date(MAX_YEAR, 11, 31),
  colorScheme = '#4527A0',
  headerTextColor = '#fff',
  closeText = 'Close',
  clearText = 'Clear',
  onChange,
  showFooter = true,
  showHeader = true,
  clickOutsideToClose
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(showCalendar)
  const [calendar, setCalendar] = React.useState<Date[]>([])
  const [days] = React.useState<string[]>(
    dayNames?.length === 7 ? dayNames : DAY_NAMES
  )
  const [months] = React.useState<string[]>(
    monthNames?.length === 12 ? monthNames : MONTH_NAMES
  )
  const [month, setMonth] = React.useState<number>(0)
  const [year, setYear] = React.useState<number>(2022)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    defaultValue || null
  )
  const dbRef = React.useRef<HTMLDivElement>(null)
  const lbRef = React.useRef<HTMLDivElement>(null)
  const changeMonth = (inc: number) => {
    let curMonth = month + inc
    let curYear = year

    if (curMonth === 12) {
      curMonth = 0
      curYear++
    } else if (curMonth === -1) {
      curMonth = 11
      curYear--
    }

    setMonth(curMonth)
    setYear(curYear)
  }

  const selectDate = (day: Date) => {
    setMonth(day.getMonth())
    setYear(day.getFullYear())
    // setDate(day.getDate())
    setSelectedDate(day)

    onChange && onChange(day)
  }

  const getHeader = () => {
    const backup = new Date()
    const dayName = days[selectedDate?.getDay() || backup.getDay()]
    const dateNum = selectedDate ? selectedDate.getDate() : backup.getDate()
    const date = dateNum < 10 ? `0${dateNum}` : dateNum.toString()
    const monthName = months[selectedDate?.getMonth() || backup.getMonth()]
    const monthNum =
      (selectedDate ? selectedDate.getMonth() : backup.getMonth()) + 1
    const monthWithZero = monthNum < 10 ? `0${monthNum}` : monthNum.toString()
    let result = headerFormat || 'DD, MM dd'

    result = result.replaceAll('D', '_D')
    result = result.replaceAll('M', '_M')
    result = result.replaceAll('d', '_d')
    result = result.replaceAll('m', '_m')

    result = result.replaceAll('_D_D', dayName)
    result = result.replaceAll('_D', dayName.substring(0, 3))
    result = result.replaceAll('_M_M', monthName)
    result = result.replaceAll('_M', monthName.substring(0, 3))
    result = result.replaceAll('_m_m', monthWithZero)
    result = result.replaceAll('_m', monthNum.toString())
    result = result.replaceAll('_d_d', date)
    result = result.replaceAll('_d', date.replace(/^0/, ''))

    return result
  }

  const handleClear = () => {
    setSelectedDate(null)
    onChange && onChange(null)
  }

  const handleClose = () => {
    // setIsOpen(false)
    dbRef.current?.classList.add(styles.fadeOut)
    lbRef.current?.classList.add(styles.zoomOut)

    setTimeout(() => {
      setIsOpen(false)
      onClose && onClose()
      dbRef.current?.classList.remove(styles.fadeOut)
      lbRef.current?.classList.remove(styles.zoomOut)
    }, 300)
  }

  React.useEffect(() => {
    const firstDayThisMonth = new Date(year, month, 1).getDay()
    const temp = []

    for (let i = 0; i < 42; i++) {
      const date = new Date(year, month, i - firstDayThisMonth + 1)
      temp.push(date)
    }

    setCalendar(temp)
  }, [month, year])

  React.useEffect(() => {
    document.addEventListener('click', (event: MouseEvent) => {
      if (
        dbRef.current?.contains(event.target as Node) &&
        !lbRef.current?.contains(event.target as Node)
      ) {
        event.stopPropagation()
        handleClose()
        clickOutsideToClose && clickOutsideToClose()
      }
    })
  }, [])

  React.useEffect(() => {
    if (defaultValue) {
      if (defaultValue.getTime() < minDate.getTime()) {
        setMonth(minDate.getMonth())
        setSelectedDate(minDate)
      } else {
        setMonth(defaultValue.getMonth())
      }
    }
  }, [])

  React.useEffect(() => {
    setIsOpen(showCalendar)
  }, [showCalendar])

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.darkbox} ref={dbRef}>
      <div className={styles.lightbox} ref={lbRef}>
        {showHeader && (
          <div
            className={styles.header}
            style={{
              backgroundColor: colorScheme,
              color: headerTextColor
            }}
          >
            {showTitle && (
              <h4 className={styles.title}>{title || 'Select Date'}</h4>
            )}
            <span className={styles.monthName}>{getHeader()}</span>
            <br />
            <span className={styles.year}>
              {selectedDate ? selectedDate.getFullYear() : year}
            </span>
          </div>
        )}

        <div className={styles.nav}>
          <div className={styles.selector}>
            <select
              onChange={(e) => setMonth(parseInt(e.target.value))}
              value={month}
            >
              {months.map((monthName, index) => (
                <option key={index} value={index}>
                  {monthName}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setYear(parseInt(e.target.value))}
              value={year}
            >
              {Array(maxDate.getFullYear() - minDate.getFullYear() + 1)
                .fill(0)
                .map((_, index) => (
                  <option key={index} value={maxDate.getFullYear() - index}>
                    {maxDate.getFullYear() - index}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.prevNext}>
            <button
              disabled={
                minDate.getFullYear() === year && minDate.getMonth() === month
              }
              className={styles.navButton}
              onClick={() => changeMonth(-1)}
            >
              <svg
                width={24}
                height={24}
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#888'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            <button
              disabled={
                maxDate.getFullYear() === year && maxDate.getMonth() === month
              }
              className={styles.navButton}
              onClick={() => changeMonth(+1)}
            >
              <svg
                width={24}
                height={24}
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#888'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.days}>
            {days.map((day) => (
              <div className={styles.day} key={day}>
                {day.substring(0, 3)}
              </div>
            ))}
          </div>
          <div className={styles.calendar}>
            {calendar.map((day, index) => (
              <div
                className={[
                  styles.date,
                  day.getMonth() === month ? styles.inside : styles.outside
                ].join(' ')}
                key={index}
              >
                <button
                  style={{
                    backgroundColor:
                      selectedDate?.getTime() === day.getTime()
                        ? colorScheme
                        : '#fff',
                    color:
                      selectedDate?.getTime() === day.getTime()
                        ? '#fff'
                        : '#000'
                  }}
                  onClick={() => selectDate(day)}
                  disabled={
                    day.getTime() < minDate.getTime() ||
                    day.getTime() > maxDate.getTime()
                  }
                >
                  {day.getDate()}
                </button>
              </div>
            ))}
          </div>
        </div>

        {showFooter && (
          <div className={styles.footer}>
            <button
              disabled={!selectedDate}
              onClick={handleClear}
              style={{ color: colorScheme }}
            >
              {clearText}
            </button>
            <button style={{ color: colorScheme }} onClick={handleClose}>
              {closeText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default React.memo(DatePicker)
