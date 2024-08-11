import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const CalendarModal = ({ addEvent }, props) => {
  const location = useLocation();
  const neweventName = location.state?.eventName;
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState(neweventName);
  const [category, setCategory] = useState(null);
  const user = useSelector((state) => state.user.user);

  // console.log("Location state:", location.state);
  // console.log("Event name:", eventName);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (eventName && selectedDate && category) {
        response = await axios.post(
          "http://localhost:5000/api/addEvent",
          {
            eventData: {
              title: eventName,
              start: selectedDate,
              className: category.value,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const savedEvent = response.data;

        addEvent({
          title: savedEvent.title,
          start: savedEvent.selectedDate,
          className: savedEvent.className,
        });
        setEventName("");
        setSelectedDate(null);
        setCategory(null);
// TODO: just for now even tho its disgusting
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const selectActive = [
    { label: "Danger", value: "bg-danger" },
    { label: "Success", value: "bg-success" },
    { label: "Purple", value: "bg-purple" },
    { label: "Primary", value: "bg-primary" },
    { label: "Pink", value: "bg-pink" },
    { label: "Info", value: "bg-info" },
    { label: "Inverse", value: "bg-inverse" },
    { label: "Orange", value: "bg-orange" },
    { label: "Brown", value: "bg-brown" },
    { label: "Teal", value: "bg-teal" },
    { label: "Warning", value: "bg-warning" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  return (
    <>
      <div id="add_event" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Event</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Event Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Event Date{" "}
                    <span className="text-danger">for {eventName}</span>
                  </label>
                  <div className="cal-icon">
                    <DatePicker
                      className="form-control w-100"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd-MM-yyyy HH:mm"
                      showTimeSelect
                      required
                    />
                  </div>
                </div>
                <div className="input-block mb-3">
                  <label className="control-label col-form-label">
                    Category
                  </label>
                  <Select
                    options={selectActive}
                    value={category}
                    onChange={setCategory}
                    placeholder="Select Category"
                    styles={customStyles}
                    required
                  />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarModal;
