import { useState } from 'react';
import BranchMember from './BranchMember';
import { FaCirclePlus } from 'react-icons/fa6';
import PropTypes from 'prop-types';

function Subordinate({ id }) {
  const [memberList, setMemberList] = useState([]);
  const [subBranchesList, setSubBranchesList] = useState([]);

  const addMember = () => {
    setMemberList([...memberList, memberList?.length + 1]);
  };

  const addSubBranch = () => {
    setSubBranchesList([
      ...subBranchesList,
      { id: `${id}/${subBranchesList?.length + 1}` },
    ]);
  };

  return (
    <div className="card p-3 mb-3 Subordinate">
      <div
        className={`${memberList?.length || subBranchesList?.length ? 'pb-3' : ''}`}
      >
        <div className="d-flex align-items-center position-relative">
          <h6 className="card-title mb-0">Subordinate {id}</h6>
          <FaCirclePlus
            style={{ fontSize: '20px', color: 'green', cursor: 'pointer' }}
            onClick={addMember}
            className="ms-2"
          />
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
          <ul className="dropdown-menu">
            <li>
              <div
                className="px-2"
                style={{ cursor: 'pointer' }}
                onClick={addSubBranch}
              >
                Add a New Subordinate Branch
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="mb-2">
                <button className="btn btn-secondary me-2" onClick={addSubBranch}>Add Subordinate</button>
                <button className="btn btn-success" onClick={addMember}>Add Member</button>
            </div> */}
      <div className="row">
        {memberList?.map((member, index) => (
          <div className="col-12" key={index}>
            <BranchMember id={`${id}/${member}`} />
          </div>
        ))}
      </div>
      <div className="row">
        {subBranchesList?.map((branch, index) => (
          <div className="col-12" key={index}>
            <Subordinate id={branch?.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

Subordinate.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Subordinate;
