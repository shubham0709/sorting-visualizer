import React from "react";
import { Slider, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { Sort } from "@mui/icons-material";

const PlayBar = ({
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  array,
  setArray,
  algo,
  setAlgo,
  disabled,
  min,
  max,
  handleResetArray,
  handleSort,
}) => {
  return (
    <div className="bg-white p-2 flex flex-row items-center w-full shadow gap-5">
      <Button disabled={disabled} onClick={handleResetArray} variant="contained">
        Randomize
      </Button>

      <div className="flex flex-col p-2 rounded-lg w-[250px]">
        <div className="flex flex-row justify-left items-center gap-5">
          <div>Array Size :</div>
          <div>{arraySize}</div>
        </div>
        <Slider
          disabled={disabled}
          min={min}
          max={max}
          value={arraySize}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) => setArraySize(e.target.value)}
        />
      </div>
      <div className="flex flex-col p-2 rounded-lg w-[250px]">
        <div className="flex flex-row justify-left items-center gap-5">
          <div>Speed :</div>
          <div>{speed}</div>
        </div>
        <Slider
          disabled={disabled}
          min={11}
          max={99}
          value={speed}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) => setSpeed(e.target.value)}
        />
      </div>
      <div className="flex flex-col p-2 rounded-lg w-[150px]">
        <FormControl size="small" disabled={disabled}>
          <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={algo}
            label="Algorithm"
            onChange={(e) => setAlgo(e.target.value)}
          >
            <MenuItem value={"bubbleSort"}>Bubble Sort</MenuItem>
            <MenuItem value={"selectionSort"}>Selection Sort</MenuItem>
            <MenuItem value={"quickSort"}>Quick Sort</MenuItem>
            <MenuItem value={"mergeSort"}>Merge Sort</MenuItem>
            <MenuItem value={"insertionSort"} disabled>
              Insertion Sort
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button
        disabled={disabled}
        startIcon={<Sort />}
        color="secondary"
        onClick={handleSort}
        variant="contained"
      >
        Sort
      </Button>
    </div>
  );
};

export default PlayBar;
