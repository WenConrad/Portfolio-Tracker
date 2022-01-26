import { Button, FormControl, TableRow, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const NewPortfolioForm = () => {
  const [show, setShow] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const navigate = useNavigate();

  const handleChange = (newPortName) => {
    setNewPortfolioName(newPortName.target.value);
  };

  const handleSubmit = (event) => {
    console.log(newPortfolioName);
    // event.preventDefault();
    axios
      .post("/stocks/portfolio/new", { portName: newPortfolioName })
      .then((res) => {
        console.log(res.rows);
        navigate("/positions");
      });
  };

  return (
    <>
      {show && (
        <FormControl>
          <TextField
            required
            id="inputType"
            label="New Portfolio Name"
            value={newPortfolioName}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
      )}
      <Button onClick={() => setShow((prev) => !prev)}>
        Add New Portfolio
      </Button>
    </>
  );
};

export default NewPortfolioForm;
