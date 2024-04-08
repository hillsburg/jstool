# jstool
该项目包含一些有用的js小工具。所有代码使用 GNU GPL。

This project contains some useful JavaScript tools for html page design. All these code is under GNU GPL.

### 工具

### ```List render```
- 在一些场景里，客户端在获取到服务器返回的数据后，需要在前端动态加载一个数据列表。这个列表有自己的样式，类似与微信公众号的推文列表。如果单纯地用 js 拼接字符串，那很麻烦，也不能很好的编辑 html样式。因此我写了这个工具。其核心算法就是字符匹配，通过反射机制找到数据后做替换操作。注意，为了更好的体验，建议在 html 中将列表容器的 **visibility** 设为 **hidden** ，在渲染列表时会设为 **visible**。

使用方法：

- 给定一个容器，设 ID 为```list-container```。容器里放需要循环渲染的 html 代码。被 **?{xxx}** 包含的部分表示该部分将会被 xxx 替换。定义一个数组名为 datas，数组里的每一项的数据结构相同。

- Demo

  ```html
  <!DOCTYPE html>
  <html>
  <head>
      <script src="list-render.js"></script>
  </head>
  <body>
      <div>
          <ul id="list-container">
              <li>?{src} ?{text} <span>?{grade}</span> <a href="?{src}">?{src}</a> <span style="color: rebeccapurple;">?{text}</span></li>
          </ul>
      </div>
      <script>
          // 数据
          var datas = [
              { text: 'JavaScript', grade: 0, src: "test.test" },
              { text: 'JavaScript', grade: 0, src: "test.test" },
              { text: 'JavaScript', grade: 0, src: "test.test" },
          ];
          // 新建一个列表渲染器
          var render = new ForListRender("list-container");
          render.RenderList(datas);
      </script>
  </body>
  </html>
  ```


### ```Simple Pagination Control```
我不喜欢阅读别人的代码实现，于是就自己写了一个分页控件。

- Demo

  Demo 使用了前面的 list render 代码，页码在变化的时候，list render 渲染对应页面的数据。

  ```html
  <ul id="list-container" class="list-group">
      <li class="list-group-item">?{text} <span>?{grade}</span> <a href="?{src}">?{src}</a> <span style="color: rebeccapurple;">?{text}</span></li>
  </ul>
  <div id="simple-page-control-panel"></div>
  ```

  
