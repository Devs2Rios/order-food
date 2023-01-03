import { createPortal } from 'react-dom';
import { useContext } from 'react';
import { ModalContext } from '../../store/modal-context';
import classes from '../../styles/Modal.module.css';

const Backdrop = () => {
    const modalctx = useContext(ModalContext);
    return (
        <div className={classes.backdrop} onClick={modalctx.handleMount}></div>
    );
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlay-root');

export default function Modal(props) {
    const modalctx = useContext(ModalContext);
    return (
        <>
            {modalctx.mounted && (
                <>
                    {createPortal(<Backdrop />, portalElement)}
                    {createPortal(
                        <ModalOverlay>{props.children}</ModalOverlay>,
                        portalElement
                    )}
                </>
            )}
        </>
    );
}
