import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getUsers } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import DarkVeil from './DarkVeil';

// import { ProgressiveBlur } from "./magicui/progressive-blur";

const socket = io('http://localhost:5000');

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await getUsers();
      const sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sorted);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    socket.on('leaderboardUpdate', (data) => {
      const sorted = data.sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sorted);
    });

    return () => socket.off('leaderboardUpdate');
  }, []);

  const getRankClass = (index) => {
    switch (index) {
      case 0:
        return 'color-yellow-300 bg-opacity-30 border-yellow-300';
      case 1:
        return ' bg-opacity-30 bg-gray-700 border-gray-200';
      case 2:
        return ' bg-opacity-30 border-orange-300';
      default:
        return ' bg-opacity-10 border-white';
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 text-white flex flex-col items-center">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
        <DarkVeil />
      </div>

      <h2 className="text-4xl font-bold mb-6">Leaderboard</h2>
      <ul className="w-full max-w-xl space-y-4">
        <AnimatePresence>
          {users.map((user, idx) => (
            <motion.li
              key={user._id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`backdrop-blur-lg p-4 rounded-xl shadow-lg border ${getRankClass(idx)}`}
            >
              <div className="text-xl font-semibold flex justify-between">
                <span>{idx + 1}. {user.name}</span>
                <span>{user.totalPoints} pts</span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {/* <ProgressiveBlur height="50%" position="bottom" /> */}
    </div>
  );
};

export default Leaderboard;
