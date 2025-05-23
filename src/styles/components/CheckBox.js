export const labelStyle = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
};

export const hiddenCheckboxStyle = {
  display: "none",
};

export const getBoxStyle = (checked) => ({
  width: "16px",
  height: "16px",
  borderRadius: "4px",
  border: `1px solid ${checked ? "#FF9266" : "#727272"}`,
  backgroundColor: checked ? "#FF9266" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
});

export const labelTextStyle = {
  marginLeft: "6px",
  fontSize: "14px",
  color: "#727272",
};
