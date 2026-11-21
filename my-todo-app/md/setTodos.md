const [todos, setTodos] = useState(['学习 React', '写代码']);
解释这行代码

---

好，这行是 React 里最核心的写法，我拆开讲。

```jsx
const [todos, setTodos] = useState(['学习 React', '写代码']);
```

## 一、整体在做什么

这行代码做了三件事：
1. 调用 `useState(...)`，**声明一个状态**，初始值是 `['学习 React', '写代码']`
2. 把这个初始值存进一个叫 `todos` 的变量里（**当前值**）
3. 拿到一个**修改它的函数** `setTodos`

## 二、拆解语法

### `useState(['学习 React', '写代码'])`
- `useState` 是一个**函数**（React 提供的 Hook），你调用它并传入**初始值**。
- 初始值这里是数组 `['学习 React', '写代码']`。
- 它**返回一个数组**，长度固定为 2：`[当前值, 修改函数]`。

### `const [todos, setTodos] = ...`
这是 JavaScript 的**数组解构赋值**（你学 JS 时的 `[a, b] = arr`），把返回的数组拆开：

| 位置 | 变量名 | 含义 |
|------|--------|------|
| 第 1 个 | `todos` | 当前的状态值，即 `['学习 React', '写代码']` |
| 第 2 个 | `setTodos` | 更新这个状态的**函数** |

> 名字是你自己取的，不是固定的。但**惯例**是 `[x, setX]` 成对命名（`todos`/`setTodos`、`input`/`setInput`），可读性好。

## 三、这两个东西怎么用

**读取**：直接用 `todos`
```jsx
{todos.map(...)}   // 拿到当前数组，遍历渲染
console.log(todos) // ['学习 React', '写代码']
```

**修改**：调用 `setTodos(新值)`
```jsx
setTodos([...todos, input]);  // 传入新数组
```

**关键点**：**不能直接改 `todos`**
```jsx
todos.push('新事项');   // ❌ 错误！React 不会知道数据变了，界面不更新
setTodos([...todos, '新事项']); // ✅ 正确，传一个新数组
```

为什么？因为 `setTodos` 不只是"改个变量"，它还**通知 React 重新渲染界面**。而 React 判断"要不要重渲染"靠的是**引用有没有变**——直接 `push` 改的是同一个数组，引用没变，React 以为没变化，就不刷新。

## 四、一个容易困惑的点：每次渲染都会重新执行

```jsx
const [todos, setTodos] = useState([...]);
```

你可能会想："这行每次渲染都执行，初始值不会每次都被重置吗？"

**不会。** `useState` 的初始值**只在组件第一次渲染时使用一次**，之后 React 会记住这个状态。后续重新渲染时，`useState(...)` 里的参数会被**忽略**，`todos` 拿到的始终是**上一次更新后的最新值**。

这也是为什么它叫"状态"（state）——它会在多次渲染之间被**保留**。

## 五、如果换个初始值就懂了

```jsx
const [count, setCount] = useState(0);      // 状态是个数字
const [name, setName] = useState('张三');    // 状态是个字符串
const [isOpen, setIsOpen] = useState(false); // 状态是个布尔值
const [todos, setTodos] = useState([]);      // 状态是个数组（空列表）
```

形式完全一样：`const [值, 设置函数] = useState(初始值)`。初始值可以是任何类型。

---

**一句话总结**：
> `useState(初始值)` 返回 `[当前值, 更新函数]`，你用解构把它拆成 `todos` 和 `setTodos`；读用 `todos`，改必须用 `setTodos(新值)` 并传入新数据，不能直接改原数组。

要不要我接着讲讲"**为什么传新数组界面才会更新**"背后的机制（引用比较），或者继续带你写标记完成的练习？