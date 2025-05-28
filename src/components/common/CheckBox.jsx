import { useState } from "react";
import {
  labelStyle,
  hiddenCheckboxStyle,
  getBoxStyle,
  labelTextStyle,
} from "../../styles/components/CheckBox";

const CheckBox = ({ children, checked, onChange, onClick, ...props }) => {
  // 외부에서 checked prop이 제공되지 않을 경우에만 내부 상태 사용
  const [internalChecked, setInternalChecked] = useState(false);

  // 실제 사용할 checked 값 (외부 prop 우선)
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (e) => {
    // 내부 상태 업데이트
    setInternalChecked(e.target.checked);

    // 외부 onChange가 있으면 호출
    if (onChange) {
      onChange(e);
    }
  };

  const handleClick = () => {
    // 외부 onClick이 있으면 호출
    if (onClick) {
      onClick();
    }
  };

  return (
    <label style={labelStyle} onClick={handleClick}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={hiddenCheckboxStyle}
        {...props}
      />
      <div style={getBoxStyle(isChecked)}>
        {isChecked && (
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
