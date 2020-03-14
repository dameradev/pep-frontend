import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

const Wrapper = styled.div`
  .react-datepicker__input-container input {
    width: 100%;
    display: block !important;
    background: black;
  }
  /* .react-datepicker__month-container {
    display: flex;
  } */
`;

// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';

const DatePickerInput = props => (
  <Wrapper>
    <DatePicker selected={props.value} onChange={props.onChange} />
  </Wrapper>
);

export default DatePickerInput;
