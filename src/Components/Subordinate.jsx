import { useState } from 'react';
import BranchMember from './BranchMember';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import PropTypes from 'prop-types';

function Subordinate({ id, onRemove }) {
  const [memberList, setMemberList] = useState([]);
  const [subBranchesList, setSubBranchesList] = useState([]);
  const [count, setCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  const addMember = () => {
    let c1 = memberCount + 1;
    setMemberCount(c1);
    setMemberList([...memberList, c1]);
  };

  const removeMember = (id) => {
    setMemberList(memberList?.filter((x) => x != id));
  };

  const addSubBranch = () => {
    let c1 = count + 1;
    setCount(c1);
    setSubBranchesList([
      ...subBranchesList,
      { id: `${id}/${c1}`, parentId: id },
    ]);
  };

  const removeSubordinate = (id) => {
    // Remove the subordinate and all its children
    setSubBranchesList(subBranchesList?.filter((x) => !x.id.startsWith(id)));
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
          <FaCircleMinus
            style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
            onClick={() => onRemove(id)}
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
      <div className="row">
        {memberList?.map((member, index) => (
          <div className="col-12" key={index}>
            <BranchMember id={`${id}/${member}`} onRemove={removeMember} />
          </div>
        ))}
      </div>
      {
        <div className="row">
          {subBranchesList?.map((branch, index) =>
            branch?.parentId == id ? (
              <div className="col-12" key={index}>
                <Subordinate id={branch?.id} onRemove={removeSubordinate} />
              </div>
            ) : null,
          )}
        </div>
      }
    </div>
  );
}

Subordinate.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Subordinate;
