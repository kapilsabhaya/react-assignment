import { useState } from "react";

function BranchMember({ id }) {
    const [subBranchesList, setSubBranchesList] = useState([]);

    const addSubBranch = () => {
        setSubBranchesList([...subBranchesList, `${id}/${subBranchesList.length + 1}`]);
    };

    return (
        <div className="card p-2 mb-2 BranchMember">
            <div className={`d-flex justify-content-between align-items-center ${Boolean(subBranchesList?.length) ? "pb-2" : ""}`}>
                <span>Branch Member {id}</span>
                <button className="btn btn-sm btn-info" onClick={addSubBranch}>Add Sub Branch</button>
            </div>
            <div className="ps-3">
                {subBranchesList?.map((subBranch, index) => (
                    <BranchMember key={index} id={subBranch} />
                ))}
            </div>
        </div>
    );
}

export default BranchMember