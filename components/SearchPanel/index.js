import React, { Component } from "react";
import Select from "react-select";

import styled from "styled-components";


const Panel = styled.div`
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  background-color: #fff;
  border-radius: 7px;
  min-height:90vh;
  /* padding: 20px; */

  .Header {
    border-bottom: 1px solid #ccc;
    padding: 20px;
    font-size: 2rem;
  }
`;


export default class SearchPanel extends Component {
  render () {
    return (
    <Panel>
      <div className="Header">
        <h3> Search filters </h3>
        <div className="filters-container">
          <Select
          
          />
        </div>
      </div>
    </Panel>)
  }

}

