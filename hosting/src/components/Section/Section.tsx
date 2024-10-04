import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { RadioSetting, RangeSetting, SelectSetting } from "./SettingsType";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Section = () => {
  ////////////////////////////////////////////////////////////

  const [rangeSetting, setRangeSetting] = useState({});
  const [radioSetting, setRadioSetting] = useState({});
  const [selectSetting, setSelectSetting] = useState({});
  const callbackFunction = (childData: any, field: string) => {
    switch (field) {
      case "range":
        setRangeSetting(childData);
        break;
      case "select":
        setSelectSetting(childData);
        break;
      case "radio":
        setRadioSetting(childData);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log("check range Settings", rangeSetting);
  }),
    [rangeSetting];

  ////////////////////////////////////////////////////////////
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState([
    { id: "", type: "", label: "", default: "" },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddSetting = () => {
    setSettings([...settings, { id: "", type: "", label: "", default: "" }]);
  };

  // Update state for settings form base on index
  const handleSettingChange = (index: number, field: string, value: string) => {
    const updatedSettings = [...settings];
    updatedSettings[index] = { ...updatedSettings[index], [field]: value };
    setSettings(updatedSettings);
  };

  // Handle submit form
  const handleSubmit = () => {
    const standardSetting = { ...settings, ...rangeSetting };
    const objectCreate = {
      title: title,
      subtitle: subtitle,
      settings: standardSetting,
    };
    console.log("check standardSetting", rangeSetting);
    console.log(objectCreate, "check create Object");
    setTitle("");
    setSubtitle("");
    setSettings([{ id: "", type: "", label: "", default: "" }]);
    setOpen(false);
  };

  const onClearAllSettings = () => {
    setTitle("");
    setSubtitle("");
    setSettings([{ id: "", type: "", label: "", default: "" }]);
  };

  const handleChangeType = (index: number, event: SelectChangeEvent) => {
    handleSettingChange(index, "type", event.target.value as string);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ marginTop: 10, marginLeft: 50 }}
        variant="outlined"
      >
        Create New Section
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <FormControl fullWidth>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Section Settings
              </Typography>
              <Button onClick={onClearAllSettings}>Clear all Settings</Button>
              <TextField
                label="Title"
                placeholder="Section Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Subtitle"
                placeholder="Section Subtitle"
                fullWidth
                margin="normal"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <Box
                sx={{
                  maxHeight: 250,
                  overflowY: "auto",
                  mt: 2,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  padding: 2,
                }}
              >
                {settings.map((setting, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      boxShadow: 2,
                      padding: 2,
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Setting {index + 1}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <TextField
                        label="ID"
                        value={setting.id}
                        fullWidth
                        margin="normal"
                        onChange={(e) =>
                          handleSettingChange(index, "id", e.target.value)
                        }
                      />
                      <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel id="type_id">Type</InputLabel>
                        <Select
                          labelId="type_id"
                          value={setting.type}
                          label="Type"
                          onChange={(e) => handleChangeType(index, e)}
                        >
                          <MenuItem value="checkbox">Checkbox</MenuItem>
                          <MenuItem value="number">Number</MenuItem>
                          <MenuItem value="radio">Radio</MenuItem>
                          <MenuItem value="range">Range</MenuItem>
                          <MenuItem value="select">Select</MenuItem>
                          <MenuItem value="text">Text</MenuItem>
                          <MenuItem value="textarea">TextArea</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        sx={{ marginTop: 2 }}
                        label="Label"
                        value={setting.label}
                        onChange={(e) =>
                          handleSettingChange(index, "label", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        sx={{ marginTop: 2 }}
                        label="Value"
                        value={setting.default}
                        onChange={(e) =>
                          handleSettingChange(index, "default", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />

                      {setting.type === "radio" && (
                        <RadioSetting></RadioSetting>
                      )}
                      {setting.type === "range" && (
                        <RangeSetting
                          setting={setting}
                          parentCallback={callbackFunction}
                        ></RangeSetting>
                      )}
                      {setting.type === "select" && (
                        <SelectSetting></SelectSetting>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
              {/* Button for adding settings */}
              <Button
                onClick={handleAddSetting}
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
              >
                Add Setting
              </Button>

              {/* Button Submit */}
              <Button
                onClick={handleSubmit}
                variant="outlined"
                sx={{ mt: 2 }}
                fullWidth
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Section;
