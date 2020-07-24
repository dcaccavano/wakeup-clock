import React from 'react';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const WakeupTimePicker = ({ type, getter, setter }) => {

  const format = 'h:mm a'

  return (
    <TimePicker
      allowClear={false}
      value={moment(getter)}
      format={format}
      onChange={setter}
      minuteStep={5}
      use12Hour
    />
  );
}

export default WakeupTimePicker;
