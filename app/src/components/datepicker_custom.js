import  { forwardRef, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const Select = forwardRef((props, ref) => (
  <button className="flex flex-grow py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={props.onClick} ref={ref}>
    {props.titulo}  {props.value}
  </button>
))

const DatePickerButton = ({ titulo, value, onChangeAct, campo, conFecha }) => {
  const inputRef = useRef(null);
  return <>
    <DatePicker
      onChange={(d) => onChangeAct(campo, moment(d).format('YYYY-MM-DD'))}
      className="flex flex-grow"
      selected={moment(value).toDate()}
      showTimeInput={conFecha}
      dateFormat="dd/MM/yy" customInput={<Select titulo={titulo} ref={inputRef} />} />
  </>
}


export default DatePickerButton