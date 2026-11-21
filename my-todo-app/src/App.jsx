import { useState } from 'react';

function App() {
    const [todos, setTodos] = useState(['学习 React', '写代码']);
    return (
      <div>
        <h1>我的待办清单</h1>
        <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      </div>
    );
  }
  
  export default App;
