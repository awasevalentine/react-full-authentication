import { useEffect, useRef } from 'react';
import './css/modal.scss'
import '../Modals/css/modal.scss'
import { useNavigate } from 'react-router-dom';



const RouteModal = props => {
    const modalRef = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        const clickOutsideContent = (e) => {
            if (e.target === modalRef.current) {
                props.setShow(false);
                navigate('/')
            }
        };
        window.addEventListener('click', clickOutsideContent);
        return () => {
            window.removeEventListener('click', clickOutsideContent);
        };
    }, [props]);

    return <div ref={modalRef} className={`modal ${props.show ? 'active' : ''}`}>
        <div className="modal__content">
            {
                !props.hideCloseButton && <span onClick={() => props.setShow(false)} className="modal__close">
                    &times;
                </span>
            }
            {props.children}
        </div>
    </div>;
};

export default RouteModal;

export const RouteModalHeader = props => {
    return <div className="modal__header">
        {props.children}
    </div>
}

export const RouteModalBody = props => {
    return <div className="modal__body">
        {props.children}
    </div>
}

export const RouteModalFooter = props => {
    return <div className="modal__footer">
        {props.children}
    </div>
}