import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import "./App.css";

const getQuery = (str) => {
  const current_url = new URL(window.location.href);
  return current_url.searchParams.get(str);
};

function App() {
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState(4);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    const textQuery = getQuery("text");
    const sizeQuery = parseInt(getQuery("size"), 10);
    const flippedQuery = getQuery("flip");
    const directionQuery = getQuery("direction");

    if (textQuery) {
      setText(textQuery);
    }

    if (sizeQuery) {
      setTextSize(sizeQuery);
    }

    if (flippedQuery) {
      setIsFlipped(true);
    }
    if (directionQuery && directionQuery.toLowerCase() === "rtl") {
      setIsRtl(true);
    }
  }, []);

  const onTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  return (
    <div style={{ height: "100%", background: "black", color: "white" }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ paddingTop: 3 }}>
          <button onClick={() => setTextSize((prev) => prev + 1)}>A+</button>
          <button onClick={() => setTextSize((prev) => (prev === 1 ? 1 : prev - 1))}>A-</button>
          <button onClick={() => setIsFlipped((prev) => !prev)}>Mirror</button>
          <button onClick={() => setIsRtl((prev) => !prev)}>
            Set Direction to {isRtl ? "Left to Right" : "Right to Left"}
          </button>
        </Stack>

        <TextField
          id="outlined-multiline-static"
          label="Text"
          multiline
          rows={8}
          onChange={onTextChange}
          value={text}
          inputProps={{ style: { fontSize: 4 * textSize, lineHeight: "normal", fontWeight: 600, color: "white" } }}
          sx={{
            transform: `scaleX(${isFlipped ? "-1" : "1"})`,
            background: "black",
            direction: isRtl ? "rtl" : "ltr",
          }}
        />
        <h3> queries API:</h3>
        <p>text:string</p>
        <p>size:number</p>
        <p>flip:string {" (any non-empty input will set it true)"}</p>
        <p>direction: string "rtl" {" (any other input will end in ltr direction)"}</p>
      </Stack>
    </div>
  );
}

export default App;
