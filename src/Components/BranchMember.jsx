import { useState } from 'react';
import PropTypes from 'prop-types';

function BranchMember({ id, onRemove }) {
  const [subBranchesList, setSubBranchesList] = useState([]);
  const [count, setCount] = useState(0);

  const addSubBranch = () => {
    let c1 = count + 1;
    setCount(c1);
    // eslint-disable-next-line prettier/prettier
    setSubBranchesList([...subBranchesList, `${id}/${c1}`]);
  };

  const removeMember = (id) => {
    setSubBranchesList(subBranchesList?.filter((x) => x != id));
  };

  return (
    <div className="card p-2 mb-2 BranchMember">
      <div
        className={`d-flex justify-content-between align-items-center ${subBranchesList?.length ? 'pb-2' : ''}`}
      >
        <span>Branch Member {id}</span>
        <button className="btn btn-sm btn-info" onClick={addSubBranch}>
          Add Sub Branch
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onRemove(id)}>
          Remove Member
        </button>
      </div>
      <div className="ps-3">
        {subBranchesList?.map((subBranch, index) => (
          <BranchMember key={index} id={subBranch} onRemove={removeMember} />
        ))}
      </div>
    </div>
  );
}

BranchMember.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BranchMember;
