import React from "react";
import { Text, Group } from "react-konva";

const closeButton = (props) => {
  return (
    <Group
      ref={props.deleteRef}
      onClick={() => props.delete()}
      onTouchEnd={() => props.delete()}
    >
      <Text
        width={18}
        height={13}
        fontSize={20}
        fontFamily="Arial"
        text="X"
        fill="red"
      />
    </Group>
  );
};
export default closeButton;
