// LIBRARY
import React from "react";
//COMPONENTS
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Saving from "components/Appointment/Saving";
import EditError from "components/Appointment/EditError";
import DeleteError from "components/Appointment/DeleteError";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import Delete from "components/Appointment/Deleting";
import useVisualMode from "../../hooks/useVisualMode";
// STYLES
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const EDIT = "EDIT";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const SAVING = "SAVING";
const DELETING = "DELETING";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  function deleteInterview() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Saving message={"Saving"} />}
      {mode === DELETING && <Delete message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete"}
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <EditError
          message={"Unable to schedule your appointment"}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <DeleteError
          message={"Unable to delete your appointment"}
          onClose={back}
        />
      )}
    </article>
  );
}
