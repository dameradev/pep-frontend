import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-apollo';

import { MenuItem, TextField } from '@material-ui/core';

import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@material-ui/icons';
import { ApplicantsStyles } from './styles';

import { CHANGE_APPLICANT_STATUS_MUTATION } from '../../lib/mutations';

const statuses = ['pending', 'accepted', 'rejected'];

const Applicants = ({ applicants: propsApplicants, projectId, questions }) => {
  const applicants = propsApplicants.sort((a, b) => a.id - b.id);

  const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]?.id);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [statusChanged, setStatusChanged] = useState(false);

  console.log(applicants);

  const [changeApplicantStatus, { data, loading: statusLoading }] = useMutation(
    CHANGE_APPLICANT_STATUS_MUTATION,
    {
      variables: {
        projectId: projectId,
        applicantId: applicants.find((item) => item.id === selectedApplicant)?.id,
        userId: applicants.find((item) => item.id === selectedApplicant)?.applicant.id,
        status: currentStatus.toUpperCase(),
      },
    }
  );
  useEffect(() => {
    if (statusChanged) {
      changeApplicantStatus();
    }
  }, [currentStatus, statusChanged]);

  const handleClick = (id) => {
    setSelectedApplicant(selectedApplicant === id ? null : id);
    setStatusChanged(false);

    setTimeout(() => {
      window.scrollTo(0, document.getElementById(`applicant-${id}`).offsetTop - 100);
    }, 600);
  };
  return (
    <ApplicantsStyles>
      <div className="applicants__header">
        <h2>Applicants for project</h2>
        <p>Current applicants {applicants.length}</p>
      </div>
      <ul className="applicants__list">
        {applicants.map(({ id, status, applicant: { name } }) => {
          // console.log(status,);
          return (
            <li key={id} id={`applicant-${id}`}>
              <div
                className={`applicants__list-item ${status.toLowerCase()} ${
                  selectedApplicant === id && 'selected'
                }`}
                onClick={() => {
                  handleClick(id);
                }}
              >
                {window.innerWidth < 849 && (
                  <>
                    <ExpandMoreIcon className="expand expand-more" />
                    <ExpandLessIcon className="expand expand-less" />
                  </>
                )}
                {/* </p> */}
                <h3>{name}</h3>
                <p>{status}</p>
              </div>

              {window.innerWidth < 849 && (
                <SelectedApplicant
                  isSelected={selectedApplicant === id && 'selected'}
                  selectedApplicant={applicants.find((item) => item.id === selectedApplicant)}
                  setCurrentStatus={setCurrentStatus}
                  setStatusChanged={setStatusChanged}
                  statusLoading={statusLoading}
                  questions={questions}
                />
              )}
            </li>
          );
        })}
      </ul>
      {window.innerWidth > 849 && (
        <SelectedApplicant
          selectedApplicant={applicants.find((item) => item.id === selectedApplicant)}
          setCurrentStatus={setCurrentStatus}
          setStatusChanged={setStatusChanged}
          statusLoading={statusLoading}
          questions={questions}
        />
      )}
    </ApplicantsStyles>
  );
};

const SelectedApplicant = ({
  selectedApplicant: {
    applicant: { name, nationality } = {},
    foodPreference,
    status,
    answers,
    // motivation,
    // reason,
    // afterProject,
  } = {},
  questions,
  setCurrentStatus,
  setStatusChanged,
  isSelected,
  statusLoading,
}) => {
  const formatOption = (option) => {
    let optionToDisplay = null;
    switch (option) {
      case 'pending':
        optionToDisplay = 'Set pending';
        break;
      case 'accepted':
        optionToDisplay = 'Accept';
        break;
      case 'rejected':
        optionToDisplay = 'Reject';
    }
    return optionToDisplay;
  };
  return (
    <div className={`selected-applicant ${isSelected && 'selected-applicant__displayed'}`}>
      <div className="selected-applicant__name">
        <h3>Name</h3>
        <p>{name}</p>
      </div>
      <div className="selected-applicant__nationality">
        <h3>Nationality</h3>
        <p>{nationality}</p>
      </div>
      <div className="selected-applicant__food">
        <h3>Food preference</h3>
        {foodPreference?.map((foodItem) => (
          <p>{foodItem}</p>
        ))}
      </div>
      <div className={`selected-applicant__status ${status?.toLowerCase()}`}>
        <div>
          <h3>Status</h3>
          <p className="display-status">{status}</p>
        </div>
        {status && (
          <TextField
            className="form__select"
            id="input"
            select
            label="Change applicant status"
            name="currentStatus"
            value={status.toLowerCase()}
            onChange={(e) => {
              setCurrentStatus(e.target.value);
              setStatusChanged(true);
            }}
            disabled={statusLoading}
            helperText="Accept or reject participant"
          >
            {statuses.map((option) => {
              const optionToDisplay = formatOption(option);

              return (
                <MenuItem key={option} value={option}>
                  {optionToDisplay}
                </MenuItem>
              );
            })}
          </TextField>
        )}
      </div>
      {console.log(questions)}
      {questions?.map((question, index) => (
        <div className="selected-applicant__question">
          <h3>{question}</h3>
          <p>{answers?.[index]}</p>
        </div>
      ))}

      {/* <div className="selected-applicant__motivation">
        <h3>Motivation</h3>
        <p>{motivation}</p>
      </div>
      <div className="selected-applicant__reason">
        <h3>Reason</h3>
        <p>{reason}</p>
      </div>
      <div className="selected-applicant__after">
        <h3>After project</h3>
        <p>{afterProject}</p>
      </div> */}
    </div>
  );
};

export default Applicants;
