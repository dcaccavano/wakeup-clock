import React from 'react';
import { SwatchesPicker } from 'react-color';

const ColorPicker = ({ type, getter, setter }) => {

  const [displayPicker, setDisplayPicker] = React.useState(false);

  const updateColor = color => {
    setter(color.hex);
    setDisplayPicker(false);
  };

  return (
    <div>
      <label>Color</label>
      <button
        onClick={() => setDisplayPicker(true)}
        className="p-2 border border-gray-700"
      >
        <span
          className="block h-4 w-8 rounded"
          style={{ background: getter }}></span>
      </button>
      {
        displayPicker &&
        <SwatchesPicker
          color={getter}
          onChangeComplete={updateColor}
        />
      }

    </div>
  );
}

export default ColorPicker;
