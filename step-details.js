__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var _jsxFileName = "/home/luanthnh/Public/Workspaces/uda/projects/EcoPick/ecopick/src/app/events/create/components/StepDetails.tsx";
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.StepDetails = StepDetails;
  var _expoVectorIcons = require(_dependencyMap[0], "@expo/vector-icons");
  require(_dependencyMap[1], "react");
  var _reactHookForm = require(_dependencyMap[2], "react-hook-form");
  var _reactNative = require(_dependencyMap[3], "react-native");
  var _constants = require(_dependencyMap[4], "../../../../constants");
  var _constants2 = require(_dependencyMap[5], "../constants");
  var _styles = require(_dependencyMap[6], "../styles");
  var _FieldError = require(_dependencyMap[7], "./FieldError");
  var _reactJsxDevRuntime = require(_dependencyMap[8], "react/jsx-dev-runtime");
  function StepDetails(_ref) {
    var control = _ref.control,
      errors = _ref.errors,
      t = _ref.t,
      coverImage = _ref.coverImage,
      pickCoverImage = _ref.pickCoverImage,
      titleValue = _ref.titleValue,
      descValue = _ref.descValue,
      eventType = _ref.eventType,
      setEventType = _ref.setEventType,
      locationValue = _ref.locationValue,
      latitude = _ref.latitude,
      longitude = _ref.longitude,
      address = _ref.address,
      params = _ref.params;
    return /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
      style: _styles.s.stepBody,
      children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TouchableOpacity, {
        style: _styles.s.cover,
        onPress: pickCoverImage,
        activeOpacity: 0.8,
        children: coverImage ? /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactJsxDevRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Image, {
            source: {
              uri: coverImage
            },
            style: _styles.s.coverImg,
            resizeMode: "cover"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 49,
            columnNumber: 13
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
            style: _styles.s.coverBadge,
            children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
              name: "camera",
              size: 14,
              color: "#fff"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 51,
              columnNumber: 15
            }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
              style: _styles.s.coverBadgeText,
              children: t('createEvent.changeCover')
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 52,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 50,
            columnNumber: 13
          }, this)]
        }, void 0, true) : /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
          style: _styles.s.coverEmpty,
          children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
            style: _styles.s.coverIconWrap,
            children: /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
              name: "image-outline",
              size: 30,
              color: _constants.Colors.primary
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 58,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 57,
            columnNumber: 13
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
            style: _styles.s.coverLabel,
            children: t('createEvent.addCover')
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 60,
            columnNumber: 13
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
            style: _styles.s.coverHint,
            children: t('createEvent.coverHint')
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 61,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 7
      }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
        style: _styles.s.field,
        children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
          style: _styles.s.label,
          children: [t('createEvent.eventTitle'), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
            style: _styles.s.req,
            children: " *"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 70,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 9
        }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactHookForm.Controller, {
          control: control,
          name: "title",
          render: _ref2 => {
            var _ref2$field = _ref2.field,
              onChange = _ref2$field.onChange,
              onBlur = _ref2$field.onBlur,
              value = _ref2$field.value;
            return /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
              style: [_styles.s.inputWrap, errors.title && _styles.s.inputWrapError],
              children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
                name: "text-outline",
                size: 18,
                color: errors.title ? '#EF4444' : '#94A3B8',
                style: _styles.s.inputIco
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 77,
                columnNumber: 15
              }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TextInput, {
                style: _styles.s.input,
                placeholder: t('createEvent.titlePlaceholder'),
                placeholderTextColor: "#94A3B8",
                value: value,
                onChangeText: onChange,
                onBlur: onBlur,
                maxLength: 100,
                returnKeyType: "next"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 83,
                columnNumber: 15
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 76,
              columnNumber: 13
            }, this);
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 9
        }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
          style: _styles.s.fieldFooter,
          children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_FieldError.FieldError, {
            message: errors.title ? t('createEvent.validation.titleMin') : undefined
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 97,
            columnNumber: 11
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
            style: _styles.s.charCount,
            children: [(titleValue || '').length, "/100"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 96,
          columnNumber: 9
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 7
      }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
        style: _styles.s.field,
        children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
          style: _styles.s.label,
          children: t('createEvent.description')
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 9
        }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactHookForm.Controller, {
          control: control,
          name: "description",
          render: _ref3 => {
            var _ref3$field = _ref3.field,
              onChange = _ref3$field.onChange,
              onBlur = _ref3$field.onBlur,
              value = _ref3$field.value;
            return /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
              style: [_styles.s.inputWrap, _styles.s.inputWrapArea, errors.description && _styles.s.inputWrapError],
              children: /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TextInput, {
                style: [_styles.s.input, _styles.s.inputArea],
                placeholder: t('createEvent.descriptionPlaceholder'),
                placeholderTextColor: "#94A3B8",
                value: value,
                onChangeText: onChange,
                onBlur: onBlur,
                multiline: true,
                numberOfLines: 4,
                textAlignVertical: "top",
                maxLength: 500
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 110,
                columnNumber: 15
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 109,
              columnNumber: 13
            }, this);
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 9
        }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
          style: _styles.s.fieldFooter,
          children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_FieldError.FieldError, {
            message: errors.description ? t('createEvent.validation.descriptionMax') : undefined
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 126,
            columnNumber: 11
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
            style: _styles.s.charCount,
            children: [(descValue || '').length, "/500"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 127,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 125,
          columnNumber: 9
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 7
      }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
        style: _styles.s.field,
        children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
          style: _styles.s.label,
          children: t('createEvent.eventType')
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 133,
          columnNumber: 9
        }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
          style: _styles.s.typeGrid,
          children: _constants2.EVENT_TYPES.map(tp => {
            var sel = eventType === tp.key;
            return /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TouchableOpacity, {
              style: [_styles.s.typeCard, sel && _styles.s.typeCardSel],
              onPress: () => setEventType(tp.key),
              activeOpacity: 0.7,
              children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
                style: [_styles.s.typeIco, sel && _styles.s.typeIcoSel],
                children: /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
                  name: tp.icon,
                  size: 20,
                  color: sel ? '#fff' : _constants.Colors.primary
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 145,
                  columnNumber: 19
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 144,
                columnNumber: 17
              }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
                style: [_styles.s.typeText, sel && _styles.s.typeTextSel],
                children: t(tp.labelKey)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 147,
                columnNumber: 17
              }, this)]
            }, tp.key, true, {
              fileName: _jsxFileName,
              lineNumber: 138,
              columnNumber: 15
            }, this);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 9
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 132,
        columnNumber: 7
      }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
        style: _styles.s.field,
        children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
          style: _styles.s.label,
          children: [t('createEvent.location'), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
            style: _styles.s.req,
            children: " *"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 158,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 156,
          columnNumber: 9
        }, this), params.latitude && params.longitude ? /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
          style: _styles.s.locCard,
          children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
            style: _styles.s.locIco,
            children: /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
              name: "location",
              size: 20,
              color: _constants.Colors.primary
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 163,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 162,
            columnNumber: 13
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
            style: {
              flex: 1,
              gap: 2
            },
            children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
              style: _styles.s.locTitle,
              children: locationValue
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 166,
              columnNumber: 15
            }, this), address ? /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
              style: _styles.s.locSub,
              children: address
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 167,
              columnNumber: 26
            }, this) : null, /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
              style: _styles.s.locCoords,
              children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
                name: "navigate-outline",
                size: 11,
                color: "#94A3B8"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 169,
                columnNumber: 17
              }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
                style: _styles.s.locCoordsText,
                children: [latitude.toFixed(4), ", ", longitude.toFixed(4)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 170,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 168,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 165,
            columnNumber: 13
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
            style: _styles.s.locBadge,
            children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
              name: "link",
              size: 12,
              color: _constants.Colors.primary
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 176,
              columnNumber: 15
            }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
              style: _styles.s.locBadgeText,
              children: t('createEvent.locationLinked')
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 177,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 175,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 161,
          columnNumber: 11
        }, this) : /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactHookForm.Controller, {
          control: control,
          name: "location",
          render: _ref4 => {
            var _ref4$field = _ref4.field,
              onChange = _ref4$field.onChange,
              onBlur = _ref4$field.onBlur,
              value = _ref4$field.value;
            return /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
              style: [_styles.s.inputWrap, errors.location && _styles.s.inputWrapError],
              children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
                name: "location-outline",
                size: 18,
                color: errors.location ? '#EF4444' : '#94A3B8',
                style: _styles.s.inputIco
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 186,
                columnNumber: 17
              }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TextInput, {
                style: _styles.s.input,
                placeholder: t('createEvent.locationPlaceholder'),
                placeholderTextColor: "#94A3B8",
                value: value,
                onChangeText: onChange,
                onBlur: onBlur
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 192,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 185,
              columnNumber: 15
            }, this);
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 181,
          columnNumber: 11
        }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_FieldError.FieldError, {
          message: errors.location ? t('createEvent.validation.locationRequired') : undefined
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 204,
          columnNumber: 9
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 7
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 5
    }, this);
  }
  _c = StepDetails;
  var _c;
  $RefreshReg$(_c, "StepDetails");
});","lineCount":491,"map":[[8,2,27,0,"exports"],[8,9,27,0],[8,10,27,0,"StepDetails"],[8,21,27,0],[8,24,27,0,"StepDetails"],[8,35,27,0],[9,2,1,0],[9,6,1,0,"_expoVectorIcons"],[9,22,1,0],[9,25,1,0,"require"],[9,32,1,0],[9,33,1,0,"_dependencyMap"],[9,47,1,0],[10,2,2,0,"require"],[10,9,2,0],[10,10,2,0,"_dependencyMap"],[10,24,2,0],[11,2,3,0],[11,6,3,0,"_reactHookForm"],[11,20,3,0],[11,23,3,0,"require"],[11,30,3,0],[11,31,3,0,"_dependencyMap"],[11,45,3,0],[12,2,4,0],[12,6,4,0,"_reactNative"],[12,18,4,0],[12,21,4,0,"require"],[12,28,4,0],[12,29,4,0,"_dependencyMap"],[12,43,4,0],[13,2,5,0],[13,6,5,0,"_constants"],[13,16,5,0],[13,19,5,0,"require"],[13,26,5,0],[13,27,5,0,"_dependencyMap"],[13,41,5,0],[14,2,6,0],[14,6,6,0,"_constants2"],[14,17,6,0],[14,20,6,0,"require"],[14,27,6,0],[14,28,6,0,"_dependencyMap"],[14,42,6,0],[15,2,7,0],[15,6,7,0,"_styles"],[15,13,7,0],[15,16,7,0,"require"],[15,23,7,0],[15,24,7,0,"_dependencyMap"],[15,38,7,0],[16,2,8,0],[16,6,8,0,"_FieldError"],[16,17,8,0],[16,20,8,0,"require"],[16,27,8,0],[16,28,8,0,"_dependencyMap"],[16,42,8,0],[17,2,8,42],[17,6,8,42,"_reactJsxDevRuntime"],[17,25,8,42],[17,28,8,42,"require"],[17,35,8,42],[17,36,8,42,"_dependencyMap"],[17,50,8,42],[18,2,27,7],[18,11,27,16,"StepDetails"],[18,22,27,27,"StepDetails"],[18,23,27,27,"_ref"],[18,27,27,27],[18,29,42,21],[19,4,42,21],[19,8,28,2,"control"],[19,15,28,9],[19,18,28,9,"_ref"],[19,22,28,9],[19,23,28,2,"control"],[19,30,28,9],[20,6,29,2,"errors"],[20,12,29,8],[20,15,29,8,"_ref"],[20,19,29,8],[20,20,29,2,"errors"],[20,26,29,8],[21,6,30,2,"t"],[21,7,30,3],[21,10,30,3,"_ref"],[21,14,30,3],[21,15,30,2,"t"],[21,16,30,3],[22,6,31,2,"coverImage"],[22,16,31,12],[22,19,31,12,"_ref"],[22,23,31,12],[22,24,31,2,"coverImage"],[22,34,31,12],[23,6,32,2,"pickCoverImage"],[23,20,32,16],[23,23,32,16,"_ref"],[23,27,32,16],[23,28,32,2,"pickCoverImage"],[23,42,32,16],[24,6,33,2,"titleValue"],[24,16,33,12],[24,19,33,12,"_ref"],[24,23,33,12],[24,24,33,2,"titleValue"],[24,34,33,12],[25,6,34,2,"descValue"],[25,15,34,11],[25,18,34,11,"_ref"],[25,22,34,11],[25,23,34,2,"descValue"],[25,32,34,11],[26,6,35,2,"eventType"],[26,15,35,11],[26,18,35,11,"_ref"],[26,22,35,11],[26,23,35,2,"eventType"],[26,32,35,11],[27,6,36,2,"setEventType"],[27,18,36,14],[27,21,36,14,"_ref"],[27,25,36,14],[27,26,36,2,"setEventType"],[27,38,36,14],[28,6,37,2,"locationValue"],[28,19,37,15],[28,22,37,15,"_ref"],[28,26,37,15],[28,27,37,2,"locationValue"],[28,40,37,15],[29,6,38,2,"latitude"],[29,14,38,10],[29,17,38,10,"_ref"],[29,21,38,10],[29,22,38,2,"latitude"],[29,30,38,10],[30,6,39,2,"longitude"],[30,15,39,11],[30,18,39,11,"_ref"],[30,22,39,11],[30,23,39,2,"longitude"],[30,32,39,11],[31,6,40,2,"address"],[31,13,40,9],[31,16,40,9,"_ref"],[31,20,40,9],[31,21,40,2,"address"],[31,28,40,9],[32,6,41,2,"params"],[32,12,41,8],[32,15,41,8,"_ref"],[32,19,41,8],[32,20,41,2,"params"],[32,26,41,8],[33,4,43,2],[33,24,44,4],[33,28,44,4,"_reactJsxDevRuntime"],[33,47,44,4],[33,48,44,4,"jsxDEV"],[33,54,44,4],[33,56,44,5,"_reactNative"],[33,68,44,9],[33,69,44,9,"View"],[33,73,44,9],[34,6,44,10,"style"],[34,11,44,15],[34,13,44,17,"s"],[34,20,44,18],[34,21,44,18,"s"],[34,22,44,18],[34,23,44,19,"stepBody"],[34,31,44,28],[35,6,44,28,"children"],[35,14,44,28],[35,30,46,6],[35,34,46,6,"_reactJsxDevRuntime"],[35,53,46,6],[35,54,46,6,"jsxDEV"],[35,60,46,6],[35,62,46,7,"_reactNative"],[35,74,46,23],[35,75,46,23,"TouchableOpacity"],[35,91,46,23],[36,8,46,24,"style"],[36,13,46,29],[36,15,46,31,"s"],[36,22,46,32],[36,23,46,32,"s"],[36,24,46,32],[36,25,46,33,"cover"],[36,30,46,39],[37,8,46,40,"onPress"],[37,15,46,47],[37,17,46,49,"pickCoverImage"],[37,31,46,64],[38,8,46,65,"activeOpacity"],[38,21,46,78],[38,23,46,80],[38,26,46,84],[39,8,46,84,"children"],[39,16,46,84],[39,18,47,9,"coverImage"],[39,28,47,19],[39,44,48,10],[39,48,48,10,"_reactJsxDevRuntime"],[39,67,48,10],[39,68,48,10,"jsxDEV"],[39,74,48,10],[39,76,48,10,"_reactJsxDevRuntime"],[39,95,48,10],[39,96,48,10,"Fragment"],[39,104,48,10],[40,10,48,10,"children"],[40,18,48,10],[40,34,49,12],[40,38,49,12,"_reactJsxDevRuntime"],[40,57,49,12],[40,58,49,12,"jsxDEV"],[40,64,49,12],[40,66,49,13,"_reactNative"],[40,78,49,18],[40,79,49,18,"Image"],[40,84,49,18],[41,12,49,19,"source"],[41,18,49,25],[41,20,49,27],[42,14,49,29,"uri"],[42,17,49,32],[42,19,49,34,"coverImage"],[43,12,49,45],[43,13,49,47],[44,12,49,48,"style"],[44,17,49,53],[44,19,49,55,"s"],[44,26,49,56],[44,27,49,56,"s"],[44,28,49,56],[44,29,49,57,"coverImg"],[44,37,49,66],[45,12,49,67,"resizeMode"],[45,22,49,77],[45,24,49,78],[46,10,49,85],[47,12,49,85,"fileName"],[47,20,49,85],[47,22,49,85,"_jsxFileName"],[47,34,49,85],[48,12,49,85,"lineNumber"],[48,22,49,85],[49,12,49,85,"columnNumber"],[49,24,49,85],[50,10,49,85],[50,17,49,87],[50,18,49,88],[50,33,50,12],[50,37,50,12,"_reactJsxDevRuntime"],[50,56,50,12],[50,57,50,12,"jsxDEV"],[50,63,50,12],[50,65,50,13,"_reactNative"],[50,77,50,17],[50,78,50,17,"View"],[50,82,50,17],[51,12,50,18,"style"],[51,17,50,23],[51,19,50,25,"s"],[51,26,50,26],[51,27,50,26,"s"],[51,28,50,26],[51,29,50,27,"coverBadge"],[51,39,50,38],[52,12,50,38,"children"],[52,20,50,38],[52,36,51,14],[52,40,51,14,"_reactJsxDevRuntime"],[52,59,51,14],[52,60,51,14,"jsxDEV"],[52,66,51,14],[52,68,51,15,"_expoVectorIcons"],[52,84,51,23],[52,85,51,23,"Ionicons"],[52,93,51,23],[53,14,51,24,"name"],[53,18,51,28],[53,20,51,29],[53,28,51,37],[54,14,51,38,"size"],[54,18,51,42],[54,20,51,44],[54,22,51,47],[55,14,51,48,"color"],[55,19,51,53],[55,21,51,54],[56,12,51,60],[57,14,51,60,"fileName"],[57,22,51,60],[57,24,51,60,"_jsxFileName"],[57,36,51,60],[58,14,51,60,"lineNumber"],[58,24,51,60],[59,14,51,60,"columnNumber"],[59,26,51,60],[60,12,51,60],[60,19,51,62],[60,20,51,63],[60,35,52,14],[60,39,52,14,"_reactJsxDevRuntime"],[60,58,52,14],[60,59,52,14,"jsxDEV"],[60,65,52,14],[60,67,52,15,"_reactNative"],[60,79,52,19],[60,80,52,19,"Text"],[60,84,52,19],[61,14,52,20,"style"],[61,19,52,25],[61,21,52,27,"s"],[61,28,52,28],[61,29,52,28,"s"],[61,30,52,28],[61,31,52,29,"coverBadgeText"],[61,45,52,44],[62,14,52,44,"children"],[62,22,52,44],[62,24,52,46,"t"],[62,25,52,47],[62,26,52,48],[62,51,52,73],[63,12,52,74],[64,14,52,74,"fileName"],[64,22,52,74],[64,24,52,74,"_jsxFileName"],[64,36,52,74],[65,14,52,74,"lineNumber"],[65,24,52,74],[66,14,52,74,"columnNumber"],[66,26,52,74],[67,12,52,74],[67,19,52,81],[67,20,52,82],[68,10,52,82],[69,12,52,82,"fileName"],[69,20,52,82],[69,22,52,82,"_jsxFileName"],[69,34,52,82],[70,12,52,82,"lineNumber"],[70,22,52,82],[71,12,52,82,"columnNumber"],[71,24,52,82],[72,10,52,82],[72,17,53,18],[72,18,53,19],[73,8,53,19],[73,23,54,12],[73,24,54,13],[73,40,56,10],[73,44,56,10,"_reactJsxDevRuntime"],[73,63,56,10],[73,64,56,10,"jsxDEV"],[73,70,56,10],[73,72,56,11,"_reactNative"],[73,84,56,15],[73,85,56,15,"View"],[73,89,56,15],[74,10,56,16,"style"],[74,15,56,21],[74,17,56,23,"s"],[74,24,56,24],[74,25,56,24,"s"],[74,26,56,24],[74,27,56,25,"coverEmpty"],[74,37,56,36],[75,10,56,36,"children"],[75,18,56,36],[75,34,57,12],[75,38,57,12,"_reactJsxDevRuntime"],[75,57,57,12],[75,58,57,12,"jsxDEV"],[75,64,57,12],[75,66,57,13,"_reactNative"],[75,78,57,17],[75,79,57,17,"View"],[75,83,57,17],[76,12,57,18,"style"],[76,17,57,23],[76,19,57,25,"s"],[76,26,57,26],[76,27,57,26,"s"],[76,28,57,26],[76,29,57,27,"coverIconWrap"],[76,42,57,41],[77,12,57,41,"children"],[77,20,57,41],[77,35,58,14],[77,39,58,14,"_reactJsxDevRuntime"],[77,58,58,14],[77,59,58,14,"jsxDEV"],[77,65,58,14],[77,67,58,15,"_expoVectorIcons"],[77,83,58,23],[77,84,58,23,"Ionicons"],[77,92,58,23],[78,14,58,24,"name"],[78,18,58,28],[78,20,58,29],[78,35,58,44],[79,14,58,45,"size"],[79,18,58,49],[79,20,58,51],[79,22,58,54],[80,14,58,55,"color"],[80,19,58,60],[80,21,58,62,"Colors"],[80,31,58,68],[80,32,58,68,"Colors"],[80,38,58,68],[80,39,58,69,"primary"],[81,12,58,77],[82,14,58,77,"fileName"],[82,22,58,77],[82,24,58,77,"_jsxFileName"],[82,36,58,77],[83,14,58,77,"lineNumber"],[83,24,58,77],[84,14,58,77,"columnNumber"],[84,26,58,77],[85,12,58,77],[85,19,58,79],[86,10,58,80],[87,12,58,80,"fileName"],[87,20,58,80],[87,22,58,80,"_jsxFileName"],[87,34,58,80],[88,12,58,80,"lineNumber"],[88,22,58,80],[89,12,58,80,"columnNumber"],[89,24,58,80],[90,10,58,80],[90,17,59,18],[90,18,59,19],[90,33,60,12],[90,37,60,12,"_reactJsxDevRuntime"],[90,56,60,12],[90,57,60,12,"jsxDEV"],[90,63,60,12],[90,65,60,13,"_reactNative"],[90,77,60,17],[90,78,60,17,"Text"],[90,82,60,17],[91,12,60,18,"style"],[91,17,60,23],[91,19,60,25,"s"],[91,26,60,26],[91,27,60,26,"s"],[91,28,60,26],[91,29,60,27,"coverLabel"],[91,39,60,38],[92,12,60,38,"children"],[92,20,60,38],[92,22,60,40,"t"],[92,23,60,41],[92,24,60,42],[92,46,60,64],[93,10,60,65],[94,12,60,65,"fileName"],[94,20,60,65],[94,22,60,65,"_jsxFileName"],[94,34,60,65],[95,12,60,65,"lineNumber"],[95,22,60,65],[96,12,60,65,"columnNumber"],[96,24,60,65],[97,10,60,65],[97,17,60,72],[97,18,60,73],[97,33,61,12],[97,37,61,12,"_reactJsxDevRuntime"],[97,56,61,12],[97,57,61,12,"jsxDEV"],[97,63,61,12],[97,65,61,13,"_reactNative"],[97,77,61,17],[97,78,61,17,"Text"],[97,82,61,17],[98,12,61,18,"style"],[98,17,61,23],[98,19,61,25,"s"],[98,26,61,26],[98,27,61,26,"s"],[98,28,61,26],[98,29,61,27,"coverHint"],[98,38,61,37],[99,12,61,37,"children"],[99,20,61,37],[99,22,61,39,"t"],[99,23,61,40],[99,24,61,41],[99,47,61,64],[100,10,61,65],[101,12,61,65,"fileName"],[101,20,61,65],[101,22,61,65,"_jsxFileName"],[101,34,61,65],[102,12,61,65,"lineNumber"],[102,22,61,65],[103,12,61,65,"columnNumber"],[103,24,61,65],[104,10,61,65],[104,17,61,72],[104,18,61,73],[105,8,61,73],[106,10,61,73,"fileName"],[106,18,61,73],[106,20,61,73,"_jsxFileName"],[106,32,61,73],[107,10,61,73,"lineNumber"],[107,20,61,73],[108,10,61,73,"columnNumber"],[108,22,61,73],[109,8,61,73],[109,15,62,16],[110,6,63,9],[111,8,63,9,"fileName"],[111,16,63,9],[111,18,63,9,"_jsxFileName"],[111,30,63,9],[112,8,63,9,"lineNumber"],[112,18,63,9],[113,8,63,9,"columnNumber"],[113,20,63,9],[114,6,63,9],[114,13,64,24],[114,14,64,25],[114,29,67,6],[114,33,67,6,"_reactJsxDevRuntime"],[114,52,67,6],[114,53,67,6,"jsxDEV"],[114,59,67,6],[114,61,67,7,"_reactNative"],[114,73,67,11],[114,74,67,11,"View"],[114,78,67,11],[115,8,67,12,"style"],[115,13,67,17],[115,15,67,19,"s"],[115,22,67,20],[115,23,67,20,"s"],[115,24,67,20],[115,25,67,21,"field"],[115,30,67,27],[116,8,67,27,"children"],[116,16,67,27],[116,32,68,8],[116,36,68,8,"_reactJsxDevRuntime"],[116,55,68,8],[116,56,68,8,"jsxDEV"],[116,62,68,8],[116,64,68,9,"_reactNative"],[116,76,68,13],[116,77,68,13,"Text"],[116,81,68,13],[117,10,68,14,"style"],[117,15,68,19],[117,17,68,21,"s"],[117,24,68,22],[117,25,68,22,"s"],[117,26,68,22],[117,27,68,23,"label"],[117,32,68,29],[118,10,68,29,"children"],[118,18,68,29],[118,21,69,11,"t"],[118,22,69,12],[118,23,69,13],[118,47,69,37],[118,48,69,38],[118,63,70,10],[118,67,70,10,"_reactJsxDevRuntime"],[118,86,70,10],[118,87,70,10,"jsxDEV"],[118,93,70,10],[118,95,70,11,"_reactNative"],[118,107,70,15],[118,108,70,15,"Text"],[118,112,70,15],[119,12,70,16,"style"],[119,17,70,21],[119,19,70,23,"s"],[119,26,70,24],[119,27,70,24,"s"],[119,28,70,24],[119,29,70,25,"req"],[119,32,70,29],[120,12,70,29,"children"],[120,20,70,29],[120,22,70,30],[121,10,70,32],[122,12,70,32,"fileName"],[122,20,70,32],[122,22,70,32,"_jsxFileName"],[122,34,70,32],[123,12,70,32,"lineNumber"],[123,22,70,32],[124,12,70,32,"columnNumber"],[124,24,70,32],[125,10,70,32],[125,17,70,38],[125,18,70,39],[126,8,70,39],[127,10,70,39,"fileName"],[127,18,70,39],[127,20,70,39,"_jsxFileName"],[127,32,70,39],[128,10,70,39,"lineNumber"],[128,20,70,39],[129,10,70,39,"columnNumber"],[129,22,70,39],[130,8,70,39],[130,15,71,14],[130,16,71,15],[130,31,72,8],[130,35,72,8,"_reactJsxDevRuntime"],[130,54,72,8],[130,55,72,8,"jsxDEV"],[130,61,72,8],[130,63,72,9,"_reactHookForm"],[130,77,72,19],[130,78,72,19,"Controller"],[130,88,72,19],[131,10,73,10,"control"],[131,17,73,17],[131,19,73,19,"control"],[131,26,73,27],[132,10,74,10,"name"],[132,14,74,14],[132,16,74,15],[132,23,74,22],[133,10,75,10,"render"],[133,16,75,16],[133,18,75,18,"_ref2"],[133,23,75,18],[134,12,75,18],[134,16,75,18,"_ref2$field"],[134,27,75,18],[134,30,75,18,"_ref2"],[134,35,75,18],[134,36,75,21,"field"],[134,41,75,26],[135,14,75,30,"onChange"],[135,22,75,38],[135,25,75,38,"_ref2$field"],[135,36,75,38],[135,37,75,30,"onChange"],[135,45,75,38],[136,14,75,40,"onBlur"],[136,20,75,46],[136,23,75,46,"_ref2$field"],[136,34,75,46],[136,35,75,40,"onBlur"],[136,41,75,46],[137,14,75,48,"value"],[137,19,75,53],[137,22,75,53,"_ref2$field"],[137,33,75,53],[137,34,75,48,"value"],[137,39,75,53],[138,12,75,53],[138,32,76,12],[138,36,76,12,"_reactJsxDevRuntime"],[138,55,76,12],[138,56,76,12,"jsxDEV"],[138,62,76,12],[138,64,76,13,"_reactNative"],[138,76,76,17],[138,77,76,17,"View"],[138,81,76,17],[139,14,76,18,"style"],[139,19,76,23],[139,21,76,25],[139,22,76,26,"s"],[139,29,76,27],[139,30,76,27,"s"],[139,31,76,27],[139,32,76,28,"inputWrap"],[139,41,76,37],[139,43,76,39,"errors"],[139,49,76,45],[139,50,76,46,"title"],[139,55,76,51],[139,59,76,55,"s"],[139,66,76,56],[139,67,76,56,"s"],[139,68,76,56],[139,69,76,57,"inputWrapError"],[139,83,76,71],[139,84,76,73],[140,14,76,73,"children"],[140,22,76,73],[140,38,77,14],[140,42,77,14,"_reactJsxDevRuntime"],[140,61,77,14],[140,62,77,14,"jsxDEV"],[140,68,77,14],[140,70,77,15,"_expoVectorIcons"],[140,86,77,23],[140,87,77,23,"Ionicons"],[140,95,77,23],[141,16,78,16,"name"],[141,20,78,20],[141,22,78,21],[141,36,78,35],[142,16,79,16,"size"],[142,20,79,20],[142,22,79,22],[142,24,79,25],[143,16,80,16,"color"],[143,21,80,21],[143,23,80,23,"errors"],[143,29,80,29],[143,30,80,30,"title"],[143,35,80,35],[143,38,80,38],[143,47,80,47],[143,50,80,50],[143,59,80,60],[144,16,81,16,"style"],[144,21,81,21],[144,23,81,23,"s"],[144,30,81,24],[144,31,81,24,"s"],[144,32,81,24],[144,33,81,25,"inputIco"],[145,14,81,34],[146,16,81,34,"fileName"],[146,24,81,34],[146,26,81,34,"_jsxFileName"],[146,38,81,34],[147,16,81,34,"lineNumber"],[147,26,81,34],[148,16,81,34,"columnNumber"],[148,28,81,34],[149,14,81,34],[149,21,82,15],[149,22,82,16],[149,37,83,14],[149,41,83,14,"_reactJsxDevRuntime"],[149,60,83,14],[149,61,83,14,"jsxDEV"],[149,67,83,14],[149,69,83,15,"_reactNative"],[149,81,83,24],[149,82,83,24,"TextInput"],[149,91,83,24],[150,16,84,16,"style"],[150,21,84,21],[150,23,84,23,"s"],[150,30,84,24],[150,31,84,24,"s"],[150,32,84,24],[150,33,84,25,"input"],[150,38,84,31],[151,16,85,16,"placeholder"],[151,27,85,27],[151,29,85,29,"t"],[151,30,85,30],[151,31,85,31],[151,61,85,61],[151,62,85,63],[152,16,86,16,"placeholderTextColor"],[152,36,86,36],[152,38,86,37],[152,47,86,46],[153,16,87,16,"value"],[153,21,87,21],[153,23,87,23,"value"],[153,28,87,29],[154,16,88,16,"onChangeText"],[154,28,88,28],[154,30,88,30,"onChange"],[154,38,88,39],[155,16,89,16,"onBlur"],[155,22,89,22],[155,24,89,24,"onBlur"],[155,30,89,31],[156,16,90,16,"maxLength"],[156,25,90,25],[156,27,90,27],[156,30,90,31],[157,16,91,16,"returnKeyType"],[157,29,91,29],[157,31,91,30],[158,14,91,36],[159,16,91,36,"fileName"],[159,24,91,36],[159,26,91,36,"_jsxFileName"],[159,38,91,36],[160,16,91,36,"lineNumber"],[160,26,91,36],[161,16,91,36,"columnNumber"],[161,28,91,36],[162,14,91,36],[162,21,92,15],[162,22,92,16],[163,12,92,16],[164,14,92,16,"fileName"],[164,22,92,16],[164,24,92,16,"_jsxFileName"],[164,36,92,16],[165,14,92,16,"lineNumber"],[165,24,92,16],[166,14,92,16,"columnNumber"],[166,26,92,16],[167,12,92,16],[167,19,93,18],[167,20,93,19],[168,10,93,19],[169,8,94,12],[170,10,94,12,"fileName"],[170,18,94,12],[170,20,94,12,"_jsxFileName"],[170,32,94,12],[171,10,94,12,"lineNumber"],[171,20,94,12],[172,10,94,12,"columnNumber"],[172,22,94,12],[173,8,94,12],[173,15,95,9],[173,16,95,10],[173,31,96,8],[173,35,96,8,"_reactJsxDevRuntime"],[173,54,96,8],[173,55,96,8,"jsxDEV"],[173,61,96,8],[173,63,96,9,"_reactNative"],[173,75,96,13],[173,76,96,13,"View"],[173,80,96,13],[174,10,96,14,"style"],[174,15,96,19],[174,17,96,21,"s"],[174,24,96,22],[174,25,96,22,"s"],[174,26,96,22],[174,27,96,23,"fieldFooter"],[174,38,96,35],[175,10,96,35,"children"],[175,18,96,35],[175,34,97,10],[175,38,97,10,"_reactJsxDevRuntime"],[175,57,97,10],[175,58,97,10,"jsxDEV"],[175,64,97,10],[175,66,97,11,"_FieldError"],[175,77,97,21],[175,78,97,21,"FieldError"],[175,88,97,21],[176,12,97,22,"message"],[176,19,97,29],[176,21,97,31,"errors"],[176,27,97,37],[176,28,97,38,"title"],[176,33,97,43],[176,36,97,46,"t"],[176,37,97,47],[176,38,97,48],[176,71,97,81],[176,72,97,82],[176,75,97,85,"undefined"],[177,10,97,95],[178,12,97,95,"fileName"],[178,20,97,95],[178,22,97,95,"_jsxFileName"],[178,34,97,95],[179,12,97,95,"lineNumber"],[179,22,97,95],[180,12,97,95,"columnNumber"],[180,24,97,95],[181,10,97,95],[181,17,97,97],[181,18,97,98],[181,33,98,10],[181,37,98,10,"_reactJsxDevRuntime"],[181,56,98,10],[181,57,98,10,"jsxDEV"],[181,63,98,10],[181,65,98,11,"_reactNative"],[181,77,98,15],[181,78,98,15,"Text"],[181,82,98,15],[182,12,98,16,"style"],[182,17,98,21],[182,19,98,23,"s"],[182,26,98,24],[182,27,98,24,"s"],[182,28,98,24],[182,29,98,25,"charCount"],[182,38,98,35],[183,12,98,35,"children"],[183,20,98,35],[183,23,98,37],[183,24,98,38,"titleValue"],[183,34,98,48],[183,38,98,52],[183,40,98,54],[183,42,98,56,"length"],[183,48,98,62],[183,50,98,63],[183,56,98,67],[184,10,98,67],[185,12,98,67,"fileName"],[185,20,98,67],[185,22,98,67,"_jsxFileName"],[185,34,98,67],[186,12,98,67,"lineNumber"],[186,22,98,67],[187,12,98,67,"columnNumber"],[187,24,98,67],[188,10,98,67],[188,17,98,73],[188,18,98,74],[189,8,98,74],[190,10,98,74,"fileName"],[190,18,98,74],[190,20,98,74,"_jsxFileName"],[190,32,98,74],[191,10,98,74,"lineNumber"],[191,20,98,74],[192,10,98,74,"columnNumber"],[192,22,98,74],[193,8,98,74],[193,15,99,14],[193,16,99,15],[194,6,99,15],[195,8,99,15,"fileName"],[195,16,99,15],[195,18,99,15,"_jsxFileName"],[195,30,99,15],[196,8,99,15,"lineNumber"],[196,18,99,15],[197,8,99,15,"columnNumber"],[197,20,99,15],[198,6,99,15],[198,13,100,12],[198,14,100,13],[198,29,103,6],[198,33,103,6,"_reactJsxDevRuntime"],[198,52,103,6],[198,53,103,6,"jsxDEV"],[198,59,103,6],[198,61,103,7,"_reactNative"],[198,73,103,11],[198,74,103,11,"View"],[198,78,103,11],[199,8,103,12,"style"],[199,13,103,17],[199,15,103,19,"s"],[199,22,103,20],[199,23,103,20,"s"],[199,24,103,20],[199,25,103,21,"field"],[199,30,103,27],[200,8,103,27,"children"],[200,16,103,27],[200,32,104,8],[200,36,104,8,"_reactJsxDevRuntime"],[200,55,104,8],[200,56,104,8,"jsxDEV"],[200,62,104,8],[200,64,104,9,"_reactNative"],[200,76,104,13],[200,77,104,13,"Text"],[200,81,104,13],[201,10,104,14,"style"],[201,15,104,19],[201,17,104,21,"s"],[201,24,104,22],[201,25,104,22,"s"],[201,26,104,22],[201,27,104,23,"label"],[201,32,104,29],[202,10,104,29,"children"],[202,18,104,29],[202,20,104,31,"t"],[202,21,104,32],[202,22,104,33],[202,47,104,58],[203,8,104,59],[204,10,104,59,"fileName"],[204,18,104,59],[204,20,104,59,"_jsxFileName"],[204,32,104,59],[205,10,104,59,"lineNumber"],[205,20,104,59],[206,10,104,59,"columnNumber"],[206,22,104,59],[207,8,104,59],[207,15,104,66],[207,16,104,67],[207,31,105,8],[207,35,105,8,"_reactJsxDevRuntime"],[207,54,105,8],[207,55,105,8,"jsxDEV"],[207,61,105,8],[207,63,105,9,"_reactHookForm"],[207,77,105,19],[207,78,105,19,"Controller"],[207,88,105,19],[208,10,106,10,"control"],[208,17,106,17],[208,19,106,19,"control"],[208,26,106,27],[209,10,107,10,"name"],[209,14,107,14],[209,16,107,15],[209,29,107,28],[210,10,108,10,"render"],[210,16,108,16],[210,18,108,18,"_ref3"],[210,23,108,18],[211,12,108,18],[211,16,108,18,"_ref3$field"],[211,27,108,18],[211,30,108,18,"_ref3"],[211,35,108,18],[211,36,108,21,"field"],[211,41,108,26],[212,14,108,30,"onChange"],[212,22,108,38],[212,25,108,38,"_ref3$field"],[212,36,108,38],[212,37,108,30,"onChange"],[212,45,108,38],[213,14,108,40,"onBlur"],[213,20,108,46],[213,23,108,46,"_ref3$field"],[213,34,108,46],[213,35,108,40,"onBlur"],[213,41,108,46],[214,14,108,48,"value"],[214,19,108,53],[214,22,108,53,"_ref3$field"],[214,33,108,53],[214,34,108,48,"value"],[214,39,108,53],[215,12,108,53],[215,32,109,12],[215,36,109,12,"_reactJsxDevRuntime"],[215,55,109,12],[215,56,109,12,"jsxDEV"],[215,62,109,12],[215,64,109,13,"_reactNative"],[215,76,109,17],[215,77,109,17,"View"],[215,81,109,17],[216,14,109,18,"style"],[216,19,109,23],[216,21,109,25],[216,22,109,26,"s"],[216,29,109,27],[216,30,109,27,"s"],[216,31,109,27],[216,32,109,28,"inputWrap"],[216,41,109,37],[216,43,109,39,"s"],[216,50,109,40],[216,51,109,40,"s"],[216,52,109,40],[216,53,109,41,"inputWrapArea"],[216,66,109,54],[216,68,109,56,"errors"],[216,74,109,62],[216,75,109,63,"description"],[216,86,109,74],[216,90,109,78,"s"],[216,97,109,79],[216,98,109,79,"s"],[216,99,109,79],[216,100,109,80,"inputWrapError"],[216,114,109,94],[216,115,109,96],[217,14,109,96,"children"],[217,22,109,96],[217,37,110,14],[217,41,110,14,"_reactJsxDevRuntime"],[217,60,110,14],[217,61,110,14,"jsxDEV"],[217,67,110,14],[217,69,110,15,"_reactNative"],[217,81,110,24],[217,82,110,24,"TextInput"],[217,91,110,24],[218,16,111,16,"style"],[218,21,111,21],[218,23,111,23],[218,24,111,24,"s"],[218,31,111,25],[218,32,111,25,"s"],[218,33,111,25],[218,34,111,26,"input"],[218,39,111,31],[218,41,111,33,"s"],[218,48,111,34],[218,49,111,34,"s"],[218,50,111,34],[218,51,111,35,"inputArea"],[218,60,111,44],[218,61,111,46],[219,16,112,16,"placeholder"],[219,27,112,27],[219,29,112,29,"t"],[219,30,112,30],[219,31,112,31],[219,67,112,67],[219,68,112,69],[220,16,113,16,"placeholderTextColor"],[220,36,113,36],[220,38,113,37],[220,47,113,46],[221,16,114,16,"value"],[221,21,114,21],[221,23,114,23,"value"],[221,28,114,29],[222,16,115,16,"onChangeText"],[222,28,115,28],[222,30,115,30,"onChange"],[222,38,115,39],[223,16,116,16,"onBlur"],[223,22,116,22],[223,24,116,24,"onBlur"],[223,30,116,31],[224,16,117,16,"multiline"],[224,25,117,25],[225,16,118,16,"numberOfLines"],[225,29,118,29],[225,31,118,31],[225,32,118,33],[226,16,119,16,"textAlignVertical"],[226,33,119,33],[226,35,119,34],[226,40,119,39],[227,16,120,16,"maxLength"],[227,25,120,25],[227,27,120,27],[228,14,120,31],[229,16,120,31,"fileName"],[229,24,120,31],[229,26,120,31,"_jsxFileName"],[229,38,120,31],[230,16,120,31,"lineNumber"],[230,26,120,31],[231,16,120,31,"columnNumber"],[231,28,120,31],[232,14,120,31],[232,21,121,15],[233,12,121,16],[234,14,121,16,"fileName"],[234,22,121,16],[234,24,121,16,"_jsxFileName"],[234,36,121,16],[235,14,121,16,"lineNumber"],[235,24,121,16],[236,14,121,16,"columnNumber"],[236,26,121,16],[237,12,121,16],[237,19,122,18],[237,20,122,19],[238,10,122,19],[239,8,123,12],[240,10,123,12,"fileName"],[240,18,123,12],[240,20,123,12,"_jsxFileName"],[240,32,123,12],[241,10,123,12,"lineNumber"],[241,20,123,12],[242,10,123,12,"columnNumber"],[242,22,123,12],[243,8,123,12],[243,15,124,9],[243,16,124,10],[243,31,125,8],[243,35,125,8,"_reactJsxDevRuntime"],[243,54,125,8],[243,55,125,8,"jsxDEV"],[243,61,125,8],[243,63,125,9,"_reactNative"],[243,75,125,13],[243,76,125,13,"View"],[243,80,125,13],[244,10,125,14,"style"],[244,15,125,19],[244,17,125,21,"s"],[244,24,125,22],[244,25,125,22,"s"],[244,26,125,22],[244,27,125,23,"fieldFooter"],[244,38,125,35],[245,10,125,35,"children"],[245,18,125,35],[245,34,126,10],[245,38,126,10,"_reactJsxDevRuntime"],[245,57,126,10],[245,58,126,10,"jsxDEV"],[245,64,126,10],[245,66,126,11,"_FieldError"],[245,77,126,21],[245,78,126,21,"FieldError"],[245,88,126,21],[246,12,126,22,"message"],[246,19,126,29],[246,21,126,31,"errors"],[246,27,126,37],[246,28,126,38,"description"],[246,39,126,49],[246,42,126,52,"t"],[246,43,126,53],[246,44,126,54],[246,83,126,93],[246,84,126,94],[246,87,126,97,"undefined"],[247,10,126,107],[248,12,126,107,"fileName"],[248,20,126,107],[248,22,126,107,"_jsxFileName"],[248,34,126,107],[249,12,126,107,"lineNumber"],[249,22,126,107],[250,12,126,107,"columnNumber"],[250,24,126,107],[251,10,126,107],[251,17,126,109],[251,18,126,110],[251,33,127,10],[251,37,127,10,"_reactJsxDevRuntime"],[251,56,127,10],[251,57,127,10,"jsxDEV"],[251,63,127,10],[251,65,127,11,"_reactNative"],[251,77,127,15],[251,78,127,15,"Text"],[251,82,127,15],[252,12,127,16,"style"],[252,17,127,21],[252,19,127,23,"s"],[252,26,127,24],[252,27,127,24,"s"],[252,28,127,24],[252,29,127,25,"charCount"],[252,38,127,35],[253,12,127,35,"children"],[253,20,127,35],[253,23,127,37],[253,24,127,38,"descValue"],[253,33,127,47],[253,37,127,51],[253,39,127,53],[253,41,127,55,"length"],[253,47,127,61],[253,49,127,62],[253,55,127,66],[254,10,127,66],[255,12,127,66,"fileName"],[255,20,127,66],[255,22,127,66,"_jsxFileName"],[255,34,127,66],[256,12,127,66,"lineNumber"],[256,22,127,66],[257,12,127,66,"columnNumber"],[257,24,127,66],[258,10,127,66],[258,17,127,72],[258,18,127,73],[259,8,127,73],[260,10,127,73,"fileName"],[260,18,127,73],[260,20,127,73,"_jsxFileName"],[260,32,127,73],[261,10,127,73,"lineNumber"],[261,20,127,73],[262,10,127,73,"columnNumber"],[262,22,127,73],[263,8,127,73],[263,15,128,14],[263,16,128,15],[264,6,128,15],[265,8,128,15,"fileName"],[265,16,128,15],[265,18,128,15,"_jsxFileName"],[265,30,128,15],[266,8,128,15,"lineNumber"],[266,18,128,15],[267,8,128,15,"columnNumber"],[267,20,128,15],[268,6,128,15],[268,13,129,12],[268,14,129,13],[268,29,132,6],[268,33,132,6,"_reactJsxDevRuntime"],[268,52,132,6],[268,53,132,6,"jsxDEV"],[268,59,132,6],[268,61,132,7,"_reactNative"],[268,73,132,11],[268,74,132,11,"View"],[268,78,132,11],[269,8,132,12,"style"],[269,13,132,17],[269,15,132,19,"s"],[269,22,132,20],[269,23,132,20,"s"],[269,24,132,20],[269,25,132,21,"field"],[269,30,132,27],[270,8,132,27,"children"],[270,16,132,27],[270,32,133,8],[270,36,133,8,"_reactJsxDevRuntime"],[270,55,133,8],[270,56,133,8,"jsxDEV"],[270,62,133,8],[270,64,133,9,"_reactNative"],[270,76,133,13],[270,77,133,13,"Text"],[270,81,133,13],[271,10,133,14,"style"],[271,15,133,19],[271,17,133,21,"s"],[271,24,133,22],[271,25,133,22,"s"],[271,26,133,22],[271,27,133,23,"label"],[271,32,133,29],[272,10,133,29,"children"],[272,18,133,29],[272,20,133,31,"t"],[272,21,133,32],[272,22,133,33],[272,45,133,56],[273,8,133,57],[274,10,133,57,"fileName"],[274,18,133,57],[274,20,133,57,"_jsxFileName"],[274,32,133,57],[275,10,133,57,"lineNumber"],[275,20,133,57],[276,10,133,57,"columnNumber"],[276,22,133,57],[277,8,133,57],[277,15,133,64],[277,16,133,65],[277,31,134,8],[277,35,134,8,"_reactJsxDevRuntime"],[277,54,134,8],[277,55,134,8,"jsxDEV"],[277,61,134,8],[277,63,134,9,"_reactNative"],[277,75,134,13],[277,76,134,13,"View"],[277,80,134,13],[278,10,134,14,"style"],[278,15,134,19],[278,17,134,21,"s"],[278,24,134,22],[278,25,134,22,"s"],[278,26,134,22],[278,27,134,23,"typeGrid"],[278,35,134,32],[279,10,134,32,"children"],[279,18,134,32],[279,20,135,11,"EVENT_TYPES"],[279,31,135,22],[279,32,135,22,"EVENT_TYPES"],[279,43,135,22],[279,44,135,23,"map"],[279,47,135,26],[279,48,135,28,"tp"],[279,50,135,30],[279,54,135,35],[280,12,136,12],[280,16,136,18,"sel"],[280,19,136,21],[280,22,136,24,"eventType"],[280,31,136,33],[280,36,136,38,"tp"],[280,38,136,40],[280,39,136,41,"key"],[280,42,136,44],[281,12,137,12],[281,32,138,14],[281,36,138,14,"_reactJsxDevRuntime"],[281,55,138,14],[281,56,138,14,"jsxDEV"],[281,62,138,14],[281,64,138,15,"_reactNative"],[281,76,138,31],[281,77,138,31,"TouchableOpacity"],[281,93,138,31],[282,14,140,16,"style"],[282,19,140,21],[282,21,140,23],[282,22,140,24,"s"],[282,29,140,25],[282,30,140,25,"s"],[282,31,140,25],[282,32,140,26,"typeCard"],[282,40,140,34],[282,42,140,36,"sel"],[282,45,140,39],[282,49,140,43,"s"],[282,56,140,44],[282,57,140,44,"s"],[282,58,140,44],[282,59,140,45,"typeCardSel"],[282,70,140,56],[282,71,140,58],[283,14,141,16,"onPress"],[283,21,141,23],[283,23,141,25,"onPress"],[283,24,141,25],[283,29,141,31,"setEventType"],[283,41,141,43],[283,42,141,44,"tp"],[283,44,141,46],[283,45,141,47,"key"],[283,48,141,50],[283,49,141,52],[284,14,142,16,"activeOpacity"],[284,27,142,29],[284,29,142,31],[284,32,142,35],[285,14,142,35,"children"],[285,22,142,35],[285,38,144,16],[285,42,144,16,"_reactJsxDevRuntime"],[285,61,144,16],[285,62,144,16,"jsxDEV"],[285,68,144,16],[285,70,144,17,"_reactNative"],[285,82,144,21],[285,83,144,21,"View"],[285,87,144,21],[286,16,144,22,"style"],[286,21,144,27],[286,23,144,29],[286,24,144,30,"s"],[286,31,144,31],[286,32,144,31,"s"],[286,33,144,31],[286,34,144,32,"typeIco"],[286,41,144,39],[286,43,144,41,"sel"],[286,46,144,44],[286,50,144,48,"s"],[286,57,144,49],[286,58,144,49,"s"],[286,59,144,49],[286,60,144,50,"typeIcoSel"],[286,70,144,60],[286,71,144,62],[287,16,144,62,"children"],[287,24,144,62],[287,39,145,18],[287,43,145,18,"_reactJsxDevRuntime"],[287,62,145,18],[287,63,145,18,"jsxDEV"],[287,69,145,18],[287,71,145,19,"_expoVectorIcons"],[287,87,145,27],[287,88,145,27,"Ionicons"],[287,96,145,27],[288,18,145,28,"name"],[288,22,145,32],[288,24,145,34,"tp"],[288,26,145,36],[288,27,145,37,"icon"],[288,31,145,42],[289,18,145,43,"size"],[289,22,145,47],[289,24,145,49],[289,26,145,52],[290,18,145,53,"color"],[290,23,145,58],[290,25,145,60,"sel"],[290,28,145,63],[290,31,145,66],[290,37,145,72],[290,40,145,75,"Colors"],[290,50,145,81],[290,51,145,81,"Colors"],[290,57,145,81],[290,58,145,82,"primary"],[291,16,145,90],[292,18,145,90,"fileName"],[292,26,145,90],[292,28,145,90,"_jsxFileName"],[292,40,145,90],[293,18,145,90,"lineNumber"],[293,28,145,90],[294,18,145,90,"columnNumber"],[294,30,145,90],[295,16,145,90],[295,23,145,92],[296,14,145,93],[297,16,145,93,"fileName"],[297,24,145,93],[297,26,145,93,"_jsxFileName"],[297,38,145,93],[298,16,145,93,"lineNumber"],[298,26,145,93],[299,16,145,93,"columnNumber"],[299,28,145,93],[300,14,145,93],[300,21,146,22],[300,22,146,23],[300,37,147,16],[300,41,147,16,"_reactJsxDevRuntime"],[300,60,147,16],[300,61,147,16,"jsxDEV"],[300,67,147,16],[300,69,147,17,"_reactNative"],[300,81,147,21],[300,82,147,21,"Text"],[300,86,147,21],[301,16,147,22,"style"],[301,21,147,27],[301,23,147,29],[301,24,147,30,"s"],[301,31,147,31],[301,32,147,31,"s"],[301,33,147,31],[301,34,147,32,"typeText"],[301,42,147,40],[301,44,147,42,"sel"],[301,47,147,45],[301,51,147,49,"s"],[301,58,147,50],[301,59,147,50,"s"],[301,60,147,50],[301,61,147,51,"typeTextSel"],[301,72,147,62],[301,73,147,64],[302,16,147,64,"children"],[302,24,147,64],[302,26,147,66,"t"],[302,27,147,67],[302,28,147,68,"tp"],[302,30,147,70],[302,31,147,71,"labelKey"],[302,39,147,86],[303,14,147,87],[304,16,147,87,"fileName"],[304,24,147,87],[304,26,147,87,"_jsxFileName"],[304,38,147,87],[305,16,147,87,"lineNumber"],[305,26,147,87],[306,16,147,87,"columnNumber"],[306,28,147,87],[307,14,147,87],[307,21,147,94],[307,22,147,95],[308,12,147,95],[308,15,139,21,"tp"],[308,17,139,23],[308,18,139,24,"key"],[308,21,139,27],[309,14,139,27,"fileName"],[309,22,139,27],[309,24,139,27,"_jsxFileName"],[309,36,139,27],[310,14,139,27,"lineNumber"],[310,24,139,27],[311,14,139,27,"columnNumber"],[311,26,139,27],[312,12,139,27],[312,19,148,32],[312,20,148,33],[313,10,150,10],[313,11,150,11],[314,8,150,12],[315,10,150,12,"fileName"],[315,18,150,12],[315,20,150,12,"_jsxFileName"],[315,32,150,12],[316,10,150,12,"lineNumber"],[316,20,150,12],[317,10,150,12,"columnNumber"],[317,22,150,12],[318,8,150,12],[318,15,151,14],[318,16,151,15],[319,6,151,15],[320,8,151,15,"fileName"],[320,16,151,15],[320,18,151,15,"_jsxFileName"],[320,30,151,15],[321,8,151,15,"lineNumber"],[321,18,151,15],[322,8,151,15,"columnNumber"],[322,20,151,15],[323,6,151,15],[323,13,152,12],[323,14,152,13],[323,29,155,6],[323,33,155,6,"_reactJsxDevRuntime"],[323,52,155,6],[323,53,155,6,"jsxDEV"],[323,59,155,6],[323,61,155,7,"_reactNative"],[323,73,155,11],[323,74,155,11,"View"],[323,78,155,11],[324,8,155,12,"style"],[324,13,155,17],[324,15,155,19,"s"],[324,22,155,20],[324,23,155,20,"s"],[324,24,155,20],[324,25,155,21,"field"],[324,30,155,27],[325,8,155,27,"children"],[325,16,155,27],[325,32,156,8],[325,36,156,8,"_reactJsxDevRuntime"],[325,55,156,8],[325,56,156,8,"jsxDEV"],[325,62,156,8],[325,64,156,9,"_reactNative"],[325,76,156,13],[325,77,156,13,"Text"],[325,81,156,13],[326,10,156,14,"style"],[326,15,156,19],[326,17,156,21,"s"],[326,24,156,22],[326,25,156,22,"s"],[326,26,156,22],[326,27,156,23,"label"],[326,32,156,29],[327,10,156,29,"children"],[327,18,156,29],[327,21,157,11,"t"],[327,22,157,12],[327,23,157,13],[327,45,157,35],[327,46,157,36],[327,61,158,10],[327,65,158,10,"_reactJsxDevRuntime"],[327,84,158,10],[327,85,158,10,"jsxDEV"],[327,91,158,10],[327,93,158,11,"_reactNative"],[327,105,158,15],[327,106,158,15,"Text"],[327,110,158,15],[328,12,158,16,"style"],[328,17,158,21],[328,19,158,23,"s"],[328,26,158,24],[328,27,158,24,"s"],[328,28,158,24],[328,29,158,25,"req"],[328,32,158,29],[329,12,158,29,"children"],[329,20,158,29],[329,22,158,30],[330,10,158,32],[331,12,158,32,"fileName"],[331,20,158,32],[331,22,158,32,"_jsxFileName"],[331,34,158,32],[332,12,158,32,"lineNumber"],[332,22,158,32],[333,12,158,32,"columnNumber"],[333,24,158,32],[334,10,158,32],[334,17,158,38],[334,18,158,39],[335,8,158,39],[336,10,158,39,"fileName"],[336,18,158,39],[336,20,158,39,"_jsxFileName"],[336,32,158,39],[337,10,158,39,"lineNumber"],[337,20,158,39],[338,10,158,39,"columnNumber"],[338,22,158,39],[339,8,158,39],[339,15,159,14],[339,16,159,15],[339,18,160,9,"params"],[339,24,160,15],[339,25,160,16,"latitude"],[339,33,160,24],[339,37,160,28,"params"],[339,43,160,34],[339,44,160,35,"longitude"],[339,53,160,44],[339,69,161,10],[339,73,161,10,"_reactJsxDevRuntime"],[339,92,161,10],[339,93,161,10,"jsxDEV"],[339,99,161,10],[339,101,161,11,"_reactNative"],[339,113,161,15],[339,114,161,15,"View"],[339,118,161,15],[340,10,161,16,"style"],[340,15,161,21],[340,17,161,23,"s"],[340,24,161,24],[340,25,161,24,"s"],[340,26,161,24],[340,27,161,25,"locCard"],[340,34,161,33],[341,10,161,33,"children"],[341,18,161,33],[341,34,162,12],[341,38,162,12,"_reactJsxDevRuntime"],[341,57,162,12],[341,58,162,12,"jsxDEV"],[341,64,162,12],[341,66,162,13,"_reactNative"],[341,78,162,17],[341,79,162,17,"View"],[341,83,162,17],[342,12,162,18,"style"],[342,17,162,23],[342,19,162,25,"s"],[342,26,162,26],[342,27,162,26,"s"],[342,28,162,26],[342,29,162,27,"locIco"],[342,35,162,34],[343,12,162,34,"children"],[343,20,162,34],[343,35,163,14],[343,39,163,14,"_reactJsxDevRuntime"],[343,58,163,14],[343,59,163,14,"jsxDEV"],[343,65,163,14],[343,67,163,15,"_expoVectorIcons"],[343,83,163,23],[343,84,163,23,"Ionicons"],[343,92,163,23],[344,14,163,24,"name"],[344,18,163,28],[344,20,163,29],[344,30,163,39],[345,14,163,40,"size"],[345,18,163,44],[345,20,163,46],[345,22,163,49],[346,14,163,50,"color"],[346,19,163,55],[346,21,163,57,"Colors"],[346,31,163,63],[346,32,163,63,"Colors"],[346,38,163,63],[346,39,163,64,"primary"],[347,12,163,72],[348,14,163,72,"fileName"],[348,22,163,72],[348,24,163,72,"_jsxFileName"],[348,36,163,72],[349,14,163,72,"lineNumber"],[349,24,163,72],[350,14,163,72,"columnNumber"],[350,26,163,72],[351,12,163,72],[351,19,163,74],[352,10,163,75],[353,12,163,75,"fileName"],[353,20,163,75],[353,22,163,75,"_jsxFileName"],[353,34,163,75],[354,12,163,75,"lineNumber"],[354,22,163,75],[355,12,163,75,"columnNumber"],[355,24,163,75],[356,10,163,75],[356,17,164,18],[356,18,164,19],[356,33,165,12],[356,37,165,12,"_reactJsxDevRuntime"],[356,56,165,12],[356,57,165,12,"jsxDEV"],[356,63,165,12],[356,65,165,13,"_reactNative"],[356,77,165,17],[356,78,165,17,"View"],[356,82,165,17],[357,12,165,18,"style"],[357,17,165,23],[357,19,165,25],[358,14,165,27,"flex"],[358,18,165,31],[358,20,165,33],[358,21,165,34],[359,14,165,36,"gap"],[359,17,165,39],[359,19,165,41],[360,12,165,43],[360,13,165,45],[361,12,165,45,"children"],[361,20,165,45],[361,36,166,14],[361,40,166,14,"_reactJsxDevRuntime"],[361,59,166,14],[361,60,166,14,"jsxDEV"],[361,66,166,14],[361,68,166,15,"_reactNative"],[361,80,166,19],[361,81,166,19,"Text"],[361,85,166,19],[362,14,166,20,"style"],[362,19,166,25],[362,21,166,27,"s"],[362,28,166,28],[362,29,166,28,"s"],[362,30,166,28],[362,31,166,29,"locTitle"],[362,39,166,38],[363,14,166,38,"children"],[363,22,166,38],[363,24,166,40,"locationValue"],[364,12,166,53],[365,14,166,53,"fileName"],[365,22,166,53],[365,24,166,53,"_jsxFileName"],[365,36,166,53],[366,14,166,53,"lineNumber"],[366,24,166,53],[367,14,166,53,"columnNumber"],[367,26,166,53],[368,12,166,53],[368,19,166,60],[368,20,166,61],[368,22,167,15,"address"],[368,29,167,22],[368,45,167,25],[368,49,167,25,"_reactJsxDevRuntime"],[368,68,167,25],[368,69,167,25,"jsxDEV"],[368,75,167,25],[368,77,167,26,"_reactNative"],[368,89,167,30],[368,90,167,30,"Text"],[368,94,167,30],[369,14,167,31,"style"],[369,19,167,36],[369,21,167,38,"s"],[369,28,167,39],[369,29,167,39,"s"],[369,30,167,39],[369,31,167,40,"locSub"],[369,37,167,47],[370,14,167,47,"children"],[370,22,167,47],[370,24,167,49,"address"],[371,12,167,56],[372,14,167,56,"fileName"],[372,22,167,56],[372,24,167,56,"_jsxFileName"],[372,36,167,56],[373,14,167,56,"lineNumber"],[373,24,167,56],[374,14,167,56,"columnNumber"],[374,26,167,56],[375,12,167,56],[375,19,167,63],[375,20,167,64],[375,23,167,67],[375,27,167,71],[375,42,168,14],[375,46,168,14,"_reactJsxDevRuntime"],[375,65,168,14],[375,66,168,14,"jsxDEV"],[375,72,168,14],[375,74,168,15,"_reactNative"],[375,86,168,19],[375,87,168,19,"View"],[375,91,168,19],[376,14,168,20,"style"],[376,19,168,25],[376,21,168,27,"s"],[376,28,168,28],[376,29,168,28,"s"],[376,30,168,28],[376,31,168,29,"locCoords"],[376,40,168,39],[377,14,168,39,"children"],[377,22,168,39],[377,38,169,16],[377,42,169,16,"_reactJsxDevRuntime"],[377,61,169,16],[377,62,169,16,"jsxDEV"],[377,68,169,16],[377,70,169,17,"_expoVectorIcons"],[377,86,169,25],[377,87,169,25,"Ionicons"],[377,95,169,25],[378,16,169,26,"name"],[378,20,169,30],[378,22,169,31],[378,40,169,49],[379,16,169,50,"size"],[379,20,169,54],[379,22,169,56],[379,24,169,59],[380,16,169,60,"color"],[380,21,169,65],[380,23,169,66],[381,14,169,75],[382,16,169,75,"fileName"],[382,24,169,75],[382,26,169,75,"_jsxFileName"],[382,38,169,75],[383,16,169,75,"lineNumber"],[383,26,169,75],[384,16,169,75,"columnNumber"],[384,28,169,75],[385,14,169,75],[385,21,169,77],[385,22,169,78],[385,37,170,16],[385,41,170,16,"_reactJsxDevRuntime"],[385,60,170,16],[385,61,170,16,"jsxDEV"],[385,67,170,16],[385,69,170,17,"_reactNative"],[385,81,170,21],[385,82,170,21,"Text"],[385,86,170,21],[386,16,170,22,"style"],[386,21,170,27],[386,23,170,29,"s"],[386,30,170,30],[386,31,170,30,"s"],[386,32,170,30],[386,33,170,31,"locCoordsText"],[386,46,170,45],[387,16,170,45,"children"],[387,24,170,45],[387,27,171,19,"latitude"],[387,35,171,27],[387,36,171,28,"toFixed"],[387,43,171,35],[387,44,171,36],[387,45,171,37],[387,46,171,38],[387,48,171,39],[387,52,171,41],[387,54,171,42,"longitude"],[387,63,171,51],[387,64,171,52,"toFixed"],[387,71,171,59],[387,72,171,60],[387,73,171,61],[387,74,171,62],[388,14,171,62],[389,16,171,62,"fileName"],[389,24,171,62],[389,26,171,62,"_jsxFileName"],[389,38,171,62],[390,16,171,62,"lineNumber"],[390,26,171,62],[391,16,171,62,"columnNumber"],[391,28,171,62],[392,14,171,62],[392,21,172,22],[392,22,172,23],[393,12,172,23],[394,14,172,23,"fileName"],[394,22,172,23],[394,24,172,23,"_jsxFileName"],[394,36,172,23],[395,14,172,23,"lineNumber"],[395,24,172,23],[396,14,172,23,"columnNumber"],[396,26,172,23],[397,12,172,23],[397,19,173,20],[397,20,173,21],[398,10,173,21],[399,12,173,21,"fileName"],[399,20,173,21],[399,22,173,21,"_jsxFileName"],[399,34,173,21],[400,12,173,21,"lineNumber"],[400,22,173,21],[401,12,173,21,"columnNumber"],[401,24,173,21],[402,10,173,21],[402,17,174,18],[402,18,174,19],[402,33,175,12],[402,37,175,12,"_reactJsxDevRuntime"],[402,56,175,12],[402,57,175,12,"jsxDEV"],[402,63,175,12],[402,65,175,13,"_reactNative"],[402,77,175,17],[402,78,175,17,"View"],[402,82,175,17],[403,12,175,18,"style"],[403,17,175,23],[403,19,175,25,"s"],[403,26,175,26],[403,27,175,26,"s"],[403,28,175,26],[403,29,175,27,"locBadge"],[403,37,175,36],[404,12,175,36,"children"],[404,20,175,36],[404,36,176,14],[404,40,176,14,"_reactJsxDevRuntime"],[404,59,176,14],[404,60,176,14,"jsxDEV"],[404,66,176,14],[404,68,176,15,"_expoVectorIcons"],[404,84,176,23],[404,85,176,23,"Ionicons"],[404,93,176,23],[405,14,176,24,"name"],[405,18,176,28],[405,20,176,29],[405,26,176,35],[406,14,176,36,"size"],[406,18,176,40],[406,20,176,42],[406,22,176,45],[407,14,176,46,"color"],[407,19,176,51],[407,21,176,53,"Colors"],[407,31,176,59],[407,32,176,59,"Colors"],[407,38,176,59],[407,39,176,60,"primary"],[408,12,176,68],[409,14,176,68,"fileName"],[409,22,176,68],[409,24,176,68,"_jsxFileName"],[409,36,176,68],[410,14,176,68,"lineNumber"],[410,24,176,68],[411,14,176,68,"columnNumber"],[411,26,176,68],[412,12,176,68],[412,19,176,70],[412,20,176,71],[412,35,177,14],[412,39,177,14,"_reactJsxDevRuntime"],[412,58,177,14],[412,59,177,14,"jsxDEV"],[412,65,177,14],[412,67,177,15,"_reactNative"],[412,79,177,19],[412,80,177,19,"Text"],[412,84,177,19],[413,14,177,20,"style"],[413,19,177,25],[413,21,177,27,"s"],[413,28,177,28],[413,29,177,28,"s"],[413,30,177,28],[413,31,177,29,"locBadgeText"],[413,43,177,42],[414,14,177,42,"children"],[414,22,177,42],[414,24,177,44,"t"],[414,25,177,45],[414,26,177,46],[414,54,177,74],[415,12,177,75],[416,14,177,75,"fileName"],[416,22,177,75],[416,24,177,75,"_jsxFileName"],[416,36,177,75],[417,14,177,75,"lineNumber"],[417,24,177,75],[418,14,177,75,"columnNumber"],[418,26,177,75],[419,12,177,75],[419,19,177,82],[419,20,177,83],[420,10,177,83],[421,12,177,83,"fileName"],[421,20,177,83],[421,22,177,83,"_jsxFileName"],[421,34,177,83],[422,12,177,83,"lineNumber"],[422,22,177,83],[423,12,177,83,"columnNumber"],[423,24,177,83],[424,10,177,83],[424,17,178,18],[424,18,178,19],[425,8,178,19],[426,10,178,19,"fileName"],[426,18,178,19],[426,20,178,19,"_jsxFileName"],[426,32,178,19],[427,10,178,19,"lineNumber"],[427,20,178,19],[428,10,178,19,"columnNumber"],[428,22,178,19],[429,8,178,19],[429,15,179,16],[429,16,179,17],[429,32,181,10],[429,36,181,10,"_reactJsxDevRuntime"],[429,55,181,10],[429,56,181,10,"jsxDEV"],[429,62,181,10],[429,64,181,11,"_reactHookForm"],[429,78,181,21],[429,79,181,21,"Controller"],[429,89,181,21],[430,10,182,12,"control"],[430,17,182,19],[430,19,182,21,"control"],[430,26,182,29],[431,10,183,12,"name"],[431,14,183,16],[431,16,183,17],[431,26,183,27],[432,10,184,12,"render"],[432,16,184,18],[432,18,184,20,"_ref4"],[432,23,184,20],[433,12,184,20],[433,16,184,20,"_ref4$field"],[433,27,184,20],[433,30,184,20,"_ref4"],[433,35,184,20],[433,36,184,23,"field"],[433,41,184,28],[434,14,184,32,"onChange"],[434,22,184,40],[434,25,184,40,"_ref4$field"],[434,36,184,40],[434,37,184,32,"onChange"],[434,45,184,40],[435,14,184,42,"onBlur"],[435,20,184,48],[435,23,184,48,"_ref4$field"],[435,34,184,48],[435,35,184,42,"onBlur"],[435,41,184,48],[436,14,184,50,"value"],[436,19,184,55],[436,22,184,55,"_ref4$field"],[436,33,184,55],[436,34,184,50,"value"],[436,39,184,55],[437,12,184,55],[437,32,185,14],[437,36,185,14,"_reactJsxDevRuntime"],[437,55,185,14],[437,56,185,14,"jsxDEV"],[437,62,185,14],[437,64,185,15,"_reactNative"],[437,76,185,19],[437,77,185,19,"View"],[437,81,185,19],[438,14,185,20,"style"],[438,19,185,25],[438,21,185,27],[438,22,185,28,"s"],[438,29,185,29],[438,30,185,29,"s"],[438,31,185,29],[438,32,185,30,"inputWrap"],[438,41,185,39],[438,43,185,41,"errors"],[438,49,185,47],[438,50,185,48,"location"],[438,58,185,56],[438,62,185,60,"s"],[438,69,185,61],[438,70,185,61,"s"],[438,71,185,61],[438,72,185,62,"inputWrapError"],[438,86,185,76],[438,87,185,78],[439,14,185,78,"children"],[439,22,185,78],[439,38,186,16],[439,42,186,16,"_reactJsxDevRuntime"],[439,61,186,16],[439,62,186,16,"jsxDEV"],[439,68,186,16],[439,70,186,17,"_expoVectorIcons"],[439,86,186,25],[439,87,186,25,"Ionicons"],[439,95,186,25],[440,16,187,18,"name"],[440,20,187,22],[440,22,187,23],[440,40,187,41],[441,16,188,18,"size"],[441,20,188,22],[441,22,188,24],[441,24,188,27],[442,16,189,18,"color"],[442,21,189,23],[442,23,189,25,"errors"],[442,29,189,31],[442,30,189,32,"location"],[442,38,189,40],[442,41,189,43],[442,50,189,52],[442,53,189,55],[442,62,189,65],[443,16,190,18,"style"],[443,21,190,23],[443,23,190,25,"s"],[443,30,190,26],[443,31,190,26,"s"],[443,32,190,26],[443,33,190,27,"inputIco"],[444,14,190,36],[445,16,190,36,"fileName"],[445,24,190,36],[445,26,190,36,"_jsxFileName"],[445,38,190,36],[446,16,190,36,"lineNumber"],[446,26,190,36],[447,16,190,36,"columnNumber"],[447,28,190,36],[448,14,190,36],[448,21,191,17],[448,22,191,18],[448,37,192,16],[448,41,192,16,"_reactJsxDevRuntime"],[448,60,192,16],[448,61,192,16,"jsxDEV"],[448,67,192,16],[448,69,192,17,"_reactNative"],[448,81,192,26],[448,82,192,26,"TextInput"],[448,91,192,26],[449,16,193,18,"style"],[449,21,193,23],[449,23,193,25,"s"],[449,30,193,26],[449,31,193,26,"s"],[449,32,193,26],[449,33,193,27,"input"],[449,38,193,33],[450,16,194,18,"placeholder"],[450,27,194,29],[450,29,194,31,"t"],[450,30,194,32],[450,31,194,33],[450,64,194,66],[450,65,194,68],[451,16,195,18,"placeholderTextColor"],[451,36,195,38],[451,38,195,39],[451,47,195,48],[452,16,196,18,"value"],[452,21,196,23],[452,23,196,25,"value"],[452,28,196,31],[453,16,197,18,"onChangeText"],[453,28,197,30],[453,30,197,32,"onChange"],[453,38,197,41],[454,16,198,18,"onBlur"],[454,22,198,24],[454,24,198,26,"onBlur"],[455,14,198,33],[456,16,198,33,"fileName"],[456,24,198,33],[456,26,198,33,"_jsxFileName"],[456,38,198,33],[457,16,198,33,"lineNumber"],[457,26,198,33],[458,16,198,33,"columnNumber"],[458,28,198,33],[459,14,198,33],[459,21,199,17],[459,22,199,18],[460,12,199,18],[461,14,199,18,"fileName"],[461,22,199,18],[461,24,199,18,"_jsxFileName"],[461,36,199,18],[462,14,199,18,"lineNumber"],[462,24,199,18],[463,14,199,18,"columnNumber"],[463,26,199,18],[464,12,199,18],[464,19,200,20],[464,20,200,21],[465,10,200,21],[466,8,201,14],[467,10,201,14,"fileName"],[467,18,201,14],[467,20,201,14,"_jsxFileName"],[467,32,201,14],[468,10,201,14,"lineNumber"],[468,20,201,14],[469,10,201,14,"columnNumber"],[469,22,201,14],[470,8,201,14],[470,15,202,11],[470,16,203,9],[470,31,204,8],[470,35,204,8,"_reactJsxDevRuntime"],[470,54,204,8],[470,55,204,8,"jsxDEV"],[470,61,204,8],[470,63,204,9,"_FieldError"],[470,74,204,19],[470,75,204,19,"FieldError"],[470,85,204,19],[471,10,204,20,"message"],[471,17,204,27],[471,19,204,29,"errors"],[471,25,204,35],[471,26,204,36,"location"],[471,34,204,44],[471,37,204,47,"t"],[471,38,204,48],[471,39,204,49],[471,80,204,90],[471,81,204,91],[471,84,204,94,"undefined"],[472,8,204,104],[473,10,204,104,"fileName"],[473,18,204,104],[473,20,204,104,"_jsxFileName"],[473,32,204,104],[474,10,204,104,"lineNumber"],[474,20,204,104],[475,10,204,104,"columnNumber"],[475,22,204,104],[476,8,204,104],[476,15,204,106],[476,16,204,107],[477,6,204,107],[478,8,204,107,"fileName"],[478,16,204,107],[478,18,204,107,"_jsxFileName"],[478,30,204,107],[479,8,204,107,"lineNumber"],[479,18,204,107],[480,8,204,107,"columnNumber"],[480,20,204,107],[481,6,204,107],[481,13,205,12],[481,14,205,13],[482,4,205,13],[483,6,205,13,"fileName"],[483,14,205,13],[483,16,205,13,"_jsxFileName"],[483,28,205,13],[484,6,205,13,"lineNumber"],[484,16,205,13],[485,6,205,13,"columnNumber"],[485,18,205,13],[486,4,205,13],[486,11,206,10],[486,12,206,11],[487,2,208,0],[488,2,208,1,"_c"],[488,4,208,1],[488,7,27,16,"StepDetails"],[488,18,27,27],[489,2,27,27],[489,6,27,27,"_c"],[489,8,27,27],[490,2,27,27,"$RefreshReg$"],[490,14,27,27],[490,15,27,27,"_c"],[490,17,27,27],[491,0,27,27],[491,3]],"functionMap":{"names":["<global>","StepDetails","Controller.props.render","EVENT_TYPES.map$argument_0","TouchableOpacity.props.onPress"],"mappings":"AAA;OC0B;kBCgD;WDmB;kBCc;WDe;2BEY;yBCM,0BD;WFS;oBCkC;aDiB;CDO"},"hasCjsExports":false},"type":"js/module"}]