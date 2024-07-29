import React from 'react';

const CompanySearchToolbar = ({
  selectedCompanies,
  selectAllInSearch,
  totalResults,
  creatingNewList,
  newListName,
  setNewListName,
  handleCreatingNewListChange,
  handleAddToListSubmit,
  handleSelectAllInSearch,
  lists,
  selectedList,
  setSelectedList
}) => {
  return (
    <div className="toolbar">
      {selectedCompanies.length === 50 && !selectAllInSearch && (
        <div>
          <button type="button" onClick={handleSelectAllInSearch}>Select all items in the search</button>
        </div>
      )}
      <form onSubmit={handleAddToListSubmit}>
        <div>
          <input
            type="checkbox"
            checked={creatingNewList}
            onChange={handleCreatingNewListChange}
          />
          <label>Create New List</label>
          {creatingNewList && (
            <input
              type="text"
              placeholder="New list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              required
            />
          )}
        </div>
        {!creatingNewList && (
          <div>
            <label>Select Existing List</label>
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              required
            >
              <option value="">-- Select a list --</option>
              {lists.map(list => (
                <option key={list.id} value={list.id}>{list.name}</option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Add to List</button>
        <span>{selectAllInSearch ? `All items in the search selected (${totalResults})` : `${selectedCompanies.length} items selected`}</span>
      </form>
    </div>
  );
};

export default CompanySearchToolbar;
