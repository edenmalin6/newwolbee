import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import axios from "axios";
import CalendarModal from "../../../../../components/modelpopup/CalendarModal";
import { useLocation } from "react-router-dom";

const Calendar = (props) => {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const linkRef = useRef(null);
  const eventName = location.state?.eventName;
  const openModal = location.state?.openModal;
  console.log("Location state:", location.state); // הדפס את ערך ה-state של המיקום
  console.log("Event name:", eventName); // הדפס את שם האירוע

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&mod=on&geo=none&year=now&m=50"
        );
        const hebrewEvents = response.data.items.map((event) => ({
          title: event.title,
          start: event.date,
          className: "bg-warning",
        }));
        setEvents([...defaultEvents, ...hebrewEvents]);
      } catch (error) {
        console.error("Error fetching Hebrew events:", error);
      }
    };
    fetchEvents();
  }, []);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const defaultEvents = [
    {
      title: "birthday for justin",
      start: new Date(Date.now() + 148000000),
      className: "bg-purple",
    },
    {
      title: "birthday for brad",
      start: new Date(Date.now()),
      end: new Date(Date.now()),
      className: "bg-success",
    },
    {
      title: "birthday for Lisa ",
      start: new Date(Date.now() + 168000000),
      className: "bg-info",
    },
    {
      title: "planning meeting",
      start: new Date(Date.now() + 338000000),
      className: "bg-info",
    },
  ];

  useEffect(() => {
    if (openModal && linkRef.current) {
      linkRef.current.click();
    }
  }, [openModal]);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Calendar</h3>
              <ul className="breadcrumb">
                {/* <li className="breadcrumb-item">
                  <Link to="admin-dashboard">Dashboard</Link>
                </li> */}
                {/* <li className="breadcrumb-item active">Events</li> */}
              </ul>
            </div>
            <div className="col-auto float-end ms-auto">
              <Link
                to="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_event"
                ref={linkRef}
              >
                <i className="fa-solid fa-plus" /> Add Event
              </Link>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    {/* Calendar */}
                    <div id="calendar" />
                    <FullCalendar
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                      ]}
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                      }}
                      initialView="dayGridMonth"
                      editable={true}
                      selectable={true}
                      selectMirror={true}
                      dayMaxEvents={true}
                      weekends={true}
                      events={events}
                      dateClick={(arg) => {
                        const title = prompt("Enter event title:");
                        if (title) {
                          addEvent({
                            title,
                            start: arg.date,
                            className: "bg-success",
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalendarModal addEvent={addEvent} />
    </div>
  );
};

export default Calendar;
