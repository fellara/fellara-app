import React from 'react';
import { Datepicker, Icon } from '@ui-kitten/components';
import dayjs from 'dayjs';

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

export const CustomCalendar = (props) => {
  const [date, setDate] = React.useState(new Date());

  const handleSelect = (nextDate) => {
    const formatted = dayjs().format('YYYY-MM-DD')
    console.log(formatted);
    
    setDate(nextDate)

    if (props.onChange) props.onChange(formatted)
  }

  return (
    <Datepicker
      date={date}
      onSelect={handleSelect}
      accessoryRight={CalendarIcon}
    />
  );
};

export default CustomCalendar