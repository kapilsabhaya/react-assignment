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
        <div
          style={{
            marginLeft: '20px',
            border: '1px solid black',
            padding: '10px',
          }}
        >
          <div
            className={`${node.name == 'Director' ? 'd-flex justify-content-center my-2' : 'my-2'}`}
          >
            <div
              className={`"btn-group dropend text-center border rounded-1 position-relative mx-auto"`}
              style={
                node.name == 'Director'
                  ? { width: '150px', height: '70px', padding: '10px 0' }
                  : { padding: '10px 0' }
              }
            >
              {node.name}
              <div>
                <button onClick={() => addSubBranch(node.id)}>
                  {node?.name?.startsWith('Branch Member')
                    ? 'Add Sub Branch Member'
                    : 'Add a Subordinate'}
                </button>
                {node?.name?.startsWith('Branch Member') ||
                node?.name == 'Director' ? (
                  <></>
                ) : (
                  <>
                    <button onClick={() => addMember(node.id)}>
                      Add Branch Member
                    </button>
                  </>
                )}
                {node.id !== 1 && (
                  <button onClick={() => removeNode(node.id)}>Remove</button>
                )}
              </div>
              <div>
                {node.members.length > 0 && (
                  <ul>
                    {node.members.map((member) => (
                      <li key={member.id} style={{ marginLeft: '20px' }}>
                        {member.name}
                        <button
                          onClick={() => addSubBranchMember(node.id, member.id)}
                          style={{ marginLeft: '10px' }}
                        >
                          Add Sub Branch Member
                        </button>
                        <button
                          onClick={() => removeMember(node.id, member.id)}
                          style={{ marginLeft: '10px' }}
                        >
                          Remove Member
                        </button>
                        <div>
                          {member.subBranch.map((subMember) =>
                            renderTree(subMember),
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            {node.subBranch && node.subBranch.map((child) => renderTree(child))}
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
        const newMember = {
          id: new Date().getTime(),
          name: node?.name?.startsWith('Branch Member')
            ? `${node?.name}/${node.memberCount + 1}`
            : `Branch Member ${node.memberCount + 1}`,
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

  return <div className="row">{renderTree(treeData)}</div>;
};

export default OrgChart;
