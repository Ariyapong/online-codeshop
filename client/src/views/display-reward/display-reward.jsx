import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Button } from "@material-ui/core";
import styles from "./display-reward-style.module.scss";
// import 'react-virtualized/styles.css';

function DisplayReward() {
  const [contentURL, setContentURL] = useState(
    JSON.parse(window.sessionStorage.getItem("url"))
  );

  const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      Row {index}
    </div>
  );

  const Content = ({ index, style }) => (
    <div
      className={
        index % 2
          ? `${styles.customCell}`
          : `${styles.ListItemEven} ${styles.customCell}`
      }
      style={style}
      key={index}
    >
      <div className={`${styles.fontSize}`}>{contentURL[index]}</div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          navigator.clipboard.writeText(contentURL[index]);
        }}
      >
        Copy
      </Button>
    </div>
  );
  // contentURL.map((data) => {
  //     console.log("data start", data)
  //   return (
  //     <div
  //     //   className={index % 2 ? "ListItemOdd" : "ListItemEven"}
  //       style={style}
  //       key={index}
  //     >
  //       {data}
  //     </div>
  //   );
  // });

  return (
    <div className={styles.displayCode}>
      <h3>Reward codes</h3>
      <div className={styles.frameDisplay}>
        {contentURL.length > 0 && (
          <AutoSizer style={{ height: "70vh" }}>
            {({ height, width }) => (
              <List
                className="List"
                height={height}
                // itemCount={1000}
                itemCount={contentURL.length}
                itemSize={110}
                width={width}
              >
                {/* {Row} */}
                {Content}
              </List>
            )}
          </AutoSizer>
        )}
      </div>

      <Button
        variant="outlined"
        color="secondary"
        size="small"
        // className={classes.customButton}
        // type="submit"
      >
        Register Code
      </Button>
    </div>
  );
}

export default DisplayReward;
