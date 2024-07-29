import React from 'react';

const CompanyTable = ({
  companies,
  selectedCompanies,
  handleSelectCompany,
  handleSelectAll,
  selectAllInSearch,
  currentPage,
  pageSize
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectAllInSearch || (selectedCompanies.length === companies.length && selectedCompanies.length > 0)}
            />
          </th>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Year Founded</th>
          <th>Industry</th>
          <th>Website</th>
          <th>Headquarters</th>
          <th>Number of Employees</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => (
          <tr key={company.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedCompanies.includes(company.id) || selectAllInSearch}
                onChange={() => handleSelectCompany(company.id)}
              />
            </td>
            <td>{(currentPage - 1) * pageSize + index + 1}</td>
            <td>{company.name}</td>
            <td>{company.description}</td>
            <td>{company.year_founded}</td>
            <td>{company.industry}</td>
            <td><a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></td>
            <td>{company.headquarters}</td>
            <td>{company.num_employees}</td>
            <td>{company.revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompanyTable;
