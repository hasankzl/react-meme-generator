import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const Download = (props) => {
  const [show, setShow] = useState(false);
  const [dataURL, setDataURL] = useState("");
  const [fileName, setFileName] = useState("");

  const downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const download = () => {
    var dataURL = props.dataURL();
    downloadURI(dataURL, fileName);
    setShow(false);
  };

  const handleChange = (e) => {
    setFileName(e.target.value);
  };

  const openModal = () => {
    setShow(!show);
    setDataURL(props.dataURL());
  };

  return (
    <div>
      <Button className="download-button" onClick={() => openModal()}>
        Download File
      </Button>
      <Modal show={show} onHide={() => setShow(!show)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Download File</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="text-center">
            <img
              src={dataURL}
              alt="meme"
              width={props.stageWidth}
              height={props.stageHeight}
            />
          </div>
          <Form className="p-2">
            <Form.Group>
              <Form.Label>File Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                required
                value={fileName}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              onClick={() => download()}
              block
            >
              Download File
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Download;
