import React, { Component } from 'react'
import { Text, Transformer, Group } from "react-konva"
import CloseButton from "./CloseButton"
export default class CanvasText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHide: true,
        }

        this.deleteRef = React.createRef();
    }
    componentDidMount() {
        if (this.props.input.selected) {
            this.checkNode()
        }
    }
    textFieldOnDblClick = (e) => {
        // Seçili olan textin indexini atar
        const textNode = e.currentTarget.attrs;
        const absolutePosition = e.currentTarget.absolutePosition();
        this.setState({
            isHide: false
        })
        let areaPosition = { x:  absolutePosition.x-20, y:  absolutePosition.y +63 }
        var textarea = document.createElement('textarea');
        document.getElementById("canvasDiv").appendChild(textarea);

        textarea.value = textNode.text;
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.fontSize = textNode.fontSize + 'px';
        textarea.style.width = textNode.width - textNode.padding * 2 + 'px';
        textarea.style.height =
            textNode.height - textNode.padding * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight;
        textarea.style.fontFamily = textNode.fontFamily;
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align;
        textarea.style.color = "black";
        const rotation = textNode.rotation;
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }
        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;
        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';
        textarea.focus();

        textarea.onblur = () => {
            this.props.handleTextChange('text', textarea.value);
            document.getElementById("canvasDiv").removeChild(textarea);
            this.setState({
                isHide: true
            })
        }
        textarea.onTouchStart = () => {
            this.props.handleTextChange('text', textarea.value);
            document.getElementById("canvasDiv").removeChild(textarea);
            this.setState({
                isHide: true
            })
        }
        if (this.transformer) this.transformer.detach();
        // Silinecek nodun atamasını yapar
        this.props.selectedText(this.props.index, textarea)
    }
    textFieldOnClick = (e) => {
        this.handleSelected()
        if (this.props.input.selected === true) {
            this.checkNode();
            this.props.selectedText(this.props.index, null);
        }
        else {
            this.props.selectedText(null);
        }
    }
    checkNode() {
        const selectedNode = this.textNode;
        const deleteNode = this.deleteRef.current;
        this.transformer.add(deleteNode)
        if (this.props.input.selected) {
            this.transformer.nodes([selectedNode]);
            deleteNode.position(this.transformer.findOne('.top-right').position())

        }
        else {
            this.transformer.detach();
        }
        this.transformer.getLayer().batchDraw();
    }
    handleSelected = () => {
        this.props.input.selected = !this.props.input.selected;
        this.forceUpdate();
    }
    render() {
        return (
            <React.Fragment>

                <Text
                    draggable
                    ref={node => {
                        this.textNode = node;
                    }}
                    onClick={(e) => this.textFieldOnClick(e)}
                    onTouchStart={(e) => this.textFieldOnClick(e)}
                    visible={this.state.isHide}
                    {...this.props.input}
                    onDblClick={(e) => this.textFieldOnDblClick(e)}
                    onDblTap={(e) => this.textFieldOnDblClick(e)}
                    onDragEnd={e => this.props.handleDragEnd(e.currentTarget.attrs, this.props.index)}
                />

                {
                    this.props.input.selected &&
                    <Group>
                        <Transformer
                            ref={node => {
                                this.transformer = node;
                            }}
                            onTransform={(e) => { this.deleteRef.current.position(e.currentTarget.findOne('.top-right').position()) }}
                            onTransformEnd={(e) => {

                                this.props.handleTextChange('scaleX', e.target.attrs.scaleX);
                                this.props.handleTextChange('scaleY', e.target.attrs.scaleY);
                            }}
                        />
                        <CloseButton deleteRef={this.deleteRef} delete={this.props.deleteText} />
                    </Group>
                }

            </React.Fragment>
        )


    }
}
