import { useEffect, useState } from "react";
import PlayBar from "./PlayBar";
import { Box } from "@mui/material";

const PlayGround = () => {
  const min = 1,
    max = 300;

  const [arraySize, setArraySize] = useState(100);
  const [speed, setSpeed] = useState(90);
  const [array, setArray] = useState([]);
  const [algo, setAlgo] = useState("mergeSort");
  const [currentIndices, setCurrentIndices] = useState([null, null]);
  const [loading, setLoading] = useState(false);

  const getRandomNumber = (lower, upper) => {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  };

  const handleResetArray = () => {
    setCurrentIndices(() => [null, null]);
    setArray(new Array(arraySize).fill(0).map((el) => getRandomNumber(min, max)));
  };

  const getSpeed = () => {
    const x = 100 - speed;
    return x;
  };

  const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  useEffect(() => {
    console.log({ loading });
  }, [loading]);

  const handleSort = async () => {
    try {
      setLoading(true);
      switch (algo) {
        case "bubbleSort": {
          let arr = [...array];
          let n = arr.length;
          for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
              await new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, getSpeed());
              });
              setCurrentIndices(() => [j, j + 1]);
              if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                setArray([...arr]);
              }
            }
          }
          break;
        }
        case "selectionSort": {
          //put the min element at the first
          let arr = [...array];
          for (let i = 0; i < arr.length; i++) {
            let min = i;
            for (let j = i + 1; j < arr.length; j++) {
              await new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, getSpeed());
              });
              setCurrentIndices(() => [j, min]);
              if (arr[j] < arr[min]) {
                min = j;
              }
            }
            if (min != i) {
              swap(arr, i, min);
            }
            setArray([...arr]);
          }
          break;
        }
        case "quickSort": {
          let arr = [...array];
          const partition = async (arr, low, high) => {
            let pivot = arr[high];
            let idx = low - 1;
            for (let i = low; i < high; i++) {
              await new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, getSpeed());
              });
              setCurrentIndices(() => [i, high]);
              if (arr[i] < pivot) {
                idx++;
                let temp = arr[idx];
                arr[idx] = arr[i];
                arr[i] = temp;
                setArray([...arr]);
              }
            }
            idx++;
            let temp = arr[idx];
            arr[idx] = arr[high];
            arr[high] = temp;
            setArray([...arr]);
            return idx; // Return the final position of the pivot
          };

          const quickSort = async (arr, low, high) => {
            if (low < high) {
              let pivotIdx = await partition(arr, low, high);
              await quickSort(arr, low, pivotIdx - 1);
              await quickSort(arr, pivotIdx + 1, high);
            }
          };
          await quickSort(arr, 0, arr.length - 1);
          setArray([...arr]);
          break;
        }
        case "mergeSort": {
          let arr = [...array]; // Ensure you copy the array correctly

          const conquer = async (arr, start, middle, end) => {
            let n1 = middle - start + 1;
            let n2 = end - middle;

            let left = new Array(n1);
            let right = new Array(n2);

            for (let i = 0; i < n1; i++) left[i] = arr[start + i];
            for (let j = 0; j < n2; j++) right[j] = arr[middle + 1 + j];

            let i = 0,
              j = 0;
            let k = start;

            while (i < n1 && j < n2) {
              setCurrentIndices([start + i, middle + 1 + j]); // Highlight compared elements
              await new Promise((resolve) => setTimeout(resolve, getSpeed()));

              if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
              } else {
                arr[k] = right[j];
                j++;
              }
              k++;
            }

            while (i < n1) {
              arr[k] = left[i];
              i++;
              k++;
            }

            while (j < n2) {
              arr[k] = right[j];
              j++;
              k++;
            }

            setArray([...arr]); // Update the visualization
          };

          const divide = async (arr, start, end) => {
            if (start >= end) {
              return; // Base case: the array is already divided into single-element arrays
            }
            const middle = start + Math.floor((end - start) / 2);
            await divide(arr, start, middle); // Divide the first half
            await divide(arr, middle + 1, end); // Divide the second half
            await conquer(arr, start, middle, end); // Merge the divided arrays
          };

          const mergeSort = async (arr, start, end) => {
            await divide(arr, start, end);
          };
          await mergeSort(arr, 0, arr.length - 1); // Ensure sorting is completed before setting loading to false
          break;
        }
        default:
        // Handle other sorting algorithms
      }
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleResetArray();
  }, [arraySize]);

  return (
    <div>
      <PlayBar
        handleSort={handleSort}
        min={min}
        max={max}
        arraySize={arraySize}
        setArraySize={setArraySize}
        speed={speed}
        setSpeed={setSpeed}
        array={array}
        setArray={setArray}
        algo={algo}
        setAlgo={setAlgo}
        handleResetArray={handleResetArray}
        disabled={loading}
      />
      <div className="flex flex-row gap-1 items-end p-2">
        {array?.map((el, idx) => {
          let h = (el * 500) / max + "px";
          return (
            <Box
              key={idx}
              className={`flex flex-row flex-1 ${
                currentIndices[0] == idx
                  ? "bg-red-400"
                  : currentIndices[1] == idx
                  ? "bg-green-400"
                  : "bg-[#084298]"
              }`}
              sx={{
                width: "10px",
                height: h,
                // backgroundColor: "#084298",
              }}
            >
              {/* <p className="text-white text-xs">{el}</p> */}
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default PlayGround;
