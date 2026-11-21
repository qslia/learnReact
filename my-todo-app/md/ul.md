<ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
ul是什么

---

`<ul>` 是 HTML 标签，全称 **Unordered List（无序列表）**。

## 作用

用来创建一个**项目符号列表**——列表项前面显示圆点（•），而不是数字。与之对应的是 `<ol>`（Ordered List，有序列表，显示 1. 2. 3.）。

## 基本结构

```html
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>
```

渲染效果：

- 苹果
- 香蕉
- 橙子

- `<ul>`：列表容器
- `<li>`：List Item，列表项，必须放在 `<ul>`（或 `<ol>`）里面

## 你这段代码在做什么

```jsx
<ul>
  {todos.map((todo, index) => (
    <li key={index}>{todo}</li>
  ))}
</ul>
```

这是 React 里常见的**渲染列表**写法：

1. `todos` 是一个数组，比如 `["买菜", "写代码", "健身"]`
2. `.map()` 遍历数组，为每个元素生成一个 `<li>`
3. 所有 `<li>` 被包在 `<ul>` 里，最终变成一个无序列表

等价于手写：

```html
<ul>
  <li>买菜</li>
  <li>写代码</li>
  <li>健身</li>
</ul>
```

## 补充：`key={index}` 是什么

`key` 是 React 要求的**唯一标识**，帮助 React 高效地更新列表。不过用 `index` 作 key 在列表会增删/排序时可能出问题，更好的做法是用数据自身的唯一 id，例如 `key={todo.id}`。

