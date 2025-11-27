import { useEffect, useState } from "react";

const initialUsers = ["Alex Fin", "Rahul Jain", "Ferdinand A"];

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterList, setFilterList] = useState(users);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [select, setSelect] = useState("");

  useEffect(() => {
    if (search) {
      setFilterList(() =>
        users.filter(item => item.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      );
    } else {
      setFilterList(users);
    }
  }, [search, users]);

  useEffect(() => {
    if (select) {
      const parts = select.split(" ");
      setFirstname(parts[0]);
      setLastname(parts[1]);
    } else {
      reset();
    }
  }, [select]);

  const reset = () => {
    setFirstname("");
    setLastname("");
    setSelect("");
  };

  const handleCreate = () => {
    const newUser = `${firstname} ${lastname}`;
    setUsers(currentUsers => [...currentUsers, newUser]);
    reset();
  };

  const handleUpdate = () => {
    const myIndex = users.findIndex(item => item === select);
    if (myIndex > -1) {
      const updatedUsers = [...users];
      updatedUsers[myIndex] = `${firstname} ${lastname}`;
      setUsers(updatedUsers);
      reset();
    }
  };

  const handleDelete = () => {
    const myIndex = users.findIndex(item => item === select);
    if (myIndex > -1) {
      const updatedUsers = users.filter((_, index) => index !== myIndex);
      setUsers(updatedUsers);
      reset();
    }
  };

  const handleCancel = () => {
    setSearch("");
    setSelect("");
  };

  return (
    <div className="flex col gap10">
      <input
        className="max-width300"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search"
      />
      <div className="flex justify-start items-center gap10 ">
        <div className="border ">
          <ul className="unorderedList">
            {filterList.map(user => {
              return (
                <li
                  key={user}
                  onClick={() => setSelect(user)}
                  className={`${user === select ? "active" : ""}`}
                >
                  {user}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex col gap10">
          <div className="flex col">
            <label>First name: </label>
            <input value={firstname} onChange={e => setFirstname(e.target.value)} />
          </div>
          <div className="flex col">
            <label>Last name: </label>
            <input value={lastname} onChange={e => setLastname(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="flex gap10">
        <button disabled={!firstname || !lastname || select} onClick={handleCreate}>
          Create
        </button>
        <button disabled={!select} onClick={handleUpdate}>
          Update
        </button>
        <button disabled={!select} onClick={handleDelete}>
          Delete
        </button>
        <button disabled={!select} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
