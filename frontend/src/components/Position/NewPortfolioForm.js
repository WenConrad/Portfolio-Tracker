import { Button, FormControl, TableRow, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import React, { useState, useContext } from "react";
import { portfoliosContext } from "../../providers/PortfolioProvider";

const NewPortfolioForm = () => {
  const [show, setShow] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const { portfolios, setPortfolios } = useContext(portfoliosContext);

  const handleChange = (newPortName) => {
    setNewPortfolioName(newPortName.target.value);
  };

  const handleSubmit = (event) => {
    axios
      .post("/stocks/portfolio/new", { portName: newPortfolioName })
      .then((res) => {
        setPortfolios([...portfolios, res.data[0]]);
      });
  };

  return (
    <>
      <Button startIcon={<AddIcon />} onClick={() => setShow((prev) => !prev)}>
        Add New Portfolio
      </Button>
      {show && (
        <FormControl>
          <TextField
            required
            id="inputType"
            label="New Portfolio Name"
            autoComplete="off"
            value={newPortfolioName}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
      )}
    </>
  );
};

export default NewPortfolioForm;
