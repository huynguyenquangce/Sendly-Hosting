import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import {
  onChangeButtonRole,
  onPushRole,
} from "../../redux/slice/user/permissionSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
const SelectRole = (props: any) => {
  const userId = props.id;
  const [role, setRole] = useState("developer");
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeButtonRole = (event: SelectChangeEvent) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    dispatch(onChangeButtonRole());
    dispatch(onPushRole({ id: userId, role: selectedRole }));
  };
  return (
    <Select
      sx={{ width: 150 }}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={role}
      label="Age"
      onChange={handleChangeButtonRole}
    >
      <MenuItem value="developer">Developer</MenuItem>
      <MenuItem value="admin">Admin</MenuItem>
    </Select>
  );
};

export default SelectRole;
