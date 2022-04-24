# jstool
### 该项目包含一些有用的js小工具。所有代码使用GNU GPL
### This project contains some useful JavaScript tools for html page design. All these code is under the GNU License.

### 工具列于下

### ```List render```
#### 在一些场景里，客户端在获取到服务器返回的数据后，需要在前端动态加载一个数据列表。这个列表有自己的样式，类似与微信公众号的推文列表。如果单纯地用js拼接字符串，那很麻烦，也不能很好的编辑hmtl样式。因此我写了这个工具。其核心算法就是字符匹配，通过反射机制找到数据后做替换操作。注意，为了更好的体验，建议在html中将列表容器的visibility设为hidden，在渲染列表时会设为visible
### ```Simple Pagination Control```
#### 我不喜欢阅读别人的代码实现，于是就自己写了一个