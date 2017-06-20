/**
 * Created by LiYonglei on 2017/6/20.
 * 动态画出svg图形
 * @param dom 要画出的元素
 * @param segmentLength 绘画的每一段的长度
 * @param dur 动画执行的秒数
 * */
function drawSVG(dom,segmentLength,dur){
    /*若浏览器支持svg动画(例如chrome,firefox),那么使用svg动画*/
    if(window.SVGAnimateElement){
        (function(){
            var animateElement=document.createElementNS("http://www.w3.org/2000/svg","animate");
            animateElement.setAttribute("attributeName","stroke-dasharray");
            animateElement.setAttribute("additive","replace");
            animateElement.setAttribute("fill","freeze");
            animateElement.setAttribute("from","0 "+segmentLength);
            animateElement.setAttribute("to",segmentLength+" 0");
            animateElement.setAttribute("dur",dur);
            dom.appendChild(animateElement);
        }())
    }else{
        /*若浏览器不支持svg动画(例如ie),那么改变元素的自身的stroke-dasharray属性值*/
        (function (){
            var i= 0,
                preTime=20,
                preTranslate=segmentLength/(dur*1000/preTime),
                t=setInterval(function(){
                    var currentLength=(++i)*preTranslate;
                    if(currentLength>=segmentLength){
                        clearInterval(t);
                        currentLength=segmentLength;
                    }
                    dom.setAttribute("stroke-dasharray",currentLength+" "+(segmentLength-currentLength));
                },preTime);
            dom.setAttribute("stroke-dasharray","0");
        }())
    }
}