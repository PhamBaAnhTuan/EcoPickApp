__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var _jsxFileName = "/home/luanthnh/Public/Workspaces/uda/projects/EcoPick/ecopick/src/app/events/create/components/FieldError.tsx"; // Adjust according to your fonts path
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.FieldError = FieldError;
  require(_dependencyMap[0], "react");
  var _reactNative = require(_dependencyMap[1], "react-native");
  var _expoVectorIcons = require(_dependencyMap[2], "@expo/vector-icons");
  var _constants = require(_dependencyMap[3], "../../../../constants");
  var _reactJsxDevRuntime = require(_dependencyMap[4], "react/jsx-dev-runtime");
  function FieldError(_ref) {
    var message = _ref.message;
    if (!message) return null;
    return /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
      style: s.errorRow,
      children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
        name: "alert-circle",
        size: 13,
        color: "#EF4444"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 7
      }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
        style: s.errorText,
        children: message
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 7
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }, this);
  }
  _c = FieldError;
  var s = _reactNative.StyleSheet.create({
    errorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4
    },
    errorText: {
      fontFamily: _constants.Fonts.medium,
      fontSize: 12,
      color: '#EF4444'
    }
  });
  var _c;
  $RefreshReg$(_c, "FieldError");
});","lineCount":56,"map":[[4,134,4,47],[5,2,4,47,"Object"],[5,8,4,47],[5,9,4,47,"defineProperty"],[5,23,4,47],[5,24,4,47,"exports"],[5,31,4,47],[6,4,4,47,"value"],[6,9,4,47],[7,2,4,47],[8,2,6,0,"exports"],[8,9,6,0],[8,10,6,0,"FieldError"],[8,20,6,0],[8,23,6,0,"FieldError"],[8,33,6,0],[9,2,1,0,"require"],[9,9,1,0],[9,10,1,0,"_dependencyMap"],[9,24,1,0],[10,2,2,0],[10,6,2,0,"_reactNative"],[10,18,2,0],[10,21,2,0,"require"],[10,28,2,0],[10,29,2,0,"_dependencyMap"],[10,43,2,0],[11,2,3,0],[11,6,3,0,"_expoVectorIcons"],[11,22,3,0],[11,25,3,0,"require"],[11,32,3,0],[11,33,3,0,"_dependencyMap"],[11,47,3,0],[12,2,4,0],[12,6,4,0,"_constants"],[12,16,4,0],[12,19,4,0,"require"],[12,26,4,0],[12,27,4,0,"_dependencyMap"],[12,41,4,0],[13,2,4,46],[13,6,4,46,"_reactJsxDevRuntime"],[13,25,4,46],[13,28,4,46,"require"],[13,35,4,46],[13,36,4,46,"_dependencyMap"],[13,50,4,46],[14,2,6,7],[14,11,6,16,"FieldError"],[14,21,6,26,"FieldError"],[14,22,6,26,"_ref"],[14,26,6,26],[14,28,6,62],[15,4,6,62],[15,8,6,29,"message"],[15,15,6,36],[15,18,6,36,"_ref"],[15,22,6,36],[15,23,6,29,"message"],[15,30,6,36],[16,4,7,2],[16,8,7,6],[16,9,7,7,"message"],[16,16,7,14],[16,18,7,16],[16,25,7,23],[16,29,7,27],[17,4,8,2],[17,24,9,4],[17,28,9,4,"_reactJsxDevRuntime"],[17,47,9,4],[17,48,9,4,"jsxDEV"],[17,54,9,4],[17,56,9,5,"_reactNative"],[17,68,9,9],[17,69,9,9,"View"],[17,73,9,9],[18,6,9,10,"style"],[18,11,9,15],[18,13,9,17,"s"],[18,14,9,18],[18,15,9,19,"errorRow"],[18,23,9,28],[19,6,9,28,"children"],[19,14,9,28],[19,30,10,6],[19,34,10,6,"_reactJsxDevRuntime"],[19,53,10,6],[19,54,10,6,"jsxDEV"],[19,60,10,6],[19,62,10,7,"_expoVectorIcons"],[19,78,10,15],[19,79,10,15,"Ionicons"],[19,87,10,15],[20,8,10,16,"name"],[20,12,10,20],[20,14,10,21],[20,28,10,35],[21,8,10,36,"size"],[21,12,10,40],[21,14,10,42],[21,16,10,45],[22,8,10,46,"color"],[22,13,10,51],[22,15,10,52],[23,6,10,61],[24,8,10,61,"fileName"],[24,16,10,61],[24,18,10,61,"_jsxFileName"],[24,30,10,61],[25,8,10,61,"lineNumber"],[25,18,10,61],[26,8,10,61,"columnNumber"],[26,20,10,61],[27,6,10,61],[27,13,10,63],[27,14,10,64],[27,29,11,6],[27,33,11,6,"_reactJsxDevRuntime"],[27,52,11,6],[27,53,11,6,"jsxDEV"],[27,59,11,6],[27,61,11,7,"_reactNative"],[27,73,11,11],[27,74,11,11,"Text"],[27,78,11,11],[28,8,11,12,"style"],[28,13,11,17],[28,15,11,19,"s"],[28,16,11,20],[28,17,11,21,"errorText"],[28,26,11,31],[29,8,11,31,"children"],[29,16,11,31],[29,18,11,33,"message"],[30,6,11,40],[31,8,11,40,"fileName"],[31,16,11,40],[31,18,11,40,"_jsxFileName"],[31,30,11,40],[32,8,11,40,"lineNumber"],[32,18,11,40],[33,8,11,40,"columnNumber"],[33,20,11,40],[34,6,11,40],[34,13,11,47],[34,14,11,48],[35,4,11,48],[36,6,11,48,"fileName"],[36,14,11,48],[36,16,11,48,"_jsxFileName"],[36,28,11,48],[37,6,11,48,"lineNumber"],[37,16,11,48],[38,6,11,48,"columnNumber"],[38,18,11,48],[39,4,11,48],[39,11,12,10],[39,12,12,11],[40,2,14,0],[41,2,14,1,"_c"],[41,4,14,1],[41,7,6,16,"FieldError"],[41,17,6,26],[42,2,16,0],[42,6,16,6,"s"],[42,7,16,7],[42,10,16,10,"StyleSheet"],[42,22,16,20],[42,23,16,20,"StyleSheet"],[42,33,16,20],[42,34,16,21,"create"],[42,40,16,27],[42,41,16,28],[43,4,17,2,"errorRow"],[43,12,17,10],[43,14,17,12],[44,6,17,14,"flexDirection"],[44,19,17,27],[44,21,17,29],[44,26,17,34],[45,6,17,36,"alignItems"],[45,16,17,46],[45,18,17,48],[45,26,17,56],[46,6,17,58,"gap"],[46,9,17,61],[46,11,17,63],[47,4,17,65],[47,5,17,66],[48,4,18,2,"errorText"],[48,13,18,11],[48,15,18,13],[49,6,18,15,"fontFamily"],[49,16,18,25],[49,18,18,27,"Fonts"],[49,28,18,32],[49,29,18,32,"Fonts"],[49,34,18,32],[49,35,18,33,"medium"],[49,41,18,39],[50,6,18,41,"fontSize"],[50,14,18,49],[50,16,18,51],[50,18,18,53],[51,6,18,55,"color"],[51,11,18,60],[51,13,18,62],[52,4,18,72],[53,2,19,0],[53,3,19,1],[53,4,19,2],[54,2,19,3],[54,6,19,3,"_c"],[54,8,19,3],[55,2,19,3,"$RefreshReg$"],[55,14,19,3],[55,15,19,3,"_c"],[55,17,19,3],[56,0,19,3],[56,3]],"functionMap":{"names":["<global>","FieldError"],"mappings":"AAA;OCK;CDQ"},"hasCjsExports":false},"type":"js/module"}]