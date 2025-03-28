import React, { useState } from 'react';
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
    <div style={{ 
      maxWidth: '300px', 
      fontSize: '0.8rem',
      transform: 'scale(0.7)',
      transformOrigin: 'top left'
    }}>
      <DateRange
        ranges={state}
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        direction="horizontal"
        className="small-date-range"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default DatePicker;