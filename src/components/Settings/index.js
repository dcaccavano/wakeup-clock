import React from 'react';
import useLocalStorage from '../../utils/use-local-storage';
import { TimePicker } from 'antd';
import ColorPicker from './ColorPicker';
import 'antd/dist/antd.css';
import moment from 'moment';

const Settings = () => {
  const format = 'h:mm a'

  const { RangePicker } = TimePicker;
  const [dayStart, setDayStart] = useLocalStorage('dayStart', moment());
  const [dayEnd, setDayEnd] = useLocalStorage('dayEnd', moment());

  const setTimes = times => {
    times[0] && setDayStart(times[0]);
    times[1] && setDayEnd(times[1]);
  }

  return (
    <div>
      <RangePicker
        allowClear={false}
        value={[moment(dayStart), moment(dayEnd)]}
        onChange={setTimes}
        use12Hours
        minuteStep={5}
        format={format}
      />
      <ColorPicker type={'day'} />
      <ColorPicker type={'wakeup'} />
      <ColorPicker type={'night'} />
    </div>
  );
}

export default Settings;
