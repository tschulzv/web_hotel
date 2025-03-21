import React, { useState, Component } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';  
import 'react-date-range/dist/theme/default.css';  

const DatePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  return (
    <DateRange
      ranges={state}
      onChange={(item) => setState([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={1}
      direction="horizontal"
    />
  );
};

export default DatePicker;