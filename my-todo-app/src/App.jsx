import { useState } from 'react';
import './App.css'

function App() {
    const [todos, setTodos] = useState(['学习 React', '写代码']);
    const [input, setInput] = useState('');   // 存输入框内容

    function handleAdd() {
        if (input.trim() === '') return;        // 空内容不添加
        setTodos([...todos, input]);            // 用展开运算符创建新数组
        setInput('');                           // 清空输入框
      }

    function handleDelete(indexToDelete) {
        setTodos(todos.filter((_, index) => index !== indexToDelete));
    }

    return (
      <div>

        <h1>我的待办清单</h1>
        <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入待办事项"
        />
        <button onClick={handleAdd}>添加</button>


        <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDelete(index)}>删除</button>
          </li>
        ))}
        </ul>


      </div>
    );
  }
  
  export default App;
