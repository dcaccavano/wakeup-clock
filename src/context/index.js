import React from 'react';
import moment from 'moment';
import useLocalStorage from '../utils/use-local-storage';

export const ClockContext = React.createContext();

export function ClockProvider(props) {

  const format = 'h:mm a';

  const nowToNum = () => moment().diff(moment().startOf('day'), 'minutes') / 15;

  const numToTime = minutes => moment().startOf('day').add(minutes * 15, 'm').format(format);

  const [dayStart, setDayStart] = useLocalStorage('dayStart', 36);
  const [wakeupStart, setwakeupStart] = useLocalStorage('wakeupStart', 28);
  const [nightStart, setNightStart] = useLocalStorage('nightStart', 80);

  const [dayColor, setDayColor] = useLocalStorage('dayColor', '#fff9c4');
  const [wakeupColor, setWakeupColor] = useLocalStorage('wakeupColor', '#81c784');
  const [nightColor, setNightColor] = useLocalStorage('nightColor', '#455a64');

  const [now, setNow] = React.useState(nowToNum());
  const [backgroundColor, setBackgroundColor] = React.useState('#ffffff');

  const data = {
    wakeupSettings: [wakeupStart, setwakeupStart, wakeupColor, setWakeupColor],
    daySettings: [dayStart, setDayStart, dayColor, setDayColor],
    nightSettings: [nightStart, setNightStart, nightColor, setNightColor],
    nowSettings: [now, setNow, nowToNum, numToTime],
    backgroundSettings: [backgroundColor, setBackgroundColor],
    format: format,
  }

  return (
    <ClockContext.Provider value={ [data.wakeupSettings, data.daySettings, data.nightSettings, data.nowSettings, data.backgroundSettings, data.format] }>
      {props.children}
    </ClockContext.Provider>
  )
}
