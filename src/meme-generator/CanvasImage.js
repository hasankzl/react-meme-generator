import React, { Component } from "react";
import { Image } from "react-konva";
export default class CanvasImage extends Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    const { props } = this;
    if (
      oldProps.src !== props.src ||
      oldProps.width !== props.width ||
      oldProps.height !== props.height
    ) {
      if (!this.props.src) {
        this.setState({
          image: null,
        });
      } else {
        this.loadImage();
      }
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }

  async loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    let src = this.props.src;
  
    this.image.src = src;
    this.image.sameSite = "None";
    this.image.crossOrigin="anonymous"
    this.image.width = this.props.width;
    this.image.height = this.props.height;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}
