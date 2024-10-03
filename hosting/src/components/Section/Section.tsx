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
import { useState } from "react";

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
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState([
    { id: "", type: "", label: "", value: "" },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddSetting = () => {
    setSettings([...settings, { id: "", type: "", label: "", value: "" }]);
  };

  // Update state for settings form base on index
  const handleSettingChange = (index: number, field: string, value: string) => {
    const updatedSettings = [...settings];
    updatedSettings[index] = { ...updatedSettings[index], [field]: value };
    setSettings(updatedSettings);
  };

  // Handle submit form
  const handleSubmit = () => {
    const objectCreate = {
      title: title,
      subtitle: subtitle,
      settings: settings,
    };
    console.log(objectCreate, "check create Object");
    setTitle("");
    setSubtitle("");
    setSettings([{ id: "", type: "", label: "", value: "" }]);
    setOpen(false);
  };

  const onClearAllSettings = () => {
    setTitle("");
    setSubtitle("");
    setSettings([{ id: "", type: "", label: "", value: "" }]);
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
                      <TextField
                        label="Type"
                        value={setting.type}
                        onChange={(e) =>
                          handleSettingChange(index, "type", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Label"
                        value={setting.label}
                        onChange={(e) =>
                          handleSettingChange(index, "label", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Value"
                        value={setting.value}
                        onChange={(e) =>
                          handleSettingChange(index, "value", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
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
