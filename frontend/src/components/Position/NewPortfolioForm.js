import { Button, TableRow } from "@mui/material";
import React, { useState } from "react";

const NewPortfolioForm = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show && <TableRow>This is your component</TableRow>}
      <Button onClick={() => setShow((prev) => !prev)}>
        Add New Portfolio
      </Button>
    </>
  );
};

export default NewPortfolioForm;
