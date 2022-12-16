import React from "react";

const Modal = ({title, body, confirm}) => {

    return (
        <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        {title}
                    </div>
                    <div class="modal-body">
                        {body}
                    </div>
                    <div class="modal-footer">
                        <a class="btn btn-primary btn-ok">{confirm.message}</a>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal