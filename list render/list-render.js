console.log("artspace.top for-render. Designed by artspace.top");

class ForRenderFieldValDic {
    //This dic is used to store ?{fieldName} -- fieldName
    fieldValDic = {};
    //This dic is used to store index -- ?{fieldName}, because one field may appear more than once
    replaceDic = {};
    //cctor
    FieldValDic() {
        
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
}
/**
 * 
 * @param {Id of the container of list} containerId 
 * @param {Data of list} datas 
 */
function RenderList(containerId, datas) {
    var container = document.getElementById(containerId);
    var contentHtml = container.innerHTML;
    var result = "";
    var obj = new ForRenderFieldValDic();
    var index = 0;
    for (let j = 0; j < contentHtml.length; j++) {
        if (contentHtml.charAt(j) == '?' && contentHtml.charAt(j + 1) == '{') {
            var k = j + 2;
            while (contentHtml.charAt(k) != '}') {
                k++;
            }
            if (k < contentHtml.length) {
                var fieldName = contentHtml.substring(j + 2, k);
                var b = '';
                var replace = "?{" + fieldName + "}";
                obj.setFieldValDic(replace, fieldName);
                obj.setReplaceDic(index, replace);
                index++;
                j = k;
            }
        }
    }
    console.log(obj.fieldValDic);
    console.log(obj.replaceDic);
    var resultHtml = '';
    for (let i = 0; i < datas.length; i++) {
        let template = contentHtml;
        let templateVal = contentHtml;
        for (let key in obj.replaceDic) {
            let b = '';
            let fieldKey = obj.replaceDic[key];
            let fieldName = obj.fieldValDic[fieldKey];
            let val = Reflect.get(datas[i], fieldName, b);
            console.log(val);
            templateVal = templateVal.replace(obj.replaceDic[key], val);
        }
        resultHtml += templateVal;
    }
    container.innerHTML = resultHtml;
}