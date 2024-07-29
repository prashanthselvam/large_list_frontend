import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import useEndpoint from '../hooks/useEndpoint';

const CompanyListView = () => {
  const [companyLists, setCompanyLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const webEndpoint = useEndpoint();

  useEffect(() => {
    const fetchCompanyLists = async () => {
      try {
        const response = await axios.get(`${webEndpoint}/api/company-lists/`);
        setCompanyLists(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCompanyLists();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Company Lists</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {companyLists.map((list, index) => (
            <tr key={list.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/lists/${list.id}`}>{list.name}</Link>
              </td>
              <td>{list.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyListView;
