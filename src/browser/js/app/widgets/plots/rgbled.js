var {mapToScale} = require('../utils'),
    _widgets_base = require('../common/_widgets_base'),
    widgetManager = require('../../managers/widgets'),
    {clip} = require('../utils')

module.exports = class Rbgled extends _widgets_base {

    static defaults() {

        return {
            type:'rgbled',
            id:'auto',

            _geometry:'geometry',

            left:'auto',
            top:'auto',
            width:'auto',
            height:'auto',

            _style:'style',

            label:'auto',
            css:'',

            _rgbled:'rgbled',

            widgetId:'',
            value:'',

            _osc:'osc',

            preArgs:[],
            address:'auto'

        }

    }

    constructor(options) {

        var html = `
            <div class="led">
            </div>
        `

        super({...options, html: html})

        if (this.getProp('widgetId').length) $('body').on(`change.${this.hash}`,this.syncHandle.bind(this))

        this.setValue([0,0,0,0])

    }

    onRemove() {

        $('body').off(`change.${this.hash}`)
        super.onRemove()

    }

    syncHandle(e) {

        if (this.getProp('widgetId')!=e.id || !widgetManager.getWidgetById(e.id).length) return

        var widget = widgetManager.getWidgetById(e.id),
            value

        for (var i=widget.length-1; i>=0; i--) {
            if (widget[i].getValue) {
                this.setValue(widget[i].getValue())
                return
            }
        }

    }
    setValue(v) {

        var c = ''

        if (Array.isArray(v) && v.length >= 3) {

            for (let i in [0,1,2]) {
                v[i] = parseInt(clip(v[i],[0,255]))
            }

            v[3] = clip(v[3] != undefined ? v[3] : 1,[0,1])

            c = `rgba(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]})`

        } else if (typeof v == 'string') {

            c = v


        } else {

            return

        }

        this.value = v

        this.widget[0].style.setProperty('--color-custom', c)

    }

}
