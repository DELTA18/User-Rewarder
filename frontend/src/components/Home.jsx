import { useState, useEffect } from 'react';
import UserList from './UserList';
import { getUsers, claimPoints, addUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

import DarkVeil from './DarkVeil';
import Confetti from './Confetti';

function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }

    const randomPoints = Math.floor(Math.random() * 10) + 1;
    await claimPoints(selectedUser, randomPoints);
    await fetchUsers();
  };

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    await addUser(newUserName.trim());
    setNewUserName('');
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
        <DarkVeil />
      </div>

      <div className='mybgcolor min-h-screen px-4 py-10 flex flex-col items-center'>
        <h1 className='text-6xl font-bold text-center text-amber-50 mb-10'>User List</h1>

        {/* Add user & Leaderboard section */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300"
          />
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Go to Leaderboard
          </button>
        </div>

        {/* User List */}
        {users.map((user) => (
          <UserList
            key={user._id}
            id={user._id}
            name={user.name}
            points={user.totalPoints}
            isSelected={selectedUser === user._id}
            onSelect={handleUserSelect}
          />
        ))}

        <div style={{ position: 'fixed', top: '80%', left: '44%', zIndex: 1 }}>
          <Confetti onClaim={handleClaimPoints} />
        </div>
      </div>
    </>
  );
}

export default Home;
