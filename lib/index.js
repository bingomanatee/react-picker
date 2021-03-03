(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('@wonderlandlabs/looking-glass-engine'), require('lodash.isequal')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types', '@wonderlandlabs/looking-glass-engine', 'lodash.isequal'], factory) :
  (global = global || self, global.LGE = factory(global.React, global.PropTypes, global.lookingGlassEngine, global.isEqual));
}(this, (function (React, PropTypes, lookingGlassEngine, isEqual) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;
  isEqual = isEqual && Object.prototype.hasOwnProperty.call(isEqual, 'default') ? isEqual['default'] : isEqual;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ChoiceContext = /*#__PURE__*/React__default.createContext({});

  function SvgCheckOff(props) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      width: 24,
      height: 24
    }, props), /*#__PURE__*/React.createElement("rect", {
      x: 1,
      y: 1,
      width: 20,
      height: 20,
      rx: 6,
      transform: "translate(1 1)",
      fill: "#FFF",
      stroke: "#D6D6D6",
      strokeWidth: 2,
      fillRule: "evenodd"
    }));
  }

  function SvgCheckOn(props) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      width: 24,
      height: 24
    }, props), /*#__PURE__*/React.createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React.createElement("rect", {
      x: 1,
      y: 1,
      width: 20,
      height: 20,
      rx: 6,
      transform: "translate(1 1)",
      fill: "#FFF",
      stroke: "#D6D6D6",
      strokeWidth: 2
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 7v2.114L11.494 20.619 7.96 17.084l.366-.367-5.872-5.87L5.99 7.31l5.871 5.87 9.872-9.87A5.974 5.974 0 0123 7z",
      fill: "#335F00"
    })));
  }

  function SvgRadioOff(props) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      width: 24,
      height: 24
    }, props), /*#__PURE__*/React.createElement("circle", {
      cx: 11,
      cy: 11,
      r: 10,
      transform: "translate(0 1)",
      fill: "#FFF",
      stroke: "#D6D6D6",
      strokeWidth: 2,
      fillRule: "evenodd"
    }));
  }

  function SvgRadioOn(props) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      width: 24,
      height: 24
    }, props), /*#__PURE__*/React.createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: 11,
      cy: 11,
      r: 10,
      transform: "translate(1 1)",
      fill: "#FFF",
      stroke: "#D6D6D6",
      strokeWidth: 2
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20.734 5.311a10.947 10.947 0 012.128 4.942L11.495 21.619 7.96 18.084l.366-.367-5.872-5.87L5.99 8.31l5.871 5.87z",
      fill: "#417505"
    })));
  }

  var ChoiceItem = function ChoiceItem(_ref) {
    var active = _ref.active,
        children = _ref.children,
        _onClick = _ref.onClick,
        disabled = _ref.disabled;
    var Icon;

    var _useContext = React.useContext(ChoiceContext),
        store = _useContext.store;

    if (active) {
      if (store.my.chooseOne) {
        Icon = SvgRadioOn;
      } else {
        Icon = SvgCheckOn;
      }
    } else if (store.my.chooseOne) {
      Icon = SvgRadioOff;
    } else {
      Icon = SvgCheckOff;
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: "picker__item",
      active: active,
      disabled: disabled,
      onClick: function onClick() {
        if (!disabled) _onClick.apply(void 0, arguments);
      }
    }, /*#__PURE__*/React__default.createElement(Icon, null), /*#__PURE__*/React__default.createElement("label", {
      disabled: disabled
    }, children));
  };

  ChoiceItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  };
  ChoiceItem.defaultProps = {
    active: false,
    disabled: false
  };

  var EmptyMessage = (function (_ref) {
    var children = _ref.children;
    return /*#__PURE__*/React__default.createElement("p", {
      className: "picker__empty"
    }, children || 'no options');
  });

  var ChoiceMenu = function ChoiceMenu(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/React__default.createElement("section", {
      className: "picker__container"
    }, children);
  };

  ChoiceMenu.propTypes = {
    children: PropTypes.any
  };

  /* eslint-disable react/forbid-prop-types */

  var ChoiceContainer = function ChoiceContainer(_ref) {
    var _ref$ChoiceItem = _ref.ChoiceItem,
        ChoiceItem = _ref$ChoiceItem === void 0 ? ChoiceItem : _ref$ChoiceItem,
        _ref$ChoiceMenu = _ref.ChoiceMenu,
        ChoiceMenu = _ref$ChoiceMenu === void 0 ? ChoiceMenu : _ref$ChoiceMenu,
        _ref$EmptyMessage = _ref.EmptyMessage,
        EmptyMessage = _ref$EmptyMessage === void 0 ? EmptyMessage() : _ref$EmptyMessage;

    var _useContext = React.useContext(ChoiceContext),
        value = _useContext.value,
        store = _useContext.store;

    if (!value) return '';
    var display = value.display;

    if (!display) {
      return '';
    }

    var displayedOptions = store.my.optionsFilter(value.options, value, store);

    if (!(displayedOptions && displayedOptions.length)) {
      return /*#__PURE__*/React__default.createElement(ChoiceMenu, null, /*#__PURE__*/React__default.createElement(EmptyMessage, {
        onClick: function onClick() {
          return store["do"].setDisplay(false);
        }
      }, "No Choices"));
    }

    return /*#__PURE__*/React__default.createElement(ChoiceMenu, null, displayedOptions.map(function (option, i) {
      var active = value.choices.some(function (choice) {
        return store.my.comparator(choice, option);
      });
      var label = store.my.optionToLabel(option, i, store);
      return /*#__PURE__*/React__default.createElement(ChoiceItem, {
        key: "".concat(label, "_").concat(i),
        store: store,
        active: active,
        option: option,
        disabled: store.my.optionDisabled(option, i, store),
        onClick: function onClick() {
          return store["do"].chooseOption(option);
        }
      }, store.my.optionToLabel(option, i, store));
    }));
  };

  ChoiceContainer.propTypes = {
    ChoiceItem: PropTypes.any,
    ChoiceMenu: PropTypes.any,
    EmptyMessage: PropTypes.any
  };
  ChoiceContainer.defaultProps = {
    ChoiceItem: ChoiceItem,
    EmptyMessage: EmptyMessage,
    ChoiceMenu: ChoiceMenu
  };

  var defaultOptionToLabel = function defaultOptionToLabel(option) {
    if (typeof option === 'string' || typeof option === 'number') return option;

    if (_typeof(option) === 'object') {
      if ('label' in option) return option.label;
      if (typeof option.toString === 'function') return option.toString();
    }

    return "".concat(option);
  };

  var defaultOptionToChoice = function defaultOptionToChoice(option) {
    return option;
  };

  var defaultOptionsFilter = function defaultOptionsFilter(list) {
    return _toConsumableArray(list);
  };

  var defaultOptionDisabled = function defaultOptionDisabled() {
    return false;
  };

  var f = function f(target, name, defaultValue) {
    if (target && typeof target[name] === 'function') {
      return target[name];
    }

    return defaultValue;
  };

  var storeFactory = (function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var optionsFilter = f(props, 'optionsFilter', defaultOptionsFilter);
    var optionToChoice = f(props, 'optionToChoice', defaultOptionToChoice);
    var comparator = f(props, 'comparator', isEqual);
    var optionToLabel = f(props, 'optionToLabel', defaultOptionToLabel);
    var optionDisabled = f(props, 'optionDisabled', defaultOptionDisabled);
    var options = props.options || [];
    var choices = props.choices || [];
    var state = lookingGlassEngine.addActions(new lookingGlassEngine.ValueObjectStream({
      options: options,
      // entire population
      choices: choices,
      // chosen items
      display: !!props.display,
      chooseOne: !!props.chooseOne,
      comparator: comparator,
      optionsFilter: optionsFilter,
      optionToChoice: optionToChoice,
      optionToLabel: optionToLabel,
      optionDisabled: optionDisabled,
      closeOnClick: !!props.closeOnClick
    }), {
      /**
         * adds (or removes) a choice into the choices based on an option
         *  note - there is no filtering/consequence for adding an option that
         * is not in the options.
         */
      chooseOption: function chooseOption(store, option) {
        if (store.my.chooseOne) {
          var choice = store.my.optionToChoice(option);
          store["do"].setChoices([choice]);
          return;
        }

        store["do"].toggleOption(option);
      },

      /**
         * adds an option - but unlike chooseOption, doesn't remove it if its already present
         */
      addOption: function addOption(store, option) {
        var newChoice = store.my.optionToChoice(option);

        if (store.my.chooseOne) {
          store["do"].setChoices([newChoice]);
          return;
        }

        var isActive = store.my.choices.some(function (choice) {
          return store.my.comparator(choice, newChoice);
        });

        if (!isActive) {
          store["do"].setChoices([].concat(_toConsumableArray(store.my.choices), [newChoice]));
        }
      },
      toggleOption: function toggleOption(store, option) {
        var newChoice = store.my.optionToChoice(option);
        var isActive = store.my.choices.some(function (choice) {
          return store.my.comparator(choice, newChoice);
        });

        if (isActive) {
          if (store.my.chooseOne) {
            store["do"].setChoices([]);
          } else {
            // remove choices that equate to how we would store the option
            store["do"].setChoices(store.my.choices.filter(function (choice) {
              return !store.my.comparator(choice, newChoice);
            }));
          }
        } else if (store.my.chooseOne) {
          store["do"].setChoices([newChoice]);
        } else {
          store["do"].setChoices([].concat(_toConsumableArray(store.my.choices), [newChoice]));
        }
      },
      toggleDisplay: function toggleDisplay(store) {
        store["do"].setDisplay(!store.my.display);
      },
      addAll: function addAll(store) {
        store["do"].setChoices(_toConsumableArray(store.my.options));
      },
      remAll: function remAll(store) {
        store["do"].setChoices([]);
      }
    });
    state.addFieldSubject('options', new lookingGlassEngine.ValueStream(options));
    state.addFieldSubject('choices', new lookingGlassEngine.ValueStream(choices));
    return state;
  });

  var snuff = function snuff(event) {
    try {
      if (!event) return;
      if (event.stopPropogation) event.stopPropogation();
      if (event.preventDefault) event.preventDefault();

      if (event.nativeEvent) {
        snuff(event.nativeEvent);
      }
    } catch (err) {
      console.log('snuff error: ', err);
    }
  };

  var StopEvents = (function (_ref) {
    var children = _ref.children;
    return /*#__PURE__*/React__default.createElement("span", {
      onClick: snuff,
      onMouseDown: snuff,
      onMouseUp: snuff,
      onMouseLeave: snuff,
      onMouseMove: snuff,
      onKeyDown: snuff,
      onKeyUp: snuff,
      onPointerDown: snuff,
      onPointerMove: snuff,
      onPointerLeave: snuff
    }, children);
  });

  var Void = (function () {
    return '';
  });

  var Closer = (function (_ref) {
    var store = _ref.store,
        children = _ref.children;
    var ref = React.useRef(null);
    var close = React.useCallback(function () {
      if (store.my.display) {
        store["do"].setDisplay(false);
      }
    });
    var escapeListener = React.useCallback(function (e) {
      if (e.key === 'Escape') {
        close();
      }
    }, []);
    var clickListener = React.useCallback(function (e) {
      if (!ref.current) return;

      if (!ref.current.contains(e.target)) {
        var target = e.target;

        while (target) {
          if (target.nodeName === 'svg') return;
          if (target.dataset && target.dataset.closer) return;
          target = target.parentNode || target.parent;
        }

        close();
      }
    }, [ref.current]); // Below is the 10 lines of code you need.

    React.useEffect(function () {
      setTimeout(function () {
        // Attach the listeners on component mount.
        document.addEventListener('click', clickListener);
        document.addEventListener('keyup', escapeListener); // Detach the listeners on component unmount.
      }, 500);
      return function () {
        document.removeEventListener('click', clickListener);
        document.removeEventListener('keyup', escapeListener);
      };
    }, []);
    return /*#__PURE__*/React__default.createElement("div", {
      "data-closer": true,
      ref: ref
    }, children);
  });

  var defaultComponents = {
    ChoiceItem: ChoiceItem,
    ChoiceMenu: ChoiceMenu,
    EmptyMessage: EmptyMessage,
    ChoiceContainer: ChoiceContainer,
    Header: Void,
    Footer: Void
  };

  var asLabel = function asLabel(item) {
    if (item === null) return 'Null';

    if (_typeof(item) === 'object') {
      return 'label,name,value,id'.split(',').reduce(function (label, field) {
        if (label) return label;
        if (field in item) return item[field];
        return label;
      }, '') || 'Unlabelled';
    }

    return "".concat(item);
  };

  var asChoice = function asChoice(item) {
    if (item === null) return null;

    if (_typeof(item) === 'object') {
      return _objectSpread2({}, item);
    }

    return item;
  };

  var Picker = function Picker(props) {
    var _useState = React.useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        store = _useState2[0],
        setStore = _useState2[1];

    var _useState3 = React.useState(null),
        _useState4 = _slicedToArray(_useState3, 2),
        value = _useState4[0],
        setValue = _useState4[1];

    React.useEffect(function () {
      var newStore = storeFactory(props);

      if (props.onStore) {
        // extend store
        props.onStore(newStore);
      }

      setStore(newStore);
      var sub = newStore.subscribe(setValue, function (err) {
        return console.log('picker store error:', err);
      });
      var cSub; // broadcast choices to the onChoices callbback if it exists

      if (props.onChoices) {
        cSub = newStore.watch('choices').subscribe(function (_ref) {
          var choices = _ref.choices;
          return props.onChoices(choices);
        });
      }

      return function () {
        sub.unsubscribe();
        if (cSub) cSub.unsubscribe();
        newStore.complete();
      };
    }, []);
    var display = props.display,
        options = props.options,
        comparator = props.comparator,
        filterOptions = props.filterOptions,
        optionDisabled = props.optionDisabled;
    /**
     * These effects synchronize any updating of settings passed in from properties
     * into the store instasnce
     */

    React.useEffect(function () {
      if (!store) return;

      if ('display' in props) {
        if (!!props.display !== !!store.my.display) {
          store["do"].setDisplay(!!props.display);
        }
      }
    }, [display, store]);
    /**
     * @TODO: reset custom functions to default if properties change
     * from a passed-in parameter to absent or invalid parameter
     */

    React.useEffect(function () {
      if (store && Array.isArray(props.options)) {
        store["do"].setOptions(props.options);
      }
    }, [options, store]);
    React.useEffect(function () {
      if (store && typeof comparator === 'function') {
        store["do"].setComparator(comparator);
      }
    }, [comparator, store]);
    React.useEffect(function () {
      if (store && typeof optionDisabled === 'function') {
        store["do"].setOptionDisabled(optionDisabled);
      }
    }, [optionDisabled, store]);
    React.useEffect(function () {
      if (store && typeof filterOptions === 'function') {
        store["do"].setFilterOptions(filterOptions);
      }
    }, [filterOptions, store]); // get the fundamental rendering blocks --
    // or if not provided by props, the default stock tags provided by react-picker

    var _defaultComponents$pr = _objectSpread2(_objectSpread2({}, defaultComponents), props),
        ChoiceContainer = _defaultComponents$pr.ChoiceContainer,
        ChoiceMenu = _defaultComponents$pr.ChoiceMenu,
        ChoiceItem = _defaultComponents$pr.ChoiceItem,
        EmptyMessage = _defaultComponents$pr.EmptyMessage,
        Header = _defaultComponents$pr.Header,
        Footer = _defaultComponents$pr.Footer;

    if (!(store && value)) {
      return '';
    }

    var inner = function inner(store) {
      if (!store.my.display) return '';
      return store.my.closeOnClick ? /*#__PURE__*/React__default.createElement(Closer, {
        store: store
      }, /*#__PURE__*/React__default.createElement(ChoiceContainer, {
        ChoiceItem: ChoiceItem,
        ChoiceMenu: ChoiceMenu,
        EmptyMessage: EmptyMessage
      })) : /*#__PURE__*/React__default.createElement(ChoiceContainer, {
        ChoiceItem: ChoiceItem,
        ChoiceMenu: ChoiceMenu,
        EmptyMessage: EmptyMessage
      });
    };

    return /*#__PURE__*/React__default.createElement(ChoiceContext.Provider, {
      value: {
        value: value,
        store: store
      }
    }, /*#__PURE__*/React__default.createElement(StopEvents, null, Header ? /*#__PURE__*/React__default.createElement(Header, {
      store: store,
      value: value
    }) : '', typeof props.children === 'function' ? props.children({
      value: value,
      store: store
    }) : props.children, inner(store), Footer ? /*#__PURE__*/React__default.createElement(Footer, {
      store: store,
      value: value
    }) : ''));
  };

  Picker.propTypes = {
    // injected components
    Header: PropTypes.any,
    Footer: PropTypes.any,
    ChoiceContainer: PropTypes.any,
    ChoiceItem: PropTypes.any,
    ChoiceMenu: PropTypes.any,
    EmptyMessage: PropTypes.any,
    // store values
    options: PropTypes.arrayOf(PropTypes.any),
    choices: PropTypes.arrayOf(PropTypes.any),
    // used (if present) in storeFactory
    display: PropTypes.bool,
    closeOnClick: PropTypes.bool,
    chooseOne: PropTypes.bool,
    filterOptions: PropTypes.func,
    comparator: PropTypes.func,
    optionToLabel: PropTypes.func,
    optionToChoice: PropTypes.func,
    optionDisabled: PropTypes.func,
    // listeners
    onChoices: PropTypes.func,
    onStore: PropTypes.func,
    // content
    children: PropTypes.any
  };
  Picker.defaultProps = {
    options: [],
    closeOnClick: true,
    display: false,
    chooseOne: false,
    onStore: null,
    onChoices: null,
    optionToLabel: asLabel,
    optionToChoice: asChoice
  };

  var index = {
    Picker: Picker,
    ChoiceContext: ChoiceContext,
    CheckOn: SvgCheckOn,
    CheckOff: SvgCheckOff,
    RadioOn: SvgRadioOn,
    RadioOff: SvgRadioOff,
    storeFactory: storeFactory,
    ChoiceItem: ChoiceItem,
    EmptyMessage: EmptyMessage
  };

  return index;

})));
