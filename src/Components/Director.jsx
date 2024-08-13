import { useState } from "react";
import Subordinate from "./Subordinate";

function Director() {
    const [subordinateList, setsubordinateList] = useState([]);


    const addSubordinate = () => {
        setsubordinateList([...subordinateList, { id: subordinateList.length + 1, members: [] }]);
    };

    return (
        <div className="card p-3 my-3 Director">
            <h5 className="card-title text-center">Director</h5>
            <div className="text-center mb-3">
                <button className="btn btn-primary" onClick={addSubordinate}>Add Subordinate</button>
            </div>
            <div className="row">
                {subordinateList?.map((subordinate, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                        <Subordinate id={subordinate.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Director