import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";



export default function BasicTable({dataRows}) {
    const columns = Object.keys(dataRows[0]);
  return (
      <div className="Table">
      
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((colum,index) => (                
                <TableCell key={`row-${index}`} align="left">{colum}</TableCell>
                ))}
                
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {dataRows.map((row,index) => (
                <TableRow
                  key={`col-data-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}               
                  
                >
                    {columns.map((colum,index) => (
                        <TableCell key={`col-${index}`} component="th" scope="row"  align="left">{row[colum]}</TableCell>
                    ))}
              
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
