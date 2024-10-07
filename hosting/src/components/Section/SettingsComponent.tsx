import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/material";

interface RangeSettingProps {
  settingIndex: number;
  parentCallback: (
    childData: { min: string; max: string; step: string; unit: string },
    field: string,
    index: number
  ) => void;
}
const RangeSetting: React.FC<RangeSettingProps> = (props) => {
  const [subSetting, setSubSetting] = useState({
    min: "",
    max: "",
    step: "",
    unit: "",
  });

  const sendData = () => {
    props.parentCallback(subSetting, "range", props.settingIndex);
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
interface RadioSettingProps {
  settingIndex: number;
  parentCallback: (childData: any, field: string, index: number) => void;
}

interface RadioOption {
  value: string;
  label: string;
}

const RadioSetting: React.FC<RadioSettingProps> = (props) => {
  const [subSettings, setSubSettings] = useState<RadioOption[]>([
    { value: "", label: "" },
  ]);

  const handleAddOption = () => {
    setSubSettings([...subSettings, { value: "", label: "" }]);
  };

  const handleSubSettingChange = (
    index: number,
    field: keyof RadioOption,
    value: string
  ) => {
    const updatedSettings = [...subSettings];
    updatedSettings[index] = { ...updatedSettings[index], [field]: value };
    setSubSettings(updatedSettings);
  };

  // Function to send data back to parent component
  const sendData = () => {
    props.parentCallback(subSettings, "radio", props.settingIndex);
  };

  const submitSubSetting = () => {
    console.log(subSettings, "check subsettings");
    sendData();
  };

  return (
    <div>
      <div>Options Custom</div>
      {subSettings.map((option, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <TextField
            label="Label"
            value={option.label}
            onChange={(e) =>
              handleSubSettingChange(index, "label", e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Value"
            value={option.value}
            onChange={(e) =>
              handleSubSettingChange(index, "value", e.target.value)
            }
            fullWidth
          />
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={handleAddOption}
        sx={{ marginTop: 2 }}
      >
        Add Pair
      </Button>
      <Button
        variant="contained"
        onClick={submitSubSetting}
        sx={{ marginTop: 2, marginLeft: 2 }}
      >
        Submit
      </Button>
    </div>
  );
};
// const SelectSetting = () => {
//   return (
//     <>
//       <TextField
//         sx={{ marginTop: 2 }}
//         label="Options"
//         value={1}
//         fullWidth
//         placeholder="Comma-separated values"
//       />
//     </>
//   );
// };

interface SelectSettingProps {
  settingIndex: number;
  parentCallback: (childData: any, field: string, index: number) => void;
}

interface RadioOption {
  value: string;
  label: string;
}

const SelectSetting: React.FC<RadioSettingProps> = (props) => {
  const [subSettings, setSubSettings] = useState<RadioOption[]>([
    { value: "", label: "" },
  ]);

  const handleAddOption = () => {
    setSubSettings([...subSettings, { value: "", label: "" }]);
  };

  const handleSubSettingChange = (
    index: number,
    field: keyof RadioOption,
    value: string
  ) => {
    const updatedSettings = [...subSettings];
    updatedSettings[index] = { ...updatedSettings[index], [field]: value };
    setSubSettings(updatedSettings);
  };

  // Function to send data back to parent component
  const sendData = () => {
    props.parentCallback(subSettings, "select", props.settingIndex);
  };

  const submitSubSetting = () => {
    console.log(subSettings, "check subsettings");
    sendData();
  };

  return (
    <div>
      <div>Options Custom</div>
      {subSettings.map((option, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <TextField
            label="Label"
            value={option.label}
            onChange={(e) =>
              handleSubSettingChange(index, "label", e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Value"
            value={option.value}
            onChange={(e) =>
              handleSubSettingChange(index, "value", e.target.value)
            }
            fullWidth
          />
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={handleAddOption}
        sx={{ marginTop: 2 }}
      >
        Add Pair
      </Button>
      <Button
        variant="contained"
        onClick={submitSubSetting}
        sx={{ marginTop: 2, marginLeft: 2 }}
      >
        Submit
      </Button>
    </div>
  );
};
export { RangeSetting, RadioSetting, SelectSetting };
