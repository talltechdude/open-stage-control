var _widgets_base = require('../common/_widgets_base'),
    widgetManager = require('../../managers/widgets'),
    osc = require('../../osc')


module.exports = class _switchers_base extends _widgets_base {

    constructor(options) {

        super(options)

        this._isSwitcher = true
        this.value = {_selected:false}
        this.linkedWidgets = typeof this.getProp('linkedWidgets') == 'object' ? this.getProp('linkedWidgets') : [this.getProp('linkedWidgets')]

        for (var i in this.getProp('values')) {

            this.value[this.getProp('values')[i]] = {}

        }

        $('body').on(`change.${this.hash}`,this.syncHandler.bind(this))


    }

    syncHandler(e) {

        var {id, widget} = e

        if (widget && this.value._selected !== false && this.value[this.value._selected] && widget._isSwitcher !== true && this.isWatching(id, widget)) {

            this.value[this.value._selected][id] = widget.abstract.getValue()

        }

    }


    onRemove() {

        $('body').off(`change.${this.hash}`)
        super.onRemove()

    }

    isWatching(id, widget) {

        if (this.linkedWidgets.indexOf(id) != -1) return true

        for (var k in this.linkedWidgets) {

            let widgets = widgetManager.getWidgetById(this.linkedWidgets[k])

            for (var i in widgets) {

                if (widgets[i].widget[0].contains(widget.widget[0])) return true

            }

        }
    }

    setValue(v, options={}) {

        let apply = false

        if (typeof v == 'object') {

            for (var k in this.value) {

                if (v.hasOwnProperty(k)) {

                    this.value[k] = v[k]
                    apply = true

                }

            }


        } else if (this.value[v] && v != '_selected') {

            this.value._selected = v
            apply = true

        }

        if (apply) this.applyState(this.value[this.value._selected], options)

    }


    applyState(state, options) {
        for (var id in state) {
            var value = state[id],
                widgets = widgetManager.getWidgetById(id)
            if (widgets.length) {
                for (var i=widgets.length-1;i>=0;i--) {
                    if (widgets[i].setValue) {
                        widgets[i].setValue(value,{sync:options.sync, send:options.send})
                    }
                }
            }
        }

        if (options.sync) this.widget.trigger({type:'change',id:this.getProp('id'),widget:this, linkId:this.getProp('linkId'), options:options})
        if (options.send) this.sendValue()

    }

    sendValue() {

        osc.sync({
            h:this.hash,
            v:this.value
        })

    }

}
