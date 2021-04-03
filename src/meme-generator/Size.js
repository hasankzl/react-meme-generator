import React from "react";
import { FormGroup, FormLabel, FormControl, Row, Col } from "react-bootstrap";
import { maxStageWidth, maxStageHeight } from "../utils/constants";
const Size = ({ stageWidth, stageHeight, handleSizeChange }) => {
  return (
    <Row>
      <Col>
        <FormGroup className="d-flex flex-column">
          <FormLabel className="text-center text-nowrap">
            Width {stageWidth}px
          </FormLabel>
          <FormControl
            type="range"
            min={20}
            max={maxStageWidth}
            name="stageWidth"
            step={1}
            value={Number(stageWidth)}
            onChange={(e) => handleSizeChange(e)}
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup className="d-flex flex-column">
          <FormLabel className="text-center text-nowrap">
            Height {stageHeight}px
          </FormLabel>
          <FormControl
            className=""
            type="range"
            min={20}
            max={maxStageHeight}
            name="stageHeight"
            step={1}
            value={Number(stageHeight)}
            onChange={(e) => handleSizeChange(e)}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};
export default Size;
