import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { flip_icon } from "./icons";
import { useEffect, useState } from "react";
import "./App.css";

const getQuery = (str) => {
  const current_url = new URL(window.location.href);
  return current_url.searchParams.get(str);
};

function App() {
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState(4);
  const [isFlipped_H, setIFlipped_H] = useState(false);
  const [isFlipped_V, setIFlipped_V] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    const textQuery = getQuery("text");
    const sizeQuery = parseInt(getQuery("size"), 10);
    const flippedHQuery = getQuery("hflip");
    const flippedVQuery = getQuery("vflip");
    const directionQuery = getQuery("direction");

    if (textQuery) {
      setText(textQuery);
    }

    if (sizeQuery) {
      setTextSize(sizeQuery);
    }

    if (flippedHQuery) {
      setIFlipped_H(true);
    }

    if (flippedVQuery) {
      setIFlipped_V(true);
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
          <button onClick={() => setIFlipped_H((prev) => !prev)}>
            <img
              src={flip_icon}
              title="Horizontal Flip Button. Icon by Free Preloaders on https://freeicons.io/profile/726"
            />
          </button>
          <button onClick={() => setIFlipped_V((prev) => !prev)}>
            <img
              src={flip_icon}
              title="Vertical Flip Button. Icon by Free Preloaders on https://freeicons.io/profile/726"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>
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
            transform: `scale(${isFlipped_H ? "-1" : "1"},${isFlipped_V ? "-1" : "1"})`,
            background: "black",
            direction: isRtl ? "rtl" : "ltr",
          }}
        />
        <p style={{ padding: 30, width: "100%", textAlign: "center" }}>
          {" "}
          Missing any thing? Have a suggestions? Want to contribute? you can create a new issue{" "}
          <a href="https://github.com/vaismav/teleprompterAPI/issues">HERE {":)"}</a>
        </p>
        <h3> queries API:</h3>
        <p>text:string</p>
        <p>size:number</p>
        <p>hflip:string {" horizontal flip (any non-empty input will set it true)"}</p>
        <p>vflip:string {" vertical flip (any non-empty input will set it true)"}</p>
        <p>direction: string "rtl" {" (any other input will end in ltr direction)"}</p>
      </Stack>
    </div>
  );
}

export default App;
