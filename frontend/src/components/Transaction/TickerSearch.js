import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function TickerSearch(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const { ticker, handleTickerChange } = props;

  React.useEffect(() => {
    if (ticker.length > 0) {
      axios.post("/stocks/search", { ticker: ticker }).then((res) => {
        setOptions([...res.data]);
      });
    }
  }, [ticker]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      filterOptions={(x) => x}
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => option}
      onInputChange={(e, v) => {
        handleTickerChange(v);
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          value={ticker}
          onChange={(e) => handleTickerChange(e.target.value)}
          label="Stock Symbol"
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
}
