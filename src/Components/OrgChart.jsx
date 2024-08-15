// import { useState } from 'react';

// const initialData = {
//   id: 1,
//   name: 'Director',
//   subBranch: [],
//   count: 0,
// };

// const OrgChart = () => {
//   const [treeData, setTreeData] = useState(initialData);

//   const renderTree = (node) => {
//     return (
//       <div
//         key={node.id}
//         style={{
//           marginLeft: '20px',
//           border: '1px solid black',
//           padding: '10px',
//         }}
//       >
//         {node.name}
//         <div>
//           <button onClick={() => addNode(node.id)}>
//             Add a Sub Ordinate Branch
//           </button>
//           <button onClick={() => removeNode(node.id)}>Remove</button>
//         </div>
//         <div>
//           {node.subBranch && node.subBranch.map((child) => renderTree(child))}
//         </div>
//       </div>
//     );
//   };

//   const addNode = (parentId) => {
//     const newTree = { ...treeData };

//     const addNodeRecursively = (node) => {
//       if (node.id === parentId) {
//         const newNode = {
//           id: new Date().getTime(),
//           name:
//             node.name == 'Director'
//               ? `Sub Branch ${node.count + 1}`
//               : `${node.name}/${node.count + 1}`,
//           subBranch: [],
//           count: 0,
//         };
//         node.subBranch.push(newNode);
//         node.count = node.count + 1;
//       } else {
//         node.subBranch.forEach((child) => addNodeRecursively(child));
//       }
//     };

//     addNodeRecursively(newTree);
//     setTreeData(newTree);
//     console.log(treeData, 'treeData');
//   };

//   const removeNode = (nodeId) => {
//     const removeNodeRecursively = (node) => {
//       return node.subBranch.filter((child) => {
//         if (child.id === nodeId) {
//           return false;
//         }
//         child.subBranch = removeNodeRecursively(child);
//         return true;
//       });
//     };

//     if (treeData.id === nodeId) {
//       alert('Cannot remove the root node!');
//       return;
//     }

//     const newTree = { ...treeData };
//     newTree.subBranch = removeNodeRecursively(newTree);
//     setTreeData(newTree);
//   };

//   return <div>{renderTree(treeData)}</div>;
// };

// export default OrgChart;

import { useState } from 'react';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const initialData = {
  id: 1,
  name: 'Director',
  subBranch: [],
  members: [],
  memberCount: 0,
  branchCount: 0,
};

