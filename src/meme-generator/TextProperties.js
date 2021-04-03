import React from "react";
import { Form, Row, Col, Accordion, Card, Button } from "react-bootstrap";
const fontFamilies = [
  "Impact",
  "Arial",
  "Times New Roman",
  "Georiga",
  "Verdana",
  "Lucida Console",
];
const TextProperties = ({ text, handleTextChange }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Control
          as="textarea"
          name="text"
          value={text.text}
          placeholder="enter text"
          onChange={(e) => handleTextChange(e.target.name, e.target.value)}
        />
      </Form.Group>
      <Row>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Font </Form.Label>
            <Form.Control
              type="number"
              name="fontSize"
              value={text.fontSize}
              onChange={(e) =>
                handleTextChange(e.target.name, Number(e.target.value))
              }
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Text Color</Form.Label>
            <Form.Control
              type="color"
              name="fill"
              value={text.fill}
              onChange={(e) => handleTextChange(e.target.name, e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Stroke Width</Form.Label>
            <Form.Control
              type="number"
              value={text.strokeWidth}
              name="strokeWidth"
              onChange={(e) =>
                handleTextChange(e.target.name, Number(e.target.value))
              }
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Stroke</Form.Label>
            <Form.Control
              type="color"
              name="stroke"
              value={text.stroke}
              onChange={(e) => handleTextChange(e.target.name, e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  More option for text
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Padding</Form.Label>
                        <Form.Control
                          type="number"
                          name="padding"
                          value={text.padding}
                          onChange={(e) =>
                            handleTextChange(
                              e.target.name,
                              Number(e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Letter Spacing</Form.Label>
                        <Form.Control
                          type="number"
                          name="letterSpacing"
                          value={text.letterSpacing}
                          onChange={(e) =>
                            handleTextChange(
                              e.target.name,
                              Number(e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>line Height</Form.Label>
                        <Form.Control
                          type="number"
                          name="lineHeight"
                          value={text.lineHeight}
                          onChange={(e) =>
                            handleTextChange(
                              e.target.name,
                              Number(e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Font Family </Form.Label>
                        <Form.Control
                          as="select"
                          value={text.fontFamily}
                          name="fontFamily"
                          onChange={(e) =>
                            handleTextChange(e.target.name, e.target.value)
                          }
                        >
                          <option></option>
                          {fontFamilies.map((font) => (
                            <option value={font} key={font}>
                              {font}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Align</Form.Label>
                        <Form.Control
                          as="select"
                          value={text.align}
                          name="align"
                          onChange={(e) =>
                            handleTextChange(e.target.name, e.target.value)
                          }
                        >
                          <option></option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                          <option value="left">Left</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label>Decoration</Form.Label>
                        <Form.Control
                          as="select"
                          value={text.textDecoration}
                          name="textDecoration"
                          onChange={(e) =>
                            handleTextChange(e.target.name, e.target.value)
                          }
                        >
                          <option></option>
                          <option value="">Normal</option>
                          <option value="line-through">line-through</option>
                          <option value="underline">underline</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>opacity</Form.Label>
                        <Form.Control
                          type="range"
                          min={1}
                          max={2}
                          name="opacity"
                          step={0.05}
                          value={String(2 - text.opacity)}
                          onChange={(e) =>
                            handleTextChange(
                              e.target.name,
                              Number(2 - e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Shadow Blur</Form.Label>
                        <Form.Control
                          type="number"
                          name="shadowBlur"
                          value={text.shadowBlur}
                          onChange={(e) =>
                            handleTextChange(
                              e.target.name,
                              Number(e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>shadow Color</Form.Label>
                        <Form.Control
                          type="color"
                          name="shadowColor"
                          value={text.shadowColor}
                          onChange={(e) => {
                            handleTextChange(e.target.name, e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Shadow Opacity</Form.Label>
                        <Form.Control
                          type="range"
                          min={1}
                          max={2}
                          name="shadowOpacity"
                          step={0.05}
                          value={String(2 - text.shadowOpacity)}
                          onChange={(e) =>
                            handleTextChange(
                              e.target.name,
                              Number(2 - e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Form>
  );
};

TextProperties.defaultProps = {
  text: {
    fontSize: 0,
    strokeWidth: 0,
    shadowBlur: 0,
    padding: 0,
    letterSpacing: 0,
    lineHeight: 0,
    fill: "#000000",
    shadowColor: "#000000",
    stroke: "#000000",
  },
};

export default TextProperties;
