module.exports.widgets = {
    // tabs
    tab: require('./containers/tab'),
    root: require('./containers/root'),

    // sliders
    fader: require('./sliders/fader'),
    knob: require('./sliders/knob'),
    encoder: require('./sliders/encoder'),

    // buttons
    toggle: require('./buttons/toggle'),
    push: require('./buttons/push'),
    switch: require('./buttons/switch'),
    dropdown: require('./buttons/dropdown'),

    // pads
    xy: require('./pads/xy'),
    rgb: require('./pads/rgb'),
    multixy: require('./pads/multixy'),

    // matrices
    multitoggle: require('./matrices/multitoggle'),
    multipush: require('./matrices/multipush'),
    multifader: require('./matrices/multifader'),
    keyboard: require('./matrices/keyboard'),

    // plots
    led: require('./plots/led'),
    rgbled: require('./plots/rgbled'),
    plot: require('./plots/plot'),
    eq: require('./plots/eq'),
    visualizer: require('./plots/visualizer'),
    meter: require('./plots/meter'),
    text: require('./plots/text'),

    // containers
    strip: require('./containers/strip'),
    panel: require('./containers/panel'),
    modal: require('./containers/modal'),
    clone: require('./containers/clone'),

    // state switchers
    switcher: require('./switchers/switcher'),
    crossfader: require('./switchers/crossfader'),

    // inputs
    input: require('./inputs/input'),

    // maths
    formula: require('./maths/formula')

}

module.exports.categories = {
    'Sliders':['fader','knob', 'encoder'],
    'Buttons':['toggle','push','switch', 'dropdown'],
    'Pads':['xy','rgb','multixy'],
    'Matrices':['multifader','multitoggle','multipush', 'keyboard'],
    'Plots':['plot','eq','visualizer','led', 'rgbled','meter','text'],
    'Containers':['panel','strip','modal', 'clone'],
    'Switchers':['switcher','crossfader'],
    'Inputs':['input'],
    'Maths':['formula']
}
