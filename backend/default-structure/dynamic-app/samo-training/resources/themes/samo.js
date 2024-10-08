const $_commonStyles = document.createElement('div');
$_commonStyles.setAttribute('style', 'display: none;');
$_commonStyles.innerHTML = "\
<custom-style>\
    <style is='custom-style'>\
        html {\
            -ms-text-size-adjust: 100%;\
            -webkit-text-size-adjust: 100%;\
        }\
\
        html, body {\
            color: var(--background-text-theme);\
            background-color: var(--background-theme);\
        }\
\
        html {\
            --paper-font-common-base: {\
                font-family: 'Roboto', 'Noto', sans-serif;\
                -webkit-font-smoothing: antialiased;\
            };\
\
            --paper-font-common : 'Roboto', 'Noto', sans-serif;\
\
		    /* ASSECO color palette */\
		    --asseco-blue: #00a3e0;\
\
            /* Material Design color palette from online spec document */\
            --paper-red-50: #ffebee;\
            --paper-red-100: #ffcdd2;\
            --paper-red-200: #ef9a9a;\
            --paper-red-300: #e57373;\
            --paper-red-400: #ef5350;\
            --paper-red-500: #f44336;\
            --paper-red-600: #e53935;\
            --paper-red-700: #d32f2f;\
            --paper-red-800: #c62828;\
            --paper-red-900: #b71c1c;\
            --paper-red-a100: #ff8a80;\
            --paper-red-a200: #ff5252;\
            --paper-red-a400: #ff1744;\
            --paper-red-a700: #d50000;\
\
            --paper-pink-50: #fce4ec;\
            --paper-pink-100: #f8bbd0;\
            --paper-pink-200: #f48fb1;\
            --paper-pink-300: #f06292;\
            --paper-pink-400: #ec407a;\
            --paper-pink-500: #e91e63;\
            --paper-pink-600: #d81b60;\
            --paper-pink-700: #c2185b;\
            --paper-pink-800: #ad1457;\
            --paper-pink-900: #880e4f;\
            --paper-pink-a100: #ff80ab;\
            --paper-pink-a200: #ff4081;\
            --paper-pink-a400: #f50057;\
            --paper-pink-a700: #c51162;\
\
            --paper-purple-50: #f3e5f5;\
            --paper-purple-100: #e1bee7;\
            --paper-purple-200: #ce93d8;\
            --paper-purple-300: #ba68c8;\
            --paper-purple-400: #ab47bc;\
            --paper-purple-500: #9c27b0;\
            --paper-purple-600: #8e24aa;\
            --paper-purple-700: #7b1fa2;\
            --paper-purple-800: #6a1b9a;\
            --paper-purple-900: #4a148c;\
            --paper-purple-a100: #ea80fc;\
            --paper-purple-a200: #e040fb;\
            --paper-purple-a400: #d500f9;\
            --paper-purple-a700: #aa00ff;\
\
            --paper-deep-purple-50: #ede7f6;\
            --paper-deep-purple-100: #d1c4e9;\
            --paper-deep-purple-200: #b39ddb;\
            --paper-deep-purple-300: #9575cd;\
            --paper-deep-purple-400: #7e57c2;\
            --paper-deep-purple-500: #673ab7;\
            --paper-deep-purple-600: #5e35b1;\
            --paper-deep-purple-700: #512da8;\
            --paper-deep-purple-800: #4527a0;\
            --paper-deep-purple-900: #311b92;\
            --paper-deep-purple-a100: #b388ff;\
            --paper-deep-purple-a200: #7c4dff;\
            --paper-deep-purple-a400: #651fff;\
            --paper-deep-purple-a700: #6200ea;\
\
            --paper-indigo-50: #e8eaf6;\
            --paper-indigo-100: #c5cae9;\
            --paper-indigo-200: #9fa8da;\
            --paper-indigo-300: #7986cb;\
            --paper-indigo-400: #5c6bc0;\
            --paper-indigo-500: #3f51b5;\
            --paper-indigo-600: #3949ab;\
            --paper-indigo-700: #303f9f;\
            --paper-indigo-800: #283593;\
            --paper-indigo-900: #1a237e;\
            --paper-indigo-a100: #8c9eff;\
            --paper-indigo-a200: #536dfe;\
            --paper-indigo-a400: #3d5afe;\
            --paper-indigo-a700: #304ffe;\
\
            --paper-blue-50: #e3f2fd;\
            --paper-blue-100: #bbdefb;\
            --paper-blue-200: #90caf9;\
            --paper-blue-300: #64b5f6;\
            --paper-blue-400: #42a5f5;\
            --paper-blue-500: #2196f3;\
            --paper-blue-600: #1e88e5;\
            --paper-blue-700: #1976d2;\
            --paper-blue-800: #1565c0;\
            --paper-blue-900: #0d47a1;\
            --paper-blue-a100: #82b1ff;\
            --paper-blue-a200: #448aff;\
            --paper-blue-a400: #2979ff;\
            --paper-blue-a700: #2962ff;\
\
            --paper-light-blue-50: #e1f5fe;\
            --paper-light-blue-100: #b3e5fc;\
            --paper-light-blue-200: #81d4fa;\
            --paper-light-blue-300: #4fc3f7;\
            --paper-light-blue-400: #29b6f6;\
            --paper-light-blue-500: #03a9f4;\
            --paper-light-blue-600: #039be5;\
            --paper-light-blue-700: #0288d1;\
            --paper-light-blue-800: #0277bd;\
            --paper-light-blue-900: #01579b;\
            --paper-light-blue-a100: #80d8ff;\
            --paper-light-blue-a200: #40c4ff;\
            --paper-light-blue-a400: #00b0ff;\
            --paper-light-blue-a700: #0091ea;\
\
            --paper-cyan-50: #e0f7fa;\
            --paper-cyan-100: #b2ebf2;\
            --paper-cyan-200: #80deea;\
            --paper-cyan-300: #4dd0e1;\
            --paper-cyan-400: #26c6da;\
            --paper-cyan-500: #00bcd4;\
            --paper-cyan-600: #00acc1;\
            --paper-cyan-700: #0097a7;\
            --paper-cyan-800: #00838f;\
            --paper-cyan-900: #006064;\
            --paper-cyan-a100: #84ffff;\
            --paper-cyan-a200: #18ffff;\
            --paper-cyan-a400: #00e5ff;\
            --paper-cyan-a700: #00b8d4;\
\
            --paper-teal-50: #e0f2f1;\
            --paper-teal-100: #b2dfdb;\
            --paper-teal-200: #80cbc4;\
            --paper-teal-300: #4db6ac;\
            --paper-teal-400: #26a69a;\
            --paper-teal-500: #009688;\
            --paper-teal-600: #00897b;\
            --paper-teal-700: #00796b;\
            --paper-teal-800: #00695c;\
            --paper-teal-900: #004d40;\
            --paper-teal-a100: #a7ffeb;\
            --paper-teal-a200: #64ffda;\
            --paper-teal-a400: #1de9b6;\
            --paper-teal-a700: #00bfa5;\
\
            --paper-green-50: #e8f5e9;\
            --paper-green-100: #c8e6c9;\
            --paper-green-200: #a5d6a7;\
            --paper-green-300: #81c784;\
            --paper-green-400: #66bb6a;\
            --paper-green-500: #4caf50;\
            --paper-green-600: #43a047;\
            --paper-green-700: #388e3c;\
            --paper-green-800: #2e7d32;\
            --paper-green-900: #1b5e20;\
            --paper-green-a100: #b9f6ca;\
            --paper-green-a200: #69f0ae;\
            --paper-green-a400: #00e676;\
            --paper-green-a700: #00c853;\
\
            --paper-light-green-50: #f1f8e9;\
            --paper-light-green-100: #dcedc8;\
            --paper-light-green-200: #c5e1a5;\
            --paper-light-green-300: #aed581;\
            --paper-light-green-400: #9ccc65;\
            --paper-light-green-500: #8bc34a;\
            --paper-light-green-600: #7cb342;\
            --paper-light-green-700: #689f38;\
            --paper-light-green-800: #558b2f;\
            --paper-light-green-900: #33691e;\
            --paper-light-green-a100: #ccff90;\
            --paper-light-green-a200: #b2ff59;\
            --paper-light-green-a400: #76ff03;\
            --paper-light-green-a700: #64dd17;\
\
            --paper-lime-50: #f9fbe7;\
            --paper-lime-100: #f0f4c3;\
            --paper-lime-200: #e6ee9c;\
            --paper-lime-300: #dce775;\
            --paper-lime-400: #d4e157;\
            --paper-lime-500: #cddc39;\
            --paper-lime-600: #c0ca33;\
            --paper-lime-700: #afb42b;\
            --paper-lime-800: #9e9d24;\
            --paper-lime-900: #827717;\
            --paper-lime-a100: #f4ff81;\
            --paper-lime-a200: #eeff41;\
            --paper-lime-a400: #c6ff00;\
            --paper-lime-a700: #aeea00;\
\
            --paper-yellow-50: #fffde7;\
            --paper-yellow-100: #fff9c4;\
            --paper-yellow-200: #fff59d;\
            --paper-yellow-300: #fff176;\
            --paper-yellow-400: #ffee58;\
            --paper-yellow-500: #ffeb3b;\
            --paper-yellow-600: #fdd835;\
            --paper-yellow-700: #fbc02d;\
            --paper-yellow-800: #f9a825;\
            --paper-yellow-900: #f57f17;\
            --paper-yellow-a100: #ffff8d;\
            --paper-yellow-a200: #ffff00;\
            --paper-yellow-a400: #ffea00;\
            --paper-yellow-a700: #ffd600;\
\
            --paper-amber-50: #fff8e1;\
            --paper-amber-100: #ffecb3;\
            --paper-amber-200: #ffe082;\
            --paper-amber-300: #ffd54f;\
            --paper-amber-400: #ffca28;\
            --paper-amber-500: #ffc107;\
            --paper-amber-600: #ffb300;\
            --paper-amber-700: #ffa000;\
            --paper-amber-800: #ff8f00;\
            --paper-amber-900: #ff6f00;\
            --paper-amber-a100: #ffe57f;\
            --paper-amber-a200: #ffd740;\
            --paper-amber-a400: #ffc400;\
            --paper-amber-a700: #ffab00;\
\
            --paper-orange-50: #fff3e0;\
            --paper-orange-100: #ffe0b2;\
            --paper-orange-200: #ffcc80;\
            --paper-orange-300: #ffb74d;\
            --paper-orange-400: #ffa726;\
            --paper-orange-500: #ff9800;\
            --paper-orange-600: #fb8c00;\
            --paper-orange-700: #f57c00;\
            --paper-orange-800: #ef6c00;\
            --paper-orange-900: #e65100;\
            --paper-orange-a100: #ffd180;\
            --paper-orange-a200: #ffab40;\
            --paper-orange-a400: #ff9100;\
            --paper-orange-a700: #ff6500;\
\
            --paper-deep-orange-50: #fbe9e7;\
            --paper-deep-orange-100: #ffccbc;\
            --paper-deep-orange-200: #ffab91;\
            --paper-deep-orange-300: #ff8a65;\
            --paper-deep-orange-400: #ff7043;\
            --paper-deep-orange-500: #ff5722;\
            --paper-deep-orange-600: #f4511e;\
            --paper-deep-orange-700: #e64a19;\
            --paper-deep-orange-800: #d84315;\
            --paper-deep-orange-900: #bf360c;\
            --paper-deep-orange-a100: #ff9e80;\
            --paper-deep-orange-a200: #ff6e40;\
            --paper-deep-orange-a400: #ff3d00;\
            --paper-deep-orange-a700: #dd2c00;\
\
            --paper-brown-50: #efebe9;\
            --paper-brown-100: #d7ccc8;\
            --paper-brown-200: #bcaaa4;\
            --paper-brown-300: #a1887f;\
            --paper-brown-400: #8d6e63;\
            --paper-brown-500: #795548;\
            --paper-brown-600: #6d4c41;\
            --paper-brown-700: #5d4037;\
            --paper-brown-800: #4e342e;\
            --paper-brown-900: #3e2723;\
\
            --paper-grey-50: #fafafa;\
            --paper-grey-100: #f5f5f5;\
            --paper-grey-200: #eeeeee;\
            --paper-grey-300: #e0e0e0;\
            --paper-grey-400: #bdbdbd;\
            --paper-grey-500: #9e9e9e;\
            --paper-grey-600: #757575;\
            --paper-grey-700: #616161;\
            --paper-grey-800: #424242;\
            --paper-grey-900: #212121;\
\
            --paper-blue-grey-50: #eceff1;\
            --paper-blue-grey-100: #cfd8dc;\
            --paper-blue-grey-200: #b0bec5;\
            --paper-blue-grey-300: #90a4ae;\
            --paper-blue-grey-400: #78909c;\
            --paper-blue-grey-500: #607d8b;\
            --paper-blue-grey-600: #546e7a;\
            --paper-blue-grey-700: #455a64;\
            --paper-blue-grey-800: #37474f;\
            --paper-blue-grey-900: #263238;\
\
            /* opacity for dark text on a light background */\
            --dark-divider-opacity: 0.12;\
            --dark-disabled-opacity: 0.38; /* or hint text or icon */\
            --dark-secondary-opacity: 0.54;\
            --dark-primary-opacity: 0.87;\
            --dark-inactive-opacity: 0.38;\
\
            /* opacity for light text on a dark background */\
            --light-divider-opacity: 0.12;\
            --light-disabled-opacity: 0.3; /* or hint text or icon */\
            --light-secondary-opacity: 0.7;\
            --light-primary-opacity: 1.0;\
            --light-inactive-opacity: 0.5;\
        }\
\
        html {\
            /* COMMON DEFINITIONS */\
            --text-primary-light-color:     rgba(0, 0, 0, var(--dark-primary-opacity));\
            --text-secondary-light-color:   rgba(0, 0, 0, var(--dark-secondary-opacity));\
            --text-disabled-light-color:    rgba(0, 0, 0, var(--dark-disabled-opacity));\
            --dividers-light-color:         rgba(0, 0, 0, var(--dark-divider-opacity));\
\
            --text-primary-dark-color:      rgba(255, 255, 255, var(--light-primary-opacity));\
            --text-secondary-dark-color:    rgba(255, 255, 255, var(--light-secondary-opacity));\
            --text-disabled-dark-color:     rgba(255, 255, 255, var(--light-disabled-opacity));\
            --dividers-dark-color:          rgba(255, 255, 255, var(--light-divider-opacity));\
\
            --icon-active-light-color:      rgba(0, 0, 0, var(--dark-secondary-opacity));\
            --icon-inactive-light-color:    rgba(0, 0, 0, var(--dark-inactive-opacity));\
            --icon-active-dark-color:       rgba(255, 255, 255, var(--light-primary-opacity));\
            --icon-inactive-dark-color:     rgba(255, 255, 255, var(--light-inactive-opacity));\
\
            --background-status-light-theme:    #E0E0E0;\
            --background-appbar-light-theme:    #F5F5F5;\
            --background-light-theme:           #FAFAFA;\
            --background-card-light-theme:      #FFFFFF;\
            --background-sidebar-light-theme:   var(--background-appbar-light-theme);\
\
            --background-status-dark-theme:     #000000;\
            --background-appbar-dark-theme:     #212121;\
            --background-dark-theme:            #303030;\
            --background-card-dark-theme:       #424242;\
            --background-sidebar-dark-theme:   var(--background-card-dark-theme);\
\
            /* CUSTOMIZATION PART */\
            --background-status-theme:  var(--background-status-light-theme) !important;\
            --background-appbar-theme:  var(--background-appbar-light-theme) !important;\
            --background-theme:         var(--background-light-theme) !important;\
            --background-card-theme:    var(--background-card-light-theme) !important;\
            --background-sidebar-theme: var(--background-sidebar-light-theme) !important;\
            --dividers-color:           var(--dividers-light-color) !important;\
            --disabled-opacity:         var(--light-disabled-opacity) !important;\
\
            --background-text-theme:    var(--text-primary-light-color) !important;\
            --primary-text-color: var(--text-primary-light-color) !important;\
            --secondary-text-color: var(--text-secondary-light-color) !important;\
            --disabled-text-color: var(--text-secondary-light-color) !important;\
\
            --primary-light-color: rgba(156,39,176,0.7) !important;\
            --primary-light-color-text: var(--text-primary-light-color) !important;\
            --primary-color: rgba(156,39,176,1) !important;\
            --primary-color-text: var(--text-primary-dark-color) !important;\
            --primary-dark-color: var(--paper-light-blue-700) !important;\
            --primary-dark-color-text: var(--text-primary-dark-color) !important;\
\
            --accent-light-color: var(--paper-light-green-100) !important;\
            --accent-light-color-text: var(--text-primary-light-color) !important;\
            --accent-color: rgba(73,116,165,1) !important;\
            --accent-color-text: var(--text-primary-dark-color) !important;\
            --accent-dark-color: var(--paper-light-green-700) !important;\
            --accent-dark-color-text: var(--text-primary-light-color) !important;\
\
            --test: var(--paper-deep-orange-500) !important;\
            --error-color: var(--paper-deep-orange-500) !important;\
            --error-color-text: var(--text-primary-dark-color) !important;\
\
            /* PAPER STYLING*/\
            --paper-menu-background-color: var(--background-theme) !important;\
\
            --paper-card-header-color: var(--background-text-theme) !important;\
            --paper-card-background-color: var(--background-card-theme) !important;\
            --paper-card-content: {\
                color: var(--background-text-theme) !important;\
            }\
\
            --paper-listbox-background-color: var(--background-card-theme);\
            --main-toolbar-background-color: rgba(156,39,176,1);\
            --main-toolbar-color: rgba(255,255,255,1);\
\
            /* TABLE IN MARKDOWN CONTENT*/\
            --markdown-table-width:             100%;\
            --markdown-table-border:            black 1px solid;\
            --markdown-table-border-collapse:   collapse;\
            --markdown-th-border:               black 1px solid;\
            --markdown-td-border:               black 1px solid;\
\
            /* PROGRESS BAR COLOR */\
            --app-progress-color: #CCFF00;\
        }\
    </style>\
</custom-style>";
document.head.appendChild($_commonStyles);

const $_templateStyles = document.createElement('template');
$_templateStyles.innerHTML = "<dom-module id='theme-styles'>\
<template>\
<style>\
:host {\
    --primary-color: rgba(0,167,174,1);\
    --accent-color: rgba(19,165,56,1);\
}\
</style>\
</template>\
</dom-module>";
document.head.appendChild($_templateStyles);
