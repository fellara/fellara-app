import React from 'react';
import { Datepicker, Icon } from '@ui-kitten/components';
import dayjs from 'dayjs';

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

export const CustomCalendar = (props) => {
  const [date, setDate] = React.useState(new Date());

  const now = new Date();
  const min = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());
  
  const handleSelect = (nextDate) => {
    const formatted = dayjs(nextDate).format('YYYY-MM-DD')
    
    setDate(nextDate)
    if (props.onChange) props.onChange(formatted)
  }
  return (
    <Datepicker
      date={date}
      min={min}
      // max={now}
      onSelect={handleSelect}
      accessoryRight={CalendarIcon}
    />
  );
};

export default CustomCalendar