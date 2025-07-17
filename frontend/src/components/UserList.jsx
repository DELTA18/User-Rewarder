import React from 'react';
import GlareHover from './GlareHover';

const UserList = ({ id, name, points, isSelected, onSelect }) => {
  return (
    <div
      style={{
        height: '100px',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#fff0aa33' : 'transparent',
        border: isSelected ? '2px solid #facc15' : 'none',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
      }}
      onClick={() => onSelect(id)}
    >
      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.3}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={800}
        playOnce={false}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#bcbcbc',
            margin: 0,
            textAlign: 'center',
          }}
        >
          {name} — {points} pts
        </h2>
      </GlareHover>
    </div>
  );
};

export default UserList;
