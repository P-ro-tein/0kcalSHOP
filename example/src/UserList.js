import React from 'react';

function User({ item, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          fontWeight: item.active ? 'bold' : 'normal'
        }}
        onClick={() => onToggle(item.id)}
      >
        {item.category}
      </b>
      &nbsp;
    </div>
  );
}

function UserList({ items, onToggle }) {
  return (
    <div>
      {items.map(item => (
        <User
          item={item}
          key={item.id}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;