import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

const RangeSetting = (props: any) => {
  // const { id } = props;
  const [subSetting, setSubSetting] = useState({
    min: "",
    max: "",
    step: "",
    unit: "",
  });

  const sendData = () => {
    const createObject = { subSettingObject: subSetting };
    props.parentCallback(createObject, "range");
  };

  const handleSubSettingChange = (field: string, value: string) => {
    setSubSetting((prevSetting) => ({
      ...prevSetting,
      [field]: value,
    }));
  };

  // Submit function
  const submitSubSetting = () => {
    sendData();
  };

  return (
    <>
      <TextField
        sx={{ marginTop: 2 }}
        label="Min"
        value={subSetting.min}
        fullWidth
        onChange={(e) => handleSubSettingChange("min", e.target.value)}
      />
      <TextField
        sx={{ marginTop: 2 }}
        label="Max"
        value={subSetting.max}
        fullWidth
        onChange={(e) => handleSubSettingChange("max", e.target.value)}
      />
      <TextField
        sx={{ marginTop: 2 }}
        label="Step"
        value={subSetting.step}
        fullWidth
        onChange={(e) => handleSubSettingChange("step", e.target.value)}
      />
      <TextField
        sx={{ marginTop: 2 }}
        label="Unit"
        value={subSetting.unit}
        fullWidth
        onChange={(e) => handleSubSettingChange("unit", e.target.value)}
      />
      <Button onClick={submitSubSetting}>Confirm Sub Settings</Button>
    </>
  );
};

const RadioSetting = () => {
  return (
    <>
      <TextField
        sx={{ marginTop: 2 }}
        label="Options"
        value={1}
        fullWidth
        placeholder="Comma-separated values"
      />
    </>
  );
};

const SelectSetting = () => {
  return (
    <>
      <TextField
        sx={{ marginTop: 2 }}
        label="Options"
        value={1}
        fullWidth
        placeholder="Comma-separated values"
      />
    </>
  );
};

export { RangeSetting, RadioSetting, SelectSetting };
