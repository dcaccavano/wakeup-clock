import React from 'react';
import { SwatchesPicker } from 'react-color';

const ColorPicker = ({ getter, setter, show, setShow }) => {

  const updateColor = color => {
    setter(color.hex);
    setShow(false);
  };

  return (
    <React.Fragment>
      {
        show &&
        <React.Fragment>
          <div onClick={(e) => setShow(false)} className="inset-0 shade w-screen h-screen fixed" ></div>
          <div className="pickerWrapper absolute inset-0 w-auto h-auto mt-12">
            <SwatchesPicker
              color={getter}
              onChangeComplete={updateColor}
            />
          </div>
        </React.Fragment>

      }
    </React.Fragment>
  );
}

export default ColorPicker;
