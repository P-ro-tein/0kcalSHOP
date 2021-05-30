import React, { useState } from 'react';
import UserList from './UserList';

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      category: '식단세트',
      active: true
    },
    {
      id: 2,
      category: '식사대용',
      active: false
    },
    {
      id: 3,
      category: '건강간식',
      active: false
    },
    {
      id:4,
      category:'차/음료/두유',
      active:false
    },
    {
      id:5,
      category:'오일/소스/향신료',
      active:false
    }
  ]);

  const onToggle = id => {
    setItems(
      items.map(data =>
        data.id === id ? { ...data, active: !data.active } : data
      )
    );
  };
  return (
    <>
      <UserList items={items} onToggle={onToggle} />
    </>
  );
}

export default App;