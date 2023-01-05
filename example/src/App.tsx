import React from 'react'

import { DatePicker } from 'react-responsive-datepicker'
import 'react-responsive-datepicker/dist/index.css'

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open
      </button>
      <DatePicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultValue={new Date(2022, 8, 8)}
        minDate={new Date(2022, 10, 10)}
        maxDate={new Date(2023, 0, 10)}
        headerFormat='DD, MM dd'
        clickOutsideToClose={handleClose}
      />
    </div>
  )
}

export default App
