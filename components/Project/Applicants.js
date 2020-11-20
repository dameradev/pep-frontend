import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-apollo';

import { MenuItem, TextField } from '@material-ui/core';
import { ApplicantsStyles } from './styles';

import { CHANGE_APPLICANT_STATUS_MUTATION } from '../../lib/mutations';

const statuses = ['pending', 'accepted', 'rejected'];

const Applicants = ({ applicants: propsApplicants, projectId }) => {
  const [selectedApplicant, setSelectedApplicant] = useState(1);

  const applicants = propsApplicants.sort((a, b) => a.id - b.id);

  const {
    motivation,
    reason,
    foodPreference,
    status,
    afterProject,
    id,
    applicant: { name, nationality, id: userId },
  } = applicants[selectedApplicant - 1];
  const [currentStatus, setCurrentStatus] = useState(status);
  const [statusChanged, setStatusChanged] = useState(false);

  const [changeApplicantStatus, { data, loading }] = useMutation(CHANGE_APPLICANT_STATUS_MUTATION, {
    variables: {
      projectId: projectId,
      applicantId: applicants[selectedApplicant - 1].id,
      userId: applicants[selectedApplicant - 1].applicant.id,
      status: currentStatus.toUpperCase(),
    },
  });

  useEffect(() => {
    if (statusChanged) {
      changeApplicantStatus();
    }
  }, [currentStatus, statusChanged]);

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
    <ApplicantsStyles>
      <div className="applicants__header">
        <h2>Applicants for project</h2>
        <p>Current applicants {applicants.length}</p>
      </div>
      <ul className="applicants__list">
        {applicants.map(({ id, status, applicant: { name } }) => (
          <li
            className={`applicants__list-item ${status.toLowerCase()} ${
              selectedApplicant === id && 'selected'
            }`}
            onClick={() => {
              setSelectedApplicant(id);
              setStatusChanged(false);
            }}
          >
            <h3>{name}</h3>
            <p>{status}</p>
          </li>
        ))}
      </ul>
      <div className="selected-applicant">
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
          {foodPreference.map((foodItem) => (
            <p>{foodItem}</p>
          ))}
        </div>
        <div className={`selected-applicant__status ${status.toLowerCase()}`}>
          <div>
            <h3>Status</h3>
            <p className="display-status">{status}</p>
          </div>
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
        </div>
        <div className="selected-applicant__motivation">
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
        </div>
      </div>
    </ApplicantsStyles>
  );
};

export default Applicants;