const OrgChart = () => {
  const [treeData, setTreeData] = useState(initialData);
  console.log(treeData, 'treeData');

  const renderTree = (node) => {
    return (
      <div
        key={node.id}
        className={`${node?.name?.length == '13' || node?.name?.length == '14' ? 'col-6' : 'col-12'}`}
      >
        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <div className="border rounded-1 my-2">
            <div
              className={`btn-group dropend text-center position-relative mx-auto d-flex align-items-center ${node.name == 'Director' ? 'justify-content-center' : 'justify-content-between'}`}
              style={
                node.name == 'Director'
                  ? {
                      width: '150px',
                      height: '70px',
                      padding: '10px',
                      borderRadius: '0.25rem',
                      margin: '20px 0',
                      border: '1px solid #dee2e6',
                    }
                  : { padding: '10px' }
              }
            >
              <h6
                className={`${node?.name?.startsWith('Branch Member') ? 'fw-normal' : ''} mb-0`}
              >
                {node.name}{' '}
                {node?.name?.startsWith('Branch Member') ||
                node?.name == 'Director' ? (
                  <></>
                ) : (
                  <>
                    <FaCirclePlus
                      style={{
                        fontSize: '20px',
                        color: 'green',
                        cursor: 'pointer',
                      }}
                      onClick={() => addMember(node.id)}
                      className="ms-2"
                    />
                  </>
                )}
                {node.id != 1 && (
                  <FaCircleMinus
                    style={{
                      fontSize: '20px',
                      color: 'red',
                      cursor: 'pointer',
                    }}
                    onClick={() => removeNode(node.id)}
                    className="ms-2"
                  />
                )}
              </h6>
              <div>
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
                      onClick={() => addSubBranch(node.id)}
                    >
                      {node?.name?.startsWith('Branch Member')
                        ? 'Add a New Sub Branch Member'
                        : 'Add a New Subordinate Branch'}
                    </div>
                  </li>
                </ul>
                {/* <button onClick={() => addSubBranch(node.id)}>
                  {node?.name?.startsWith('Branch Member')
                    ? 'Add Sub Branch Member'
                    : 'Add a Subordinate'}
                </button> */}
              </div>
            </div>
            {node.members.length > 0 && (
              <div style={{ margin: '0px 8px 20px 0', padding: '0 20px' }}>
                <div>
                  {node.members.map((member) => (
                    <div
                      key={member.id}
                      className="border rounded-1 p-2 px-3 my-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 fw-normal">
                          {member.name}
                          <FaCircleMinus
                            style={{
                              fontSize: '20px',
                              color: 'red',
                              cursor: 'pointer',
                            }}
                            onClick={() => removeMember(node.id, member.id)}
                            className="ms-2"
                          />
                        </h6>
                        <div>
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
                                onClick={() =>
                                  addSubBranchMember(node.id, member.id)
                                }
                              >
                                Add Sub Branch Member
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        {member.subBranch.map((subMember) =>
                          renderTree(subMember),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="row">
              {node.subBranch &&
                node.subBranch.map((child) => renderTree(child))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const addSubBranch = (parentId) => {
    const newTree = { ...treeData };

    const addSubBranchRecursively = (node) => {
      if (node.id === parentId) {
        const newNode = {
          id: new Date().getTime(),
          name:
            node?.name == 'Director'
              ? `Subordinate ${node.branchCount + 1}`
              : `${node?.name}/${node.branchCount + 1}`,
          subBranch: [],
          members: [],
          memberCount: 0,
          branchCount: 0,
        };
        node.subBranch.push(newNode);
        node.branchCount = node.branchCount + 1;
      } else {
        node.subBranch.forEach((child) => addSubBranchRecursively(child));
        node.members.forEach((member) => addSubBranchRecursively(member));
      }
    };

    addSubBranchRecursively(newTree);
    setTreeData(newTree);
  };

  const addMember = (nodeId) => {
    const newTree = { ...treeData };

    const addMemberRecursively = (node) => {
      if (node.id === nodeId) {
        const parentId = node?.name?.split(' ')?.[1];
        const newMember = {
          id: new Date().getTime(),
          name: node?.name?.startsWith('Branch Member')
            ? `${node?.name}/${node.memberCount + 1}`
            : `Branch Member ${parentId ? parentId + '/' : ''}${node.memberCount + 1}`,
          subBranch: [],
          members: [],
          memberCount: 0,
          branchCount: 0,
        };
        node.members.push(newMember);
        node.memberCount = node.memberCount + 1;
      } else {
        node.subBranch.forEach((child) => addMemberRecursively(child));
        node.members.forEach((member) => addMemberRecursively(member));
      }
    };

    addMemberRecursively(newTree);
    setTreeData(newTree);
  };

  const addSubBranchMember = (nodeId, memberId) => {
    const newTree = { ...treeData };

    const addSubBranchMemberRecursively = (node) => {
      if (node.id === nodeId) {
        const member = node.members.find((member) => member.id === memberId);
        const newSubMember = {
          id: new Date().getTime(),
          name: member?.name?.startsWith('Branch Member')
            ? `${member?.name}/${member.branchCount + 1}`
            : `Branch Member ${member.branchCount + 1}`,
          subBranch: [],
          members: [],
          memberCount: 0,
          branchCount: 0,
        };
        member.subBranch.push(newSubMember);
        member.branchCount = member.branchCount + 1;
      } else {
        node.subBranch.forEach((child) => addSubBranchMemberRecursively(child));
        node.members.forEach((member) => addSubBranchMemberRecursively(member));
      }
    };

    addSubBranchMemberRecursively(newTree);
    setTreeData(newTree);
  };

  const removeNode = (nodeId) => {
    const removeNodeRecursively = (node) => {
      node.subBranch = node.subBranch.filter((child) => {
        if (child.id === nodeId) {
          return false;
        }
        child.subBranch = removeNodeRecursively(child);
        return true;
      });
      node.members = node.members.filter((member) => {
        if (member.id === nodeId) {
          return false;
        }
        member.subBranch = removeNodeRecursively(member);
        return true;
      });
      return node.subBranch;
    };

    if (treeData.id === nodeId) {
      alert('Cannot remove the root node!');
      return;
    }

    const newTree = { ...treeData };
    newTree.subBranch = removeNodeRecursively(newTree);
    setTreeData(newTree);
  };

  const removeMember = (nodeId, memberId) => {
    const newTree = { ...treeData };

    const removeMemberRecursively = (node) => {
      if (node.id === nodeId) {
        node.members = node.members.filter((member) => member.id !== memberId);
      } else {
        node.subBranch.forEach((child) => removeMemberRecursively(child));
        node.members.forEach((member) => removeMemberRecursively(member));
      }
    };

    removeMemberRecursively(newTree);
    setTreeData(newTree);
  };

  return <div className="row mx-0">{renderTree(treeData)}</div>;
};

export default OrgChart;
