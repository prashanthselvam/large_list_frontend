import React from 'react';

const CompanySearchForm = ({ searchQuery, setSearchQuery, handleSearch, handleClear }) => {
  return (
    <form className="company-search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search by name or industry"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
};

export default CompanySearchForm;
