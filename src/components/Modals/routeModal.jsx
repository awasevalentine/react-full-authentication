import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteModal, {RouteModalHeader,RouteModalBody, RouteModalFooter } from "./routeAuthModal";




const Modal = (props) => {
    var {header, content } = props
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate()


    return ( 
        <>
        <RouteModal
                show={showModal}
                setShow={setShowModal}
            hideCloseButton
        >
            <RouteModalHeader>
                <h2 className="modal-header" style={{textAlign: 'center'}}>{header}</h2>
            </RouteModalHeader>
            <RouteModalBody>
                <p style={{ textAlign: 'center' }}>
                    {content}
                </p>
            </RouteModalBody>
            <RouteModalFooter style={{display: 'flex', justifyContent: 'center'}}>
                <div className="modal-btn-box">
                <button onClick={() => navigate('/') }>
                        Close
                </button>
                </div>

            </RouteModalFooter>
        </RouteModal>
        </>
     );
}
 
export default Modal;