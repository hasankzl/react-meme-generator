import React, { Component } from 'react'
import { Image, Transformer, Group } from 'react-konva';
import CloseButton from "./CloseButton"
export default class AddedImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      selected: true,
    }
    this.deleteRef = React.createRef();
  }

  componentDidMount() {

    this.loadImage();

  }
  checkNode() {
    // transormerı ayarlar
    const selectedNode = this.imageNode;
    const deleteNode = this.deleteRef.current;
    this.transformer.add(deleteNode)
    if (this.state.selected) {
      this.transformer.nodes([selectedNode]);
      deleteNode.position(this.transformer.findOne('.top-right').position());
    }
    else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  handleSelect = () => {

    this.handleSelected()

    if (this.state.selected === true) {
      this.checkNode()
      this.props.selectedImage(this.props.index);
    }
    else {
      this.props.selectedImage(null);
    }
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.crossOrigin = "anonymous";
    this.image.src = this.props.src;
    this.image.width = 300;
    this.image.width = 300;

    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    this.checkNode();
  }
  handleSelected = () => {
    this.setState(state => ({
      selected: !state.selected
    }))
  }
  render() {
    return (
      <React.Fragment>
        <Group draggable
          onClick={() => this.handleSelect()}
          onTouchStart={() => this.handleSelect()}
          ref={node => {
            this.imageNode = node;
          }}
        >

          <Image
            image={this.state.image}
            {...this.props.properties}
          />
        </Group>
        {this.state.selected &&
          <Group>

            <Transformer
              ref={node => {
                this.transformer = node;
              }}
              onTransformEnd={() => this.handleSelected()}
              onTransform={(e) => { this.deleteRef.current.position(e.currentTarget.findOne('.top-right').position()) }}
            />
            <CloseButton deleteRef={this.deleteRef} delete={this.props.deleteImage} />
          </Group>
        }


      </React.Fragment>
    )
  }
}
