import React from 'react';
import Settings from './components/Settings';
import ClockDisplay from './components/ClockDisplay';
import moment from 'moment';
import { ClockProvider } from './context';
import './App.css';

const App = () => {

  const [showSettings, setShowSettings] = React.useState(false);

  const lightOrDark = color => {
    if (color) {
      let r, g, b, hsp;

      color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&')
      );

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;

      hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
        );

      if (hsp>127.5) {
        return 'light';
      }
      else {
        return 'dark';
      }
    } else {
      return 'dark';
    }
  };

  return (
    <ClockProvider>
      <div>
        <Settings
          lightOrDark={lightOrDark}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        <ClockDisplay
          lightOrDark={lightOrDark}
        />
      </div>
    </ClockProvider>
  );
}

export default App;
