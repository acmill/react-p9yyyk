import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { AutoComplete } from "antd";

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat)
});

const Complete = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const onSearch = searchText => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = data => {
    console.log("onSelect", data);
  };

  const onChange = data => {
    setValue(data);
  };

  return (
    <div>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="Version Number"
      />
    </div>
  );
};

export default Complete;
