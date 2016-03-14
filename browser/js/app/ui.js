var actions = require('./actions'),
    icon = require('./utils').icon

var sidepanel = require('./sidepanel').init

// Tabs...
var tabs = function() {
    $('.tablist a').click(function(){

        var id = $(this).data('tab')
        $(id).siblings('.on').removeClass('on')
        $(id).addClass('on')
        $(this).parents('ul').find('.on').removeClass('on')
        $(this).addClass('on');$(this).parent().addClass('on')

    })
}

// horizontal scrolling & zoom with mousewheel
// if shift is pressed (native), or if there is no vertical scrollbar,
//                               or if mouse is on h-scrollbar
var scrollbarHeight = 20
var scrolls = function(){
    if (WEBFRAME) {
        $('html').on('mousewheel.zoom',function(e) {
            // console.log(e)
            if (e.ctrlKey) {
                e.preventDefault()
                if (e.originalEvent.deltaY==0) return
                var d = -e.originalEvent.deltaY/Math.abs(e.originalEvent.deltaY)/20,
                    s = d+WEBFRAME.getZoomFactor()
                WEBFRAME.setZoomFactor(s)

            }
        })
        $(document).on('keydown.resetzoom', function(e){
            if (e.keyCode==96||e.keyCode==48) WEBFRAME.setZoomFactor(1)
        })

    }
}


module.exports = {
    init: function(){
        sidepanel()
        tabs()
        scrolls()
    },
    tabs:tabs,
    scrolls:scrolls
}