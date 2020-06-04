import React, { useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import "./Error.css";

export default function Error() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return {
    setOpen,
    setMessage,
    modal: (
      <Modal open={open} className={"error-modal"}>
        <Modal.Content>
          <div className="error-modal-container">
            <Icon name='desktop' size="huge" />
            <Modal.Description>
              <h3 className="error-modal-header">
                Uh oh ... There&apos;s been an error
              </h3>
              <div className="error-modal-content">{message}</div>
              <Button
                secondary
                className="error-modal-button"
                onClick={() => setOpen(false)}
              >
                GOT IT
              </Button>
            </Modal.Description>
          </div>
        </Modal.Content>
      </Modal>
    ),
  };
}
