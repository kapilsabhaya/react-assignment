import { useState } from "react";
import BranchMember from "./BranchMember";

function Subordinate({ id }) {
    const [memberList, setMemberList] = useState([]);
    const [subBranchesList, setSubBranchesList] = useState([]);

    const addMember = () => {
        setMemberList([...memberList, memberList?.length + 1]);
    };

    const addSubBranch = () => {
        setSubBranchesList([...subBranchesList, { id: `${id}/${subBranchesList?.length + 1}` }]);
    };

    return (
        <div className="card p-3 mb-3 Subordinate">
            <h6 className="card-title">Subordinate {id}</h6>
            <div className="mb-2">
                <button className="btn btn-secondary me-2" onClick={addSubBranch}>Add Subordinate</button>
                <button className="btn btn-success" onClick={addMember}>Add Member</button>
            </div>
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

export default Subordinate