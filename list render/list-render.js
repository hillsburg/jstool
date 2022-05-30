console.log("artspace.top for-render. Designed by artspace.top");
class ForListRender {
    //This dic is used to store ?{fieldName} -- fieldName
    fieldValDic = {};
    //This dic is used to store index -- ?{fieldName}, because one field may appear more than once
    replaceDic = {};
    //原始模板
    rowTemplate = '';

    //template container id
    templateContainerId = '';

    //列表的容器对象
    listContainer;

    /**
     * constructor
     * @param pContainerId
     */
    constructor(pContainerId) {
        let container = document.getElementById(pContainerId);
        this.listContainer = container;
        this.rowTemplate = container.innerHTML;
    }
    setFieldValDic(key, val) {
        if (!this.fieldValDic.hasOwnProperty(key)) {
            this.fieldValDic[key] = val;
        }
    }
    setReplaceDic(key, val) {
        if (!this.replaceDic.hasOwnProperty(key)) {
            this.replaceDic[key] = val;
        }
    }
    /**
     * 
     * @param {Id of the container of list} containerId 
     * @param {Data of list} datas 
     */
    RenderList(datas) {
        var _that = this;
        //container.innerHTML = "";
        let index = 0;
        for (let j = 0; j < _that.rowTemplate.length; j++) {
            if (_that.rowTemplate.charAt(j) == '?' && _that.rowTemplate.charAt(j + 1) == '{') {
                let k = j + 2;
                while (_that.rowTemplate.charAt(k) != '}') {
                    k++;
                }
                if (k < _that.rowTemplate.length) {
                    let fieldName = _that.rowTemplate.substring(j + 2, k);
                    let b = '';
                    let replace = "?{" + fieldName + "}";
                    _that.setFieldValDic(replace, fieldName);
                    _that.setReplaceDic(index, replace);
                    index++;
                    j = k;
                }
            }
        }
        //console.log(obj.fieldValDic);
        //console.log(obj.replaceDic);
        var resultHtml = '';
        for (let i = 0; i < datas.length; i++) {
            console.log("datalength:" + datas.length);
            let templateVal = _that.rowTemplate;
            for (let key in _that.replaceDic) {
                let b = '';
                let fieldKey = _that.replaceDic[key];
                let fieldName = _that.fieldValDic[fieldKey];
                let val = Reflect.get(datas[i], fieldName, b);
                console.log(val);
                templateVal = templateVal.replace(_that.replaceDic[key], val);
            }
            resultHtml += templateVal;
        }
        _that.listContainer.innerHTML = resultHtml;
    }
}