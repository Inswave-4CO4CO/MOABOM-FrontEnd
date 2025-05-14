import { useState } from 'react';
import {
  labelStyle,
  hiddenCheckboxStyle,
  getBoxStyle,
  labelTextStyle,
} from '../styles/components/CheckBox';

const CheckBox = ({ children, ...props }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <label style={labelStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={hiddenCheckboxStyle}
        {...props}
      />
      <div style={getBoxStyle(checked)}>
        {checked && (
          <svg
            viewBox="0 0 24 24"
            width="14px"
            height="14px"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span style={labelTextStyle}>{children}</span>
    </label>
  );
};

export default CheckBox;
