import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import CanvasImage from "./CanvasImage";
import CanvasText from "./CanvasText";
import AddedImage from "./AddedImage";
import TextProperties from "./TextProperties";
import Download from "./Download";
import Size from "./Size";

import {
  maxStageWidth,
  maxStageHeight,
  stageHeight,
  stageWidth,
} from "../utils/constants";
import { FormFile, Button, Row, Col, Container } from "react-bootstrap";

class MemeGenerator extends Component {
  state = {
    inputs: [],
    images: [],
    backgroundImageSrc: null,
    backgroundImageName: null,
    templateName: null,
    selectedText: null,
    selectedTextarea: null,
    selectedImage: null,
    src: "",
    stageWidth,
    stageHeight,
    triggerCors: false,
    defaultSelect: "",
  };

  componentDidMount() {
    window.document.addEventListener("keydown", (e) => {
      if (e.key === "Delete" && this.state.selectedText != null) {
        this.deleteText();
      }
    });
  }

  addText = () => {
    const inputs = this.state.inputs;
    if (this.state.selectedText != null) {
      inputs[this.state.selectedText].selected = false;
    }
    this.setState((state) => ({
      inputs: [
        ...inputs,
        {
          x: 50,
          y: 50,
          text: "yazı ekleyin",
          fontSize: 25,
          selected: true,
          fontFamily: "Impact",
          fill: "#ffffff",
          strokeWidth: 1.5,
          stroke: "#000000",
          shadowColor: "#000000",
          align: "center",
          padding: 5,
          letterSpacing: 1,
          lineHeight: 1,
          textDecoration: "none",
          verticalAlign: "top",
          opacity: 1,
          shadowOpacity: 1,
          shadowBlur: 0,
        },
      ],
      selectedText: state.inputs.length,
    }));
  };
  addImage = (e) => {
    const files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      this.setState((state) => ({
        images: [
          ...state.images,
          {
            properties: {
              x: 40,
              y: 50,
            },
            src: e.target.result,
          },
        ],
        selectedImage: state.images.length,
      }));
    };
  };
  handleTextChange = (key, value) => {
    if (this.state.selectedText === null) {
      alert("please select a text");
      return;
    }

    const inputs = this.state.inputs;
    inputs[this.state.selectedText][key] = value;
    inputs[this.state.selectedText].selected = false;
    this.setState({
      inputs,
    });
  };
  selectText = (index, textarea) => {
    const inputs = this.state.inputs;
    const oldSelected = this.state.selectedText;
    if (oldSelected != null) {
      inputs[oldSelected].selected = false;
    }
    if (index != null) {
      inputs[index].selected = true;
    }
    this.setState({
      inputs,
      selectedText: index,
      selectedTextarea: textarea,
    });
  };
  selectImage = (index) => {
    this.setState({
      selectedImage: index,
    });
  };
  deleteText = (index) => {
    const id = index;
    if (id != null) {
      const inputs = this.state.inputs;
      inputs.splice(id, 1);

      this.setState({
        inputs,
        selectedText: null,
        selectedTextarea: null,
      });
    } else {
      alert("please select a text");
    }
  };
  handleDragEnd = (target, index) => {
    let inputs = this.state.inputs;
    inputs[index].x = target.x;
    inputs[index].y = target.y;
    this.setState({
      inputs,
    });
  };
  deleteImage = () => {
    const id = this.state.selectedImage;
    if (id != null) {
      const images = this.state.images;
      delete images[id];
      this.setState({
        images,
        selectedImage: null,
      });
    } else {
      alert("please select a image");
    }
  };
  addBackground = (e) => {
    const file = e.target.files[0];
    var fr = new FileReader();

    var img = new Image();
    img.onload = () => {
      let stageWidth = img.width;
      let stageHeight = img.height;
      stageWidth = stageWidth > maxStageWidth ? maxStageWidth : stageWidth;
      stageHeight = stageHeight > maxStageHeight ? maxStageHeight : stageHeight;

      this.setState({
        backgroundImageSrc: img.src,
        backgroundImageName: img.name,
        stageWidth,
        stageHeight,
      });
    };
    fr.onload = () => {
      img.name = file.name;
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  };
  handleSizeChange = (e) => {
    this.setState({
      [e.target.name]: Number(e.target.value),
    });
  };
  returnDataURL = () => {
    const dataURL = this.stageRef ? this.stageRef.getStage().toDataURL() : null;
    return dataURL;
  };

  render() {
    const {
      src,
      backgroundImageSrc,
      stageWidth,
      stageHeight,
      images,
      inputs,
      selectedText,
      triggerCors,
    } = this.state;
    return (
      <Container className="pl-4 pr-4" fluid>
        <Row>
          <Col md={4}>
            <TextProperties
              handleTextChange={this.handleTextChange}
              selectedText={selectedText}
              text={inputs[selectedText]}
            />
          </Col>

          <Col id="canvasDiv" md={4}>
            <Row>
              <label className="btn btn-outline-primary  col m-2">
                Change Background image
                <FormFile onChange={(e) => this.addBackground(e)} hidden />
              </label>
              <label className="btn btn-outline-primary  col m-2 d-flex">
                <span className="m-auto">Add Image</span>
                <FormFile onChange={(e) => this.addImage(e)} hidden />
              </label>
              <Button
                variant="outline-primary"
                className="col m-2"
                onClick={() => this.addText()}
              >
                Add Text
              </Button>
            </Row>
            <Row>
              <Col className="pt-2">
                <Stage
                  className="justify-content-center mb-5 d-flex"
                  width={stageWidth}
                  height={stageHeight}
                  ref={(node) => {
                    this.stageRef = node;
                  }}
                >
                  <Layer
                    ref={(node) => {
                      this.layerRef = node;
                    }}
                  >
                    <CanvasImage
                      src={backgroundImageSrc ? backgroundImageSrc : src}
                      width={stageWidth}
                      triggerCors={triggerCors}
                      height={stageHeight}
                    />
                    {images &&
                      images.map((image, index) => {
                        if (image === undefined) {
                          return null;
                        } else {
                          return (
                            <AddedImage
                              src={image.src}
                              properties={image.properties}
                              key={index}
                              index={index}
                              selectedImage={this.selectImage}
                              deleteImage={this.deleteImage}
                            />
                          );
                        }
                      })}
                    {inputs &&
                      inputs.map((input, index) => {
                        return (
                          <CanvasText
                            input={input}
                            handleDragEnd={this.handleDragEnd}
                            stagePosition={() =>
                              this.stageRef.container().getBoundingClientRect()
                            }
                            handleTextChange={this.handleTextChange}
                            index={index}
                            key={index}
                            selectedText={this.selectText}
                            deleteText={() => this.deleteText(index)}
                          />
                        );
                      })}
                  </Layer>
                </Stage>
              </Col>
            </Row>
          </Col>

          <Col className="memegenerator-right-col" md={4}>
            <Size
              stageWidth={stageWidth}
              stageHeight={stageHeight}
              handleSizeChange={this.handleSizeChange}
            />
            <Row>
              <Col>
                <Download
                  dataURL={() => this.returnDataURL()}
                  width={stageWidth}
                  height={stageHeight}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MemeGenerator;
