import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button } from "@mui/material";
import SelectRole from "./Select_Role";
import { useDispatch, useSelector } from "react-redux";
import "./Admin.scss";
import { RootState, AppDispatch } from "../../redux/store";
import { resetRoleChange } from "../../redux/slice/user/permissionSlice";
import { getUser } from "../../redux/slice/user/userSlice";
import { useEffect, useState } from "react";

function createData(id: string, email: string, role: string) {
  return { id, email, role };
}

const BasicTable = () => {
  const [rows, setRows] = useState<
    Array<{ id: string; email: string; role: string }>
  >([]);

  const dispatch = useDispatch<AppDispatch>();

  const userList = useSelector(
    (state: RootState) => state.admin.listuser.userList
  );

  const onChangeBtnRole = useSelector(
    (state: RootState) => state.admin.permission.isChangeButtonRole
  );

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userList.length > 0) {
      const transformedRows = userList.map(
        (item: { id: string; email: string; roles: string[] }) =>
          createData(item.id, item.email, item.roles[0])
      );
      setRows(transformedRows);
    }
  }, [userList]);

  const onButtonSave = () => {
    dispatch(resetRoleChange());
  };
  return (
    <>
      <div className="admin-table">
        <div className="admin-table-title">User Permissions</div>
        <div className="admin-table-content">
          {onChangeBtnRole && <Button onClick={onButtonSave}>Save</Button>}
          <TableContainer component={Paper} sx={{ width: 1200 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="center">Permissions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="center">
                      <SelectRole id={row.id}></SelectRole>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
export default BasicTable;
