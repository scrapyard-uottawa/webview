import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Paper, TextField, Button } from '@mui/material';
import './AssignUsers.css';

const AssignUsers = () => {
    const machineID = useParams().id;
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [newUser, setNewUser] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:5000/getMachines");
          const data = await res.json();
          // Assuming data is an array of objects with a Users property
          // Find the object that matches the machineID and set its Users as the state
          const machine = data.find((m) => m.MachineID === machineID);
          if (machine) {
            console.log(machine);
            setUsers(machine.Users);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [machineID]);
  
    // Handle page change
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    // Handle new user input change
    const handleChangeNewUser = (event) => {
      setNewUser(event.target.value);
    };
  
    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a post request to the server with the newUser and machineID
            const res = await fetch("${process.env.REACT_APP_API_ENDPOINT}/uploadUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                User: newUser,
                MachineID: machineID
            })
            });
            const data = await res.json();
            // Update the users state with the newUser
            setUsers((prevUsers) => [...(prevUsers ?? []), newUser]);
            // Clear the newUser input
            setNewUser("");
        } catch (error) {
            console.error(error);
        }
    };

    const onRemove = async (user) => {
      try {
        // Send a post request to the server with the user and machineID
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/removeUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ User: user, MachineID: machineID }),
        });
        const data = await res.json();
        // Update the users state by filtering out the user
        setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <div>
        <h2>Add users to {machineID}</h2>
        {/* Use a div with className="container" */}
        <div className="container">
          {/* Use a div with className="table" */}
          <div className="table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Users</TableCell>
                    <TableCell>Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {/* Slice the users array based on the page and rowsPerPage */}
                {users
                  ? users
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user) => (
                        <TableRow key={user}>
                          <TableCell>{user}</TableCell>
                          {/* Add a new TableCell with a Button that calls onRemove */}
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => onRemove(user)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  : (
                    <TableRow>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
              </TableBody>
              </Table>
              {/* Use TablePagination outside of Table to prevent scrolling */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
          {/* Use a div with className="form" */}
          <div className="form">
            {/* Use a form element to handle submission */}
            <form onSubmit={handleSubmit}>
              <TextField
                label="New User"
                variant="outlined"
                value={newUser}
                onChange={handleChangeNewUser}
              />
              {/* make button on the next line */}
                <br /><br />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add User
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default AssignUsers