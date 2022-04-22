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
            if (_that.currentPage == 1)
                return;
            var ele = document.getElementsByClassName("simple-page-control-pageBtns");
            for (let i = 0; i < ele.length; i++) {
                ele[i].innerHTML = i + 1;
            }
            _that.currentPage = 1;
            _that.ChangeColor();
            _that.customClickEvent(_that.currentPage);
        }
        panel.appendChild(btnFirstPage);

        var btnPrePage = document.createElement("button");
        btnPrePage.className = "btnPrePage btn btn-secondary";
        btnPrePage.innerHTML = "上一页";
        btnPrePage.onclick = function () {
            console.log("上一页按下");
            if (_that.currentPage == 1) {
                return;
            }
            else {
                var ele = document.getElementsByClassName("simple-page-control-pageBtns");
                for (let i = 0; i < ele.length; i++) {
                    if (parseInt(ele[i].innerHTML) == _that.currentPage - 1) {
                        ele[i].click();
                        break;
                    }
                }
                _that.ChangeColor();
            }
        }
        panel.appendChild(btnPrePage);

        for (let i = 0; i < this.realBtnCnt; i++) {
            var btn = document.createElement("button");
            btn.innerHTML = i + 1;
            btn.className = "simple-page-control-pageBtns btn btn-secondary";
            btn.onclick = function () {
                if (_that.currentPage == this.innerHTML) {
                    return;
                }
                var ele = document.getElementsByClassName("simple-page-control-pageBtns");
                var currentPageNum = parseInt(this.innerHTML);
                var middlePageNum = parseInt(ele[Math.floor(_that.realBtnCnt / 2)].innerHTML);
                var firstPageBtnNum = parseInt(ele[0].innerHTML);
                var lastPageBtnNum = parseInt(ele[_that.realBtnCnt - 1].innerHTML);
                var gap = Math.abs(parseInt(this.innerHTML) - parseInt(ele[Math.floor(_that.realBtnCnt / 2)].innerHTML));

                var gap1 = parseInt(_that.totalPage) - parseInt(ele[_that.realBtnCnt - 1].innerHTML);
                var gap2 = parseInt(ele[0].innerHTML) - 1;
                if (currentPageNum < middlePageNum) {//右移
                    if (firstPageBtnNum != 1) {
                        if (gap <= gap2) {
                            for (let i = 0; i < ele.length; i++) {
                                ele[i].innerHTML = parseInt(ele[i].innerHTML - gap);
                            }
                        }
                        else {
                            for (let i = 0; i < ele.length; i++) {
                                ele[i].innerHTML = i + 1;
                            }
                        }
                    }
                }
                if (currentPageNum > middlePageNum)//左移
                {
                    if (lastPageBtnNum != _that.totalPage) {
                        if (gap <= gap1) {
                            for (let i = 0; i < ele.length; i++) {
                                ele[i].innerHTML = gap + parseInt(ele[i].innerHTML);
                            }
                        }

                        else {
                            for (let i = 0; i < _that.realBtnCnt; i++) {
                                ele[i].innerHTML = _that.totalPage - _that.realBtnCnt + i + 1;
                            }
                        }
                    }
                }
                _that.currentPage = currentPageNum;
                _that.ChangeColor();
                _that.customClickEvent(_that.currentPage);
            }
            //console.log(_that.pageBtns);
            _that.pageBtns.push(btn);
            panel.appendChild(btn);
        }

        var btnNextPage = document.createElement("button");
        btnNextPage.innerHTML = "下一页";
        btnNextPage.className = "btnNextPage btn btn-secondary";
        btnNextPage.onclick = function () {
            if (_that.currentPage == _that.totalPage) {
                return;
            }
            else {
                var ele = document.getElementsByClassName("simple-page-control-pageBtns");
                for (let i = 0; i < ele.length; i++) {
                    if (parseInt(ele[i].innerHTML) == parseInt(_that.currentPage) + 1) {
                        ele[i].click();
                        break;
                    }
                }
                _that.ChangeColor();
            }
        }
        panel.appendChild(btnNextPage);

        var btnLastPage = document.createElement("button");
        btnLastPage.className = "btnLastPage btn btn-secondary";
        btnLastPage.innerHTML = "末页";
        btnLastPage.onclick = function () {
            console.log("末页按下");
            if (_that.currentPage == _that.totalPage)
                return;
            var ele = document.getElementsByClassName("simple-page-control-pageBtns");
            for (let i = 0; i < ele.length; i++) {
                ele[i].innerHTML = _that.totalPage - _that.realBtnCnt + i + 1;
            }
            _that.currentPage = _that.totalPage;
            _that.ChangeColor();
            _that.customClickEvent(_that.currentPage);
        }
        panel.appendChild(btnLastPage);
    }

    GoToPage(topage) {
        var _that = this;
        var ele = document.getElementsByClassName("simple-page-control-pageBtns");
        var gap = 0;
    }

    ChangeColor() {
        var _that = this;
        console.log("changecolor: " + _that.currentPage);
        var ele = document.getElementsByClassName("simple-page-control-pageBtns");
        for (var i = 0; i < ele.length; i++) {
            if (parseInt(ele[i].innerHTML) == _that.currentPage)
                ele[i].style.background = "pink";
            else
                ele[i].style.background = "white";
        }
    }
}