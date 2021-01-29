import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <span className="modal__close" onClick={props.onCancel}></span>
        <h2>{props.header}</h2>
      </header>
      <div
        className={`modal__content ${props.contentClass}`}
        style={props.contentStyle}
      >
        {props.children}
      </div>
      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.show && (
        <div
          className="modal__backdrop"
          style={{ zIndex: props.index || 30 }}
          onClick={() => {
            console.log("Backdrop clicked");
            props.onCancel();
          }}
        ></div>
      )}
      <CSSTransition
        in={props.show}
        timeout={300}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
