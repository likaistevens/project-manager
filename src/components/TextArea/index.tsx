import React from "react";
import "./index.css";

const TextArea: React.FC<{
  value?: string;
  onChange?: (v: string) => void;
}> = ({ value, onChange }) => {
  const placeholder = "请输入";
  return (
    <div
      contentEditable={true}
      className="textarea"
      // style={{
      //   width: allowClear ? "calc(100% - 16px)" : "100%",
      // }}
      placeholder={placeholder}
      onBlur={(e) => {
        const newText = (e.target as any).innerHTML;
        onChange?.(newText);
      }}
      // onInput={(e) => {
      //   onChange?.((e.target as any).innerText);
      // }}
      dangerouslySetInnerHTML={{ __html: value || "" }}
    />
  );
};

export default TextArea;
