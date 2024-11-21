/**
 * This is a simple page control component, which is used to control the page buttons' number and color and invoke the custom click event.
 * The custom click event must contain a parameter, which is the page number.
 * The page control component contains the following buttons:
 * 1. First page button
 * 2. Previous page button
 * 3. Page buttons
 * 4. Next page button
 * 5. Last page button
 * 6. Text box for inputting the page number
 * 7. Goto page button
 * 8. Total page button
 * Author: hillsburg@qq.com
 * Github:https://github.com/hillsburg/jstool
 */
class SimplePageControl {
    static realBtnCnt = 5;
    static currentPage = 1;
    static totalPage = 5;
    static hasBeenRendered = false;
    static customClickEvent;
    pageBtns = [];
    /**
     * 
     * @param {总页数} ptotalPage 
     * @param {当前页} pcurrentPage 
     * @param {自定义点击页面按钮事件, 必须含有一个页码参数} pCustomClickEvent 
     */
    constructor(ptotalPage, pcurrentPage, pCustomClickEvent) {
        this.currentPage = pcurrentPage;
        this.totalPage = ptotalPage;
        this.customClickEvent = pCustomClickEvent;
    }
    /**
     * 渲染控件
     */
    Render() {
        var _that = this;
        if (_that.totalPage < 5) {
            _that.realBtnCnt = _that.totalPage;
        }
        else {
            this.realBtnCnt = 5;
        }

        var panel = document.getElementById("simple-page-control-panel");
        var btnFirstPage = document.createElement("button");

        btnFirstPage.innerHTML = "首页";
        btnFirstPage.className = "btnFirstPage btn btn-secondary";
        btnFirstPage.onclick = function () {
            console.log("首页按下");
            _that.RenderBtns(1);
        }
        panel.appendChild(btnFirstPage);

        var btnPrePage = document.createElement("button");
        btnPrePage.className = "btnPrePage btn btn-secondary";
        btnPrePage.innerHTML = "上一页";
        btnPrePage.onclick = function () {
            console.log("上一页按下");
            _that.RenderBtns(_that.currentPage - 1);
        }
        panel.appendChild(btnPrePage);

        for (let i = 0; i < this.realBtnCnt; i++) {
            var btn = document.createElement("button");
            btn.innerHTML = i + 1;
            btn.className = "simple-page-control-pageBtns btn btn-secondary";
            btn.onclick = function () {
                var currentPageNum = parseInt(this.innerHTML);
                _that.RenderBtns(currentPageNum);
            }
            //console.log(_that.pageBtns);
            _that.pageBtns.push(btn);
            panel.appendChild(btn);
        }

        var btnNextPage = document.createElement("button");
        btnNextPage.innerHTML = "下一页";
        btnNextPage.className = "btnNextPage btn btn-secondary";
        btnNextPage.onclick = function () {
            _that.RenderBtns(_that.currentPage + 1);
        }
        panel.appendChild(btnNextPage);

        var btnLastPage = document.createElement("button");
        btnLastPage.className = "btnLastPage btn btn-secondary";
        btnLastPage.innerHTML = "末页";
        btnLastPage.onclick = function () {
            console.log("末页按下");
            _that.RenderBtns(_that.totalPage);
        }
        panel.appendChild(btnLastPage);

        var textBox = document.createElement("input");
        textBox.type = "text";
        textBox.className = "simple-page-control-textBox";
        textBox.id = "goto-page-input";
        textBox.style.width = "50px";
        panel.appendChild(textBox);

        var btnGotoPage = document.createElement("button");
        btnGotoPage.className = "btnGotoPage btn btn-secondary";
        btnGotoPage.innerHTML = "跳转";
        btnGotoPage.onclick = function () {
            console.log("跳转按下");
            var gotoPage = document.getElementById("goto-page-input").value;
            _that.RenderBtns(gotoPage);
        }
        panel.appendChild(btnGotoPage);

        
        var totalPageBtn = document.createElement("button");
        totalPageBtn.className = "btnGotoPage btn btn-secondary";
        totalPageBtn.innerHTML = "共" + _that.totalPage + "页";
        panel.appendChild(totalPageBtn);
    }

