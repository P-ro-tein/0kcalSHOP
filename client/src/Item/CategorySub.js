import React from 'react';

function Sub({ item, onToggle }) {
  return (
      <button
        style={{
        cursor:'pointer',
        border:'none',
        background:'none',
        fontWeight: item.active ? 'bold' : 'normal',
        marginLeft:'20px',
        fontSize:'18px'
    }}
        onClick={() => onToggle(item.id)}
      >
        {item.category}
      </button>
  );
}

function CategorySub({ items, onToggle }) {
  return (
    <div>
      {items.map(item => (
        <Sub
          item={item}
          key={item.id}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default CategorySub;