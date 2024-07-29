import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CompanySearchForm from './CompanySearchForm';
import CompanySearchToolbar from './CompanySearchToolbar';
import CompanyTable from './CompanyTable';
import PaginationControls from './PaginationControls';
import './CompanySearch.css';
import useEndpoint from '../../hooks/useEndpoint';

const CompanySearch = () => {
  const { listId } = useParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [listDetails, setListDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [creatingNewList, setCreatingNewList] = useState(false);
  const [selectAllInSearch, setSelectAllInSearch] = useState(false);
  const webEndpoint = useEndpoint();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const endpoint = listId
          ? `${webEndpoint}/api/company-lists/${listId}/companies/`
          : `${webEndpoint}/api/companies/`;
        const response = await axios.get(endpoint, {
          params: {
            page: currentPage,
            page_size: pageSize,
            search: submittedQuery,
          },
        });
        setCompanies(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
        setTotalResults(response.data.count);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchCompanies();
  }, [currentPage, pageSize, listId, submittedQuery, webEndpoint]);

  useEffect(() => {
    if (listId) {
      const fetchListDetails = async () => {
        try {
          const response = await axios.get(`${webEndpoint}/api/company-lists/${listId}/`);
          setListDetails(response.data);
        } catch (error) {
          setError(error);
        }
      };

      fetchListDetails();
    }
  }, [listId]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
    setCurrentPage(1); // Reset to the first page on new search
    setSelectAllInSearch(false); // Clear select all in search option
    setSelectedCompanies([]); // Clear selected companies
  };

  const handleClear = () => {
    setSearchQuery('');
    setSubmittedQuery('');
    setCurrentPage(1); // Reset to the first page on clear
    setSelectAllInSearch(false); // Clear select all in search option
    setSelectedCompanies([]); // Clear selected companies
  };

  const handleSelectCompany = (companyId) => {
    setSelectedCompanies((prevSelected) => {
      if (prevSelected.includes(companyId)) {
        return prevSelected.filter((id) => id !== companyId);
      } else {
        return [...prevSelected, companyId];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCompanies(companies.map((company) => company.id));
    } else {
      setSelectedCompanies([]);
      setSelectAllInSearch(false);
    }
  };

  const handleSelectAllInSearch = () => {
    setSelectAllInSearch(true);
  };

  const fetchLists = async () => {
    try {
      const response = await axios.get(`${webEndpoint}/api/company-lists/`);
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  useEffect(() => {
    if (selectedCompanies.length > 0 || selectAllInSearch) {
      fetchLists();
    }
  }, [selectedCompanies, selectAllInSearch]);

  const handleAddToListSubmit = async (e) => {
    e.preventDefault();
    if (creatingNewList && newListName) {
      try {
        const response = await axios.post(`${webEndpoint}/api/company-lists/create-with-companies/`, {
          name: newListName,
          companies: selectAllInSearch ? [] : selectedCompanies, // Pass empty array for companies if selecting all in search
          search: selectAllInSearch ? submittedQuery : '', // Pass search query if selecting all in search
        });
        console.log(response);
        toast.success(
          <div>
            {response.data.message} <Link to={`/lists/${response.data.list_id}`}>{newListName}</Link>
          </div>
        );
      } catch (error) {
        toast.error('Error creating new list');
        console.error('Error creating new list:', error);
      }
    } else if (selectedList) {
      try {
        const response = await axios.post(`${webEndpoint}/api/company-lists/${selectedList}/add-companies/`, {
          company_ids: selectAllInSearch ? [] : selectedCompanies, // Pass empty array for company_ids if selecting all in search
          search: selectAllInSearch ? submittedQuery : '', // Pass search query if selecting all in search
        });
        console.log(response);
        toast.success(
          <div>
            {response.data.message} <Link to={`/lists/${selectedList}`}>Go to list</Link>
          </div>
        );
      } catch (error) {
        toast.error('Error adding companies to existing list');
        console.error('Error adding companies to existing list:', error);
      }
    }
    setSelectedCompanies([]);
    setSelectAllInSearch(false);
  };

  const handleCreatingNewListChange = (e) => {
    setCreatingNewList(e.target.checked);
    if (!e.target.checked) {
      setNewListName('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="company-search-container">
      <div className="company-search-header">
        <h1>{listId ? `Companies in List: ${listDetails?.name}` : 'Company Search'}</h1>
        {listId && <p>{listDetails?.description}</p>}
      </div>
      <CompanySearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleClear={handleClear}
      />
      <p className="results-count">Total Results: {totalResults}</p>
      {(selectedCompanies.length > 0 || selectAllInSearch) && (
        <CompanySearchToolbar
          selectedCompanies={selectedCompanies}
          selectAllInSearch={selectAllInSearch}
          totalResults={totalResults}
          creatingNewList={creatingNewList}
          newListName={newListName}
          setNewListName={setNewListName}
          handleCreatingNewListChange={handleCreatingNewListChange}
          handleAddToListSubmit={handleAddToListSubmit}
          handleSelectAllInSearch={handleSelectAllInSearch}
          lists={lists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      )}
      <CompanyTable
        companies={companies}
        selectedCompanies={selectedCompanies}
        handleSelectCompany={handleSelectCompany}
        handleSelectAll={handleSelectAll}
        selectAllInSearch={selectAllInSearch}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default CompanySearch;
