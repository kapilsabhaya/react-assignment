import React, { useState } from 'react';
import Subordinate from './Subordinate';

function Director() {
  const [subordinateList, setsubordinateList] = useState([]);

  const addSubordinate = () => {
    setsubordinateList([
      ...subordinateList,
      { id: subordinateList.length + 1, members: [] },
    ]);
  };

  return (
    <div className="card p-3 my-3 Director">
      <div
        className="btn-group dropend text-center border rounded-1 position-relative d-flex justify-content-center align-items-center mx-auto"
        style={{ width: '150px', height: '70px' }}
      >
        <h5 className="card-title">Director</h5>
        <button
          style={{
            position: 'absolute',
            right: '10px',
            bottom: '0px',
            border: 'none',
            backgroundColor: 'transparent',
          }}
          className="fs-4"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          ...
        </button>
        <ul
          className="dropdown-menu text-center director-dropdown-menu"
          style={{ width: '250px' }}
        >
          <li>
            <div
              className="px-2"
              style={{ cursor: 'pointer' }}
              onClick={addSubordinate}
            >
              Add a New Subordinate Branch
            </div>
          </li>
        </ul>
      </div>
      {/* <div className="text-center mb-3">
                <button className="btn btn-primary" onClick={addSubordinate}>Add Subordinate</button>
            </div> */}
      <div className="row pt-4">
        {subordinateList?.map((subordinate, index) => (
          <div className="col-12 col-md-6 mb-3" key={index}>
            <Subordinate id={subordinate.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Director;
