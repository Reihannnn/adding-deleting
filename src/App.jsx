import { useEffect, useState } from "react";
import axios from "axios";

const URL = "https://dummyjson.com/users/";

function App() {
  const [count, setCount] = useState(0); // state count
  const [users, setUsers] = useState([]);
  const [zeroData, setZeroData] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      // function fetch api from url
      try {
        const res = await axios.get(`${URL}${count}`);
        const newUser = {
          id: res.data.id,
          fullName: `${res.data.firstName} ${res.data.lastName}`,
          avatar: res.data.image,
          email: res.data.email,
        };

        // Hanya menambahkan user baru jika belum ada
        if (!users.some((user) => user.id === newUser.id)) {
          setUsers((prevUsers) => [...prevUsers, newUser]);
        }
      } catch (err) {
        console.log(`Error in fetching user: ${err}`);
      }
    };

    fetchUser();
  }, [count]); // Trigger useEffect hanya ketika count berubah

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1); // Menambah count
  };

  const handleClickDelete = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);

      // Buat salinan dari array users dan hilangkan elemen terakhir
      setUsers((prevUsers) => prevUsers.slice(0, -1));
    } else {
      setZeroData("Data not available for delete");
    }
  };

  console.log(users);

  return (
    <>
      <div className="w-full flex items-center justify-center flex-col">
        <div className="flex gap-5">
          <button
            onClick={handleClick}
            className="border p-3 bg-green-600 text-white mb-5 mt-5"
          >
            Add Data pribadi
          </button>

          <button
            onClick={handleClickDelete}
            className="border p-3 bg-red-600 text-white mb-5 mt-5"
          >
            Delete Data
          </button>
        </div>
        <h1 className="text-3xl">{count}</h1>
        <h1 className="text-red-600 text-3xl mt-5 font-bold text-center">
          {users.length <= 0 && zeroData}
        </h1>

        <div className="flex gap-4 flex-wrap items-center justify-around w-6/6 p-8 ">
          {users.length > 0 &&
            users.map((user) => (
              <div
                key={user.id}
                className="w-[425px] flex items-center border gap-5 h-[120px] bg-black text-white"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-md h-full"
                />
                <div className="flex flex-col">
                  <h1 className="font-bold text-2xl">{user.fullName}</h1>
                  <h1>{user.email}</h1>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
