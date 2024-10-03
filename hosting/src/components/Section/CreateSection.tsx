import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function CreateSection() {
  return (
    <div className="section-table">
      <div className="section-table-title">Create New Section</div>
      <div className="section-table-content">
        {" "}
        <form>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>{" "}
      </div>
    </div>
  );
}

export default CreateSection;
