import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import DataCard from "../component/DataCard";
import { FiPlus } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
const [data, setdata] = useState({});
const [isupdate, setisupdate] = useState(false);
console.log("selected data is ", data)

  const [task_to_do, settask_to_do] = useState([]);
  const [task_in_progress, settask_in_progress] = useState([]);
  const [task_done, settask_done] = useState([]);

  const [select, setselect] = useState(false);
  console.log("select value", select);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setdiscription("");
    setstatus("");
    setdate("");
  };
  const handleShow = () => setShow(true);

  // / to store data

  const [discription, setdiscription] = useState("");
  const [status, setstatus] = useState("");
  const [date, setdate] = useState("");

  const [refresh, setrefresh] = useState(false);
  const handleClick = () => {
    // Retrieve existing data from local storage
    const existingData = localStorage.getItem("Data");
    const parsedData = existingData ? JSON.parse(existingData) : [];
    // Create a new comment object
    const newData = {
      description: discription,
      status: status,
      date: date,
    };

    // Append the new comment to the existing data
    parsedData.push(newData);

    // Store the updated data in the local storage
    const updatedData = JSON.stringify(parsedData);
    localStorage.setItem("Data", updatedData);

    handleClose();
    setrefresh(!refresh);
  };

  useEffect(() => {
    let to_do = [];
    let inprogress = [];
    let done_task = [];
    const get_date = localStorage.getItem("Data");
    const data_is = get_date ? JSON.parse(get_date) : null;
    console.log("data is", data_is);
    if (data_is && data_is.length !== 0) {
      to_do = data_is.filter((v) => v.status === "TO DO");
      inprogress = data_is.filter((v) => v.status === "IN PROGRESS");
      done_task = data_is.filter((v) => v.status === "TASK DONE");
    }

    settask_to_do(to_do);
    settask_in_progress(inprogress);
    settask_done(done_task);
  }, [refresh]);

  useEffect(() => {
    if (select === true) {
      setisupdate(true);
      setdiscription(data.discription);
      setdate(data.date);
      setstatus(data.status);
      handleShow();
    }
  }, [select]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (discription === "") {
              alert("Please Enter Some thing");
            } else if (status === "") {
              alert("Please Select Task Status");
            } else if (date === "") {
              alert("Please Select Date");
            } else {
              handleClick();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a Task for the team </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <lebal>Add Ask Discription</lebal>
              <br />
              <textarea
                value={discription}
                onChange={(val) => {
                  setdiscription(val.target.value);
                }}
                style={{ width: "100%", minHeight: "150px" }}
              />
            </div>

            <div>
              <label>Select Task Status</label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <input
                    onClick={() => {
                      setstatus("TO DO");
                    }}
                    name="status"
                    type="radio"
                    checked={status === "TO DO"}

                  />
                  <label>to do</label>
                </span>

                <span>
                  <input
                    onClick={() => {
                      setstatus("IN PROGRESS");
                    }}
                    name="status"
                    type="radio"
                    checked={status === "IN PROGRESS"}

                  />
                  <label>in progress</label>
                </span>

                <span>
                  <input
                    onClick={() => {
                      setstatus("TASK DONE");
                    }}
                    name="status"
                    type="radio"
                    checked={status === "TASK DONE"}
                  />
                  <label>task done</label>
                </span>
              </div>

              <div>
                <label>Due Date</label>
                <br />
                <input
                value={date}
                  onChange={(val) => {
                    setdate(val.target.value);
                  }}
                  type="date"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={() => {
                // handleClose();
              }}
            >
              {isupdate ? "Update Task" : "Create Task"} 
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Top Bar */}
      <div style={{ background: "rgb(211 201 196)" }}>
        <div className="top_bar">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
            }}
          >
            <div className="craete_btn_container">
              <button
                className="craete_btn"
                onClick={handleShow}
              >
                {" "}
                <span>
                  <FiPlus />
                </span>
                Create Task
              </button>
            </div>

            <div
              className="search_bar"
            >
              <input className="input_box"  placeholder="Search your quary" />
              <button

                className="search_btn"
              >
                <BiSearchAlt />
              </button>
            </div>
          </div>

          {/* user image and name */}
          <div className="pfofile">
            <div className="name"
             
            >
              <p>{" "} {" "}karan kumar Rajak</p>
            </div>
            <div  className="image" >
              <img
                style={{ borderRadius: "50px" }}
                width="50px"
                height="45px"
                src="data:image/jpeg;base64,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"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            marginTop: "",
            borderRight: "2px solid black",
            margin: "50px 20px 5px 20px",
          }}
        >
          <img
            src="https://dirums.com/images/logo%20and%20bird.webp"
            width="130px"
            height="90px"
          />
        </div>
        <h3>
          <b>Website Devlopment Tracker</b>
        </h3>
      </div>

      <div className="main_container">
        {/* Task To DO */}
        <div className="card">
          <h3 className="card_header">
            <b>Task To Do</b>
          </h3>
          <div style={{ margin: "10px" }}>
            {task_to_do && task_to_do.length === 0 ? (
              <div>No Data Found</div>
            ) : (
              <>
                {task_to_do.map((itm, idx) => {
                  let data = idx % 2 === 0;
                  return (
                    <DataCard
                      color={data ? "#ff6868" : "#63f2e3"}
                      discription={itm.description}
                      date={itm.date}
                      status={itm.status}
                      click_item={select}
                      setclick_item={setselect}
                      setdata={setdata}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Task IN PROGRESS */}

        <div className="card">
          <h3 className="card_header">
            <b>In Progress</b>
          </h3>
          <div style={{ margin: "10px" }}>
            {task_in_progress && task_in_progress.length === 0 ? (
              <div>No Data Found</div>
            ) : (
              <>
                {task_in_progress.map((itm, idx) => {
                  let data = idx % 2 === 0;
                  return (
                    <DataCard
                      color={data ? "#49c149" : "#f6bf5b"}
                      discription={itm.description}
                      date={itm.date}
                      status={itm.status}
                      click_item={select}
                      setclick_item={setselect}
                      setdata={setdata}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Tasks DONE */}

        <div className="card">
          <h3 className="card_header">
            <b>Task Done</b>
          </h3>
          <div style={{ margin: "10px" }}>
            <>
              {task_done && task_done.length === 0 ? (
                <div>Data Not Found</div>
              ) : (
                <>
                  {task_done.map((itm, idx) => {
                    let data = idx % 2 === 0;
                    return (
                      <DataCard
                        color={data ? "rgb(110 204 232)" : "rgb(226 217 201)"}
                        discription={itm.description}
                        date={itm.date}
                        status={itm.status}
                        click_item={select}
                        setclick_item={setselect}
                        setdata={setdata}
                      />
                    );
                  })}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
