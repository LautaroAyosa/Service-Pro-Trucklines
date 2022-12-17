import React from "react";

const Modal = ({title, body, confirm}) => {

    return (
        <div className="modal fade" id="confirm-delete" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        Are you sure you want to delete this?
                    </div>
                    <div className="modal-body">
                        
                    </div>
                    <div className="modal-footer">
                        <a className="btn btn-primary btn-ok"></a>
                        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal