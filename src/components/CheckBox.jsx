import { useState } from 'react';
import {
  labelStyle,
  hiddenCheckboxStyle,
  getBoxStyle,
  labelTextStyle,
} from '../styles/components/CheckBox';

const CheckBox = ({ children, checked: externalChecked, onChange: externalOnChange, ...props }) => {
  const [internalChecked, setInternalChecked] = useState(false);
  
  // 외부에서 checked 값을 제어하는 경우와 내부 상태를 사용하는 경우를 구분
  const checked = externalChecked !== undefined ? externalChecked : internalChecked;

  const handleChange = (e) => {
    // 내부 상태 업데이트
    if (externalChecked === undefined) {
      setInternalChecked(e.target.checked);
    }
    
    // 외부 이벤트 핸들러 호출
    if (externalOnChange) {
      externalOnChange(e);
    }
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
