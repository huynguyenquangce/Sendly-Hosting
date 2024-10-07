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
import { RadioSetting, RangeSetting, SelectSetting } from "./SettingsComponent";
import { useDispatch, useSelector } from "react-redux";
import { getSection } from "../../redux/slice/app/sectionSlice";
import { AppDispatch, RootState } from "../../redux/store";

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

// Define the type for the settings
type Setting = {
  id: string;
  type: string;
  label: string;
  default: string;
  extra?: any;
};

const Section = () => {
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const listSection = useSelector(
    (state: RootState) => state.app.section.listSection
  );
  // State variables
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Setting[]>([
    { id: "", type: "", label: "", default: "", extra: {} },
  ]);

  useEffect(() => {
    dispatch(getSection());
  }, [dispatch]);
  console.log(listSection, "check response section list");

  // Callback function to handle child data updates
  const callbackFunction = (childData: any, field: string, index: number) => {
    const updatedSettings = [...settings];
    switch (field) {
      case "range":
        updatedSettings[index] = {
          ...updatedSettings[index],
          extra: { ...updatedSettings[index].extra, ...childData },
        };
        setSettings(updatedSettings);
        break;
      case "select":
        updatedSettings[index].extra = {
          ...updatedSettings[index].extra,
          ...childData,
        }; // Handle select
        setSettings(updatedSettings);
        break;
      case "radio":
        updatedSettings[index].extra = {
          ...updatedSettings[index].extra,
          ...childData,
        }; // Handle radio
        setSettings(updatedSettings);
        break;
      default:
        break;
    }
  };

  // Modal control functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Add a new setting
  const handleAddSetting = () => {
    setSettings([...settings, { id: "", type: "", label: "", default: "" }]);
  };

  // Update state for settings form based on index
  const handleSettingChange = (index: number, field: string, value: string) => {
    const updatedSettings = [...settings];
    updatedSettings[index] = { ...updatedSettings[index], [field]: value };
    setSettings(updatedSettings);
  };

  // Handle submit form
  const handleSubmit = () => {
    const createObject = { settings, subtitle, title };
    console.log("check setting", createObject);
    setTitle("");
    setSubtitle("");
    setSettings([{ id: "", type: "", label: "", default: "" }]);
    setOpen(false);
  };

  // Clear all settings
  const onClearAllSettings = () => {
    setTitle("");
    setSubtitle("");
    setSettings([{ id: "", type: "", label: "", default: "" }]);
  };

  // Handle change of setting type
  const handleChangeType = (index: number, event: SelectChangeEvent) => {
    handleSettingChange(index, "type", event.target.value as string);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button
        onClick={handleOpen}
        sx={{ marginTop: 10, marginLeft: 50 }}
        variant="outlined"
      >
        Create New Section
      </Button>
      {/* List Section  */}
      {listSection.data.sections.map((section: any, index: number) => (
        <Box key={index} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <div>{section.title} </div>
        </Box>
      ))}
      {/* Modal for section settings */}
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

              {/* Clear all settings button */}
              <Button onClick={onClearAllSettings}>Clear all Settings</Button>

              {/* Title and subtitle fields */}
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

              {/* Settings list */}
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

                      {/* Setting ID input */}
                      <TextField
                        label="ID"
                        value={setting.id}
                        fullWidth
                        margin="normal"
                        onChange={(e) =>
                          handleSettingChange(index, "id", e.target.value)
                        }
                      />

                      {/* Setting type selector */}
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

                      {/* Setting label input */}
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

                      {/* Setting default value input */}
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

                      {/* Render additional components based on setting type */}
                      {setting.type === "radio" && (
                        <RadioSetting
                          parentCallback={callbackFunction}
                          settingIndex={index}
                        ></RadioSetting>
                      )}
                      {setting.type === "range" && (
                        <RangeSetting
                          parentCallback={callbackFunction}
                          settingIndex={index}
                        ></RangeSetting>
                      )}
                      {setting.type === "select" && (
                        <SelectSetting
                          parentCallback={callbackFunction}
                          settingIndex={index}
                        ></SelectSetting>
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

              {/* Button for submitting settings */}
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
