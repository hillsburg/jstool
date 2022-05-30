# jstool
该项目包含一些有用的js小工具。所有代码使用GNU GPL。
This project contains some useful JavaScript tools for html page design. All these code is under the GNU License.

### 工具列于下

### ```List render```
- 在一些场景里，客户端在获取到服务器返回的数据后，需要在前端动态加载一个数据列表。这个列表有自己的样式，类似与微信公众号的推文列表。如果单纯地用js拼接字符串，那很麻烦，也不能很好的编辑hmtl样式。因此我写了这个工具。其核心算法就是字符匹配，通过反射机制找到数据后做替换操作。注意，为了更好的体验，建议在html中将列表容器的visibility设为hidden，在渲染列表时会设为visible。

使用方法：

- 给定一个容器，设ID为```list-container```。容器里放需要循环渲染的html代码。被?{xxx}包含的部分表示该部分将会被xxx替换。定义一个数组名为datas，数组里的每一项的数据结构相同。

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
          //数据
          var datas = [
              { text: 'JavaScript', grade: 0, src: "test.test" },
              { text: 'JavaScript', grade: 0, src: "test.test" },
              { text: 'JavaScript', grade: 0, src: "test.test" },
          ];
          //新建一个列表渲染器
          var render = new ForListRender("list-container");
          render.RenderList(datas);
      </script>
  </body>
  </html>
  ```


### ```Simple Pagination Control```
我不喜欢阅读别人的代码实现，于是就自己写了一个分页控件。

- Demo

  Demo使用了前面的list render代码，页码在变化的时候，list render渲染对应页面的数据。

  ```html
  <ul id="list-container" class="list-group">
      <li class="list-group-item">?{text} <span>?{grade}</span> <a href="?{src}">?{src}</a> <span style="color: rebeccapurple;">?{text}</span></li>
  </ul>
  <div id="simple-page-control-panel"></div>
  ```

  
