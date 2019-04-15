/*
 * @Description: 浏览器api兼容代码封装--对基础的一些功能的封装，比如dom事件绑定、dom(操作):元素获取 、dom属性操作、dom尺寸操作....
 * @Author: Lxiaowei
 * @Github: https://github.com/LXY-1/baseCompatibleJs
 * @LastEditors: Lxiaowei
 * @Date: 2019-04-15 10:41:18
 * @LastEditTime: 2019-04-15 17:46:53
 * @version:'1.0.0'
 */
const baseJs = {
    eventUtil: {
        // 注册事件并绑定函数
        addHandler(element, type, handler) {
            if (element.addEventListener) { // dom2级
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) { // ie
                element.attachEvent('on' + type, handler);
            } else { //dom0级
                element['on' + type] = handler;
            }
        },
        // 删除事件绑定的相关函数
        removeHandler(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        }
    },
    // dom元素获取:模仿jq，使用css选择器来便捷的获取dom元素：目前只实现：类、id、标签是三种方式获取，更多的后面扩展，模仿jq
    domOperate: {
        /**
         * @description: get domElement：核心是使用不同的api来实现兼容不同浏览器，以及通过正则表达式来解析query，从而实现id、className、以及tagName等不同获取方式。支持css后代选择器功能。
         * @param {type} query:example:'.header img'
         * @return:
         */
        getDom(query) {
            if (document.querySelector) {
                return document.querySelector(query);
            } else {
                // 默认从document开始查找
                let elements = document;
                // 分割query子串，分别放到数组里面
                let queryArray = query.split(/ +/);
                for (let i = 0; i < queryArray.length; i++) {
                    var domName = queryArray[i];
                    elements = this.searchElements(domName,elements);
                }
                if(elements.length===0){
                    return elements[0];
                } else{
                    return elements;
                }
            }
        },
       
        
        /**
         * @description:根据domName以及对应的父元素来查询dom元素
         * @param {type} 
         * @return: 
         */
        searchElements(domName,parentNode){
           parentNode = parentNode || document;
           domName = domName.trim();
           var regExps = {
               id:/^#/,
               class:/^./
           }
           if(regExps.id.test(domName)){
               domName = domName.replace(/^\#/g,'');
               return parentNode.getElementById(domName);
           }else if(regExps.class.test(domName)){
               domName = domName.replace(/^./g,'');
               return this.getElementsByClassName(domName,parentNode);
           }else{
              return parentNode.getElementsByTagName(domName);
           }
        },
        /**
         * @description: 获取class元素的兼容方法
         * @param {type} 
         * @return: 
         */
        getElementsByClassName(className,parentNode){
             if (parentNode.getElementsByClassName) {
                 return parentNode.getElementsByClassName(className);
             } else {
                 //className：' btn default red ';
                 className = className.replace(/^ +| +$/,'');
                 var classAray = className.split(/ +/);
                 // 获取parentNode下的所有子元素
                 var eles = parentNode.getElementsByTagName("*");
                 for (let i = 0; i < classAray.length; i++) {
                     let classEles = [];
                     let reg = new RegExp("(^| )" + classArray[i] + "( |$)");
                     for (let j = 0; j < eles.length; j++) {
                         var ele = eles[j];
                         if(reg.test(ele.className)){
                             classEles.push(ele);
                         }
                     }
                     eles = classEles;
                 }
                 return eles;
             }
        }

    }

}