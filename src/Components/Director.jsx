import { useState } from 'react';
import Subordinate from './Subordinate';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

function Director() {
  const [subordinateList, setsubordinateList] = useState([]);
  const [count, setCount] = useState(0);

  const addSubordinate = () => {
    let c1 = count + 1;
    setCount(c1);
    // eslint-disable-next-line prettier/prettier
    setsubordinateList([...subordinateList, { id: c1, members: [] }]);
  };

  const removeSubordinate = (id) => {
    setsubordinateList(subordinateList?.filter((x) => x?.id != id));
  };

  return (
    <div className="card p-3 my-3 Director">
      <div
        className="btn-group dropend text-center border rounded-1 position-relative d-flex justify-content-center align-items-center mx-auto"
        style={{ width: '150px', height: '70px' }}
      >
        <h5 className="card-title mb-0">Director</h5>
        <button
          style={{
            border: 'none',
            backgroundColor: 'transparent',
          }}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <HiOutlineDotsHorizontal />
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
            <Subordinate id={subordinate.id} onRemove={removeSubordinate} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Director;
