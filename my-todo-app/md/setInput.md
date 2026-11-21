value={input}
        onChange={(e) => setInput(e.target.value)}
解释这两行代码

---

好，这两行是 React 里**受控组件**的标准写法，是表单处理的核心。我拆开讲。

```jsx
<input
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>
```

## 一、先理解一个前提

`input` 是我们之前用 `useState` 声明的状态：

```jsx
const [input, setInput] = useState('');   // 初始是空字符串
```

所以这两行的本质是：**输入框显示的内容，完全由 `input` 这个状态决定；用户打字时，用 `setInput` 更新状态。** 数据流是一个闭环：

```
用户打字 → onChange 触发 → setInput 更新状态 → 状态变了 → 重新渲染 → value 显示新值
```

## 二、逐行拆解

### `value={input}`

- 把输入框的**显示内容**绑定到 `input` 状态。
- `{input}` 是 JSX 里插入 JS 变量的语法（花括号）。
- 关键点：**输入框显示什么，由 React 状态说了算**。当前 `input` 是 `''`，输入框就是空的；`input` 是 `'学习'`，输入框就显示"学习"。

### `onChange={(e) => setInput(e.target.value)}`

- `onChange` 是**事件**：用户每次在输入框里打字（内容变化）就会触发。
- `(e) => ...` 是箭头函数，`e` 是**事件对象**（event）。
- `e.target` 指的是**触发事件的元素**，也就是这个 `<input>`。
- `e.target.value` 就是**输入框此刻的最新内容**（用户刚打进去的字符串）。
- 所以整句意思是：**每当用户打字，就把输入框的最新值存进 `input` 状态。**

## 三、为什么两个要配在一起？

这两行是**缺一不可**的搭档：

| 只有 `value`，没有 `onChange` | 只有 `onChange`，没有 `value` |
|---|---|
| 输入框被"锁死"，用户打不了字（值永远是状态值，改不了） | 输入框能打字，但 React 不知道内容，状态和界面脱节 |

**合起来**才形成"受控组件"：输入框的值完全被 React 状态控制。

## 四、走一遍实际流程

假设用户想在输入框打"买牛奶"：

1. 用户按下键盘 `买`
2. 浏览器触发 `onChange`，`e.target.value` = `"买"`
3. 执行 `setInput("买")`
4. React 重新渲染，`input` 状态变成 `"买"`
5. `<input value="买">`，输入框显示"买"
6. 用户再打 `牛`，`e.target.value` = `"买牛"`，重复上述过程……

每一步都走一遍"状态 → 界面"的同步，所以输入框始终和 `input` 状态一致。

## 五、几个容易踩的坑

**1. 写成 `onChange={setInput(e.target.value)}` ❌**
这样会在**渲染时立刻执行** `setInput`，而不是等用户打字。必须用箭头函数包一层：`onChange={(e) => setInput(e.target.value)}`。（和之前删除按钮传参是同一个道理）

**2. `e.target.value` 永远是字符串**
即使你输入数字 `123`，拿到的也是 `"123"` 字符串。需要数字时要自己转换：`Number(e.target.value)`。

**3. 为什么需要 `e.target`，不能直接用 `e.value`？**
`e` 是事件对象，`e.target` 才是"发生事件的 DOM 元素"。事件对象本身没有 `value` 属性，值在 `target` 上。

## 六、一句话总结

> `value={input}` 让输入框**显示状态值**；`onChange={(e) => setInput(e.target.value)}` 让用户打字时**把最新内容写回状态**。二者配合，实现"输入框 ↔ 状态"双向同步，这就是**受控组件**。

---

要不要我对比一下"**非受控组件**"（用 `useRef`，不用 state 的那种）？或者继续推进你的 Todo App，比如把"添加"按钮的逻辑和这两行串起来讲？