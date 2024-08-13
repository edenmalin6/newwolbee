import React from "react";
import { Link } from "react-router-dom";

const DeleteModal = (props) => {
  //employee id
  //who can delete a user?
  //
  const deleteEmployee = () => {};
  return (
    <>
      {/* Delete Performance Indicator Modal */}
      <div className="modal custom-modal fade" id="delete" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>{props.Name}</h3>
                <p>Are you sure want to delete this employee?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <button
                      data-bs-dismiss="modal"
                      onClick={deleteEmployee}
                      className="btn btn-primary continue-btn"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      to="#"
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Performance Indicator Modal */}
    </>
  );
};

export default DeleteModal;