    ChangeColor() {
        var _that = this;
        console.log("changecolor: " + _that.currentPage);
        var ele = document.getElementsByClassName("simple-page-control-pageBtns");
        for (var i = 0; i < ele.length; i++) {
            if (parseInt(ele[i].innerHTML) == _that.currentPage)
                ele[i].style.background = "pink";
            else
                ele[i].style.background = "grey";
        }
    }

    /**
     * This method is generally used to update the page buttons' number and color and invoke the custom click event
     * **/
    RenderBtns(gotoPage) {
        var _that = this;
        if (_that.currentPage == gotoPage) {
            _that.ChangeColor();
            return;
        }
        if (gotoPage > _that.totalPage) {
            gotoPage = _that.totalPage;
        }
        if (gotoPage < 1) {
            gotoPage = 1;
        }

        if (gotoPage == 1) {
            for (let i = 0; i < _that.realBtnCnt; i++) {
                _that.pageBtns[i].innerHTML = i + 1;
            }
        } else if (gotoPage == _that.totalPage) {
            for (let i = 0; i < _that.realBtnCnt; i++) {
                _that.pageBtns[i].innerHTML = _that.totalPage - _that.realBtnCnt + i + 1;
            }
        }
        else {
            if (gotoPage >= firstPageBtnNum && gotoPage <= lastPageBtnNum) {
                console.log("gotopage is already in the current page buttons");
                var currentPageNum = parseInt(gotoPage);
                var middlePageNum = parseInt(_that.pageBtns[Math.floor(_that.realBtnCnt / 2)].innerHTML);
                var firstPageBtnNum = parseInt(_that.pageBtns[0].innerHTML);
                var lastPageBtnNum = parseInt(_that.pageBtns[_that.realBtnCnt - 1].innerHTML);
                var gap = Math.abs(parseInt(this.innerHTML) - parseInt(_that.pageBtns[Math.floor(_that.realBtnCnt / 2)].innerHTML));
                var gapRight = parseInt(_that.totalPage) - parseInt(_that.pageBtns[_that.realBtnCnt - 1].innerHTML);
                var gapLeft = parseInt(_that.pageBtns[0].innerHTML) - 1;
                if (currentPageNum < middlePageNum) {// move to right
                    // if there is no need to change the page buttons' number, just change the color and invoke the custom click event
                    if (firstPageBtnNum != 1) {
                        if (gap <= gapLeft) {
                            for (let i = 0; i < _that.pageBtns.length; i++) {
                                _that.pageBtns[i].innerHTML = parseInt(_that.pageBtns[i].innerHTML - gap);
                            }
                        }
                        else {
                            for (let i = 0; i < _that.pageBtns.length; i++) {
                                _that.pageBtns[i].innerHTML = i + 1;
                            }
                        }
                    }
                }
                if (currentPageNum > middlePageNum)// move to left
                {
                    if (lastPageBtnNum != _that.totalPage) {
                        if (gap <= gapRight) {
                            for (let i = 0; i < _that.pageBtns.length; i++) {
                                _that.pageBtns[i].innerHTML = gap + parseInt(_that.pageBtns[i].innerHTML);
                            }
                        } else {
                            for (let i = 0; i < _that.realBtnCnt; i++) {
                                _that.pageBtns[i].innerHTML = _that.totalPage - _that.realBtnCnt + i + 1;
                            }
                        }
                    }
                }
            }
            else {
                if (gotoPage < Math.ceil(_that.realBtnCnt / 2)) {
                    console.log("show the first " + _that.realBtnCnt + " pages");
                    for (let i = 0; i < _that.realBtnCnt; i++) {
                        _that.pageBtns[i].innerHTML = i + 1;
                    }
                } else if (gotoPage > _that.totalPage - Math.floor(_that.realBtnCnt / 2)) {
                    console.log("show the last " + _that.realBtnCnt + " pages");
                    for (let i = 0; i < _that.realBtnCnt; i++) {
                        _that.pageBtns[i].innerHTML = _that.totalPage - _that.realBtnCnt + i + 1;
                    }
                } else {
                    console.log("gotopage is placed in the middle");
                    for (let i = 0; i < _that.realBtnCnt; i++) {
                        _that.pageBtns[i].innerHTML = gotoPage - Math.floor(_that.realBtnCnt / 2) + i;
                    }
                }
            }
        }

        _that.currentPage = gotoPage;
        _that.ChangeColor();
        _that.customClickEvent(_that.currentPage);
    }
}