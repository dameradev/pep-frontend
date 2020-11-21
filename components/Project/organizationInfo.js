import React from 'react';

const OrganizationInfo = ({ name, email, organizationProfile }) => {
  return (
    <div className="project__organization">
      <div className="header">
        <p className="header__hint">Project made by</p>
        <img src="https://www.logogenie.net/download/preview/medium/5319421" />
        <h2>{name}</h2>
        <p className="slogan">{organizationProfile.slogan}</p>
      </div>
      <div className="buttons-container">
        <button>Our Projects</button>
        <button>View Profile</button>
      </div>
      <div className="contact">
        <div className="contact__responsible-person">
          <h3>Responsible person</h3>
          <p>{organizationProfile.responsiblePerson}</p>
        </div>
        <div className="contact__email">
          <h3>Email</h3>
          <p>{email}</p>
        </div>
        <div className="contact__phone">
          <h3>Phone</h3>
          <p>{organizationProfile.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
