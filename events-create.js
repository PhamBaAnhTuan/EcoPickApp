__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var _jsxFileName = "/home/luanthnh/Public/Workspaces/uda/projects/EcoPick/ecopick/src/app/events/create/index.tsx",
    _s = $RefreshSig$();
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return CreateEventScreen;
    }
  });
  var _babelRuntimeHelpersAsyncToGenerator = require(_dependencyMap[0], "@babel/runtime/helpers/asyncToGenerator");
  var _asyncToGenerator = _interopDefault(_babelRuntimeHelpersAsyncToGenerator);
  var _babelRuntimeHelpersSlicedToArray = require(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray");
  var _slicedToArray = _interopDefault(_babelRuntimeHelpersSlicedToArray);
  var _constants = require(_dependencyMap[2], "../../constants");
  var _hooksUseEventQueries = require(_dependencyMap[3], "@/hooks/useEventQueries");
  var _storesAuthStore = require(_dependencyMap[4], "@/stores/authStore");
  var _expoVectorIcons = require(_dependencyMap[5], "@expo/vector-icons");
  var _hookformResolversZod = require(_dependencyMap[6], "@hookform/resolvers/zod");
  var _expoImagePicker = require(_dependencyMap[7], "expo-image-picker");
  var ImagePicker = _interopNamespace(_expoImagePicker);
  var _expoRouter = require(_dependencyMap[8], "expo-router");
  var _expoStatusBar = require(_dependencyMap[9], "expo-status-bar");
  var _react = require(_dependencyMap[10], "react");
  var React = _interopDefault(_react);
  var _reactHookForm = require(_dependencyMap[11], "react-hook-form");
  var _reactI18next = require(_dependencyMap[12], "react-i18next");
  var _reactNative = require(_dependencyMap[13], "react-native");
  var _reactNativeSafeAreaContext = require(_dependencyMap[14], "react-native-safe-area-context");
  var _constants2 = require(_dependencyMap[15], "../../../constants");
  var _constants3 = require(_dependencyMap[16], "./constants");
  var _componentsStepDetails = require(_dependencyMap[17], "./components/StepDetails");
  var _componentsStepSchedule = require(_dependencyMap[18], "./components/StepSchedule");
  var _componentsStepSettings = require(_dependencyMap[19], "./components/StepSettings");
  var _reactJsxDevRuntime = require(_dependencyMap[20], "react/jsx-dev-runtime");
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;
  function CreateEventScreen() {
    _s();
    var router = (0, _expoRouter.useRouter)();
    var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;
    var user = (0, _storesAuthStore.useAuthStore)(st => st.user);
    var createEvent = (0, _hooksUseEventQueries.useCreateEvent)();
    var scrollRef = (0, _react.useRef)(null);
    var params = (0, _expoRouter.useLocalSearchParams)();

    // ── React Hook Form ──
    var _useForm = (0, _reactHookForm.useForm)({
        resolver: (0, _hookformResolversZod.zodResolver)(_constants3.createEventSchema),
        defaultValues: {
          title: '',
          description: '',
          location: params.location || '',
          maxParticipants: 30,
          ecoPointReward: 50
        },
        mode: 'onBlur'
      }),
      control = _useForm.control,
      handleSubmit = _useForm.handleSubmit,
      errors = _useForm.formState.errors,
      watch = _useForm.watch,
      trigger = _useForm.trigger;
    var titleValue = watch('title');
    var descValue = watch('description') || '';
    var locationValue = watch('location');

    // ── Non-zod state ──
    var _useState = (0, _react.useState)('cleanup'),
      _useState2 = (0, _slicedToArray.default)(_useState, 2),
      eventType = _useState2[0],
      setEventType = _useState2[1];
    var _useState3 = (0, _react.useState)('easy'),
      _useState4 = (0, _slicedToArray.default)(_useState3, 2),
      difficulty = _useState4[0],
      setDifficulty = _useState4[1];
    var _useState5 = (0, _react.useState)(params.address || ''),
      _useState6 = (0, _slicedToArray.default)(_useState5, 1),
      address = _useState6[0];
    var _useState7 = (0, _react.useState)(params.latitude ? parseFloat(params.latitude) : 0),
      _useState8 = (0, _slicedToArray.default)(_useState7, 1),
      latitude = _useState8[0];
    var _useState9 = (0, _react.useState)(params.longitude ? parseFloat(params.longitude) : 0),
      _useState0 = (0, _slicedToArray.default)(_useState9, 1),
      longitude = _useState0[0];
    var _useState1 = (0, _react.useState)(new Set(['Gloves', 'Trash bags'])),
      _useState10 = (0, _slicedToArray.default)(_useState1, 2),
      selectedEquipment = _useState10[0],
      setSelectedEquipment = _useState10[1];
    var _useState11 = (0, _react.useState)(null),
      _useState12 = (0, _slicedToArray.default)(_useState11, 2),
      coverImage = _useState12[0],
      setCoverImage = _useState12[1];
    var _useState13 = (0, _react.useState)(() => {
        var d = new Date();
        d.setDate(d.getDate() + 7);
        d.setHours(9, 0, 0, 0);
        return d;
      }),
      _useState14 = (0, _slicedToArray.default)(_useState13, 2),
      startDate = _useState14[0],
      setStartDate = _useState14[1];
    var _useState15 = (0, _react.useState)(() => {
        var d = new Date();
        d.setDate(d.getDate() + 7);
        d.setHours(12, 0, 0, 0);
        return d;
      }),
      _useState16 = (0, _slicedToArray.default)(_useState15, 2),
      endDate = _useState16[0],
      setEndDate = _useState16[1];
    var _useState17 = (0, _react.useState)(null),
      _useState18 = (0, _slicedToArray.default)(_useState17, 2),
      showPicker = _useState18[0],
      setShowPicker = _useState18[1];
    var _useState19 = (0, _react.useState)(0),
      _useState20 = (0, _slicedToArray.default)(_useState19, 2),
      activeStep = _useState20[0],
      setActiveStep = _useState20[1];

    // ── Keyboard padding ──
    var keyboardPadding = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    (0, _react.useEffect)(() => {
      var showSub = _reactNative.Keyboard.addListener(_reactNative.Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', e => _reactNative.Animated.spring(keyboardPadding, {
        toValue: e.endCoordinates.height,
        useNativeDriver: false
      }).start());
      var hideSub = _reactNative.Keyboard.addListener(_reactNative.Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => _reactNative.Animated.spring(keyboardPadding, {
        toValue: 0,
        useNativeDriver: false
      }).start());
      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [keyboardPadding]);

    // ── Handlers ──
    var toggleEquipment = (0, _react.useCallback)(item => {
      setSelectedEquipment(prev => {
        var n = new Set(prev);
        if (n.has(item)) n.delete(item);else n.add(item);
        return n;
      });
    }, []);
    var pickCoverImage = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator.default)(function* () {
        var _yield$ImagePicker$re = yield ImagePicker.requestMediaLibraryPermissionsAsync(),
          status = _yield$ImagePicker$re.status;
        if (status !== 'granted') {
          _reactNative.Alert.alert(t('common.error'), 'Photo library permission is required');
          return;
        }
        var result = yield ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.8
        });
        if (!result.canceled && result.assets.length > 0) setCoverImage(result.assets[0].uri);
      });
      return function pickCoverImage() {
        return _ref.apply(this, arguments);
      };
    }();
    var goNext = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator.default)(function* () {
        if (activeStep === 0) {
          var valid = yield trigger(['title', 'location']);
          if (!valid) return;
        }
        setActiveStep(s => Math.min(s + 1, _constants3.STEPS.length - 1));
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true
        });
      });
      return function goNext() {
        return _ref2.apply(this, arguments);
      };
    }();
    var onSubmit = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator.default)(function* (data) {
        if (!user?.id) {
          _reactNative.Alert.alert(t('common.error'), t('createEvent.loginRequired'));
          return;
        }
        if (endDate <= startDate) {
          _reactNative.Alert.alert(t('common.error'), t('createEvent.validation.endDateAfterStart'));
          return;
        }
        try {
          var event = yield createEvent.mutateAsync({
            organizer_id: user.id,
            title: data.title.trim(),
            description: data.description?.trim() || undefined,
            type: eventType,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            latitude,
            longitude,
            location: data.location.trim(),
            address: address.trim() || undefined,
            max_paticipants: data.maxParticipants || undefined,
            equipment: Array.from(selectedEquipment).join(',') || undefined,
            difficulty,
            eco_point_reward: data.ecoPointReward || 0,
            cover_image_url: coverImage || undefined,
            status: 'upcoming'
          });
          router.replace(`/events/${event.id}`);
        } catch (error) {
          _reactNative.Alert.alert(t('common.error'), error?.response?.data?.detail || t('createEvent.createError'));
        }
      });
      return function onSubmit(_x) {
        return _ref3.apply(this, arguments);
      };
    }();
    var onDatePickerChange = type => (_, date) => {
      setShowPicker(null);
      if (!date) return;
      if (type === 'startDate') {
        var u = new Date(startDate);
        u.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        setStartDate(u);
        if (u >= endDate) {
          var e = new Date(u);
          e.setHours(u.getHours() + 3);
          setEndDate(e);
        }
      } else if (type === 'startTime') {
        var _u = new Date(startDate);
        _u.setHours(date.getHours(), date.getMinutes());
        setStartDate(_u);
      } else if (type === 'endDate') {
        var _u2 = new Date(endDate);
        _u2.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        setEndDate(_u2);
      } else {
        var _u3 = new Date(endDate);
        _u3.setHours(date.getHours(), date.getMinutes());
        setEndDate(_u3);
      }
    };
    var durationHrs = Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 3600000));
    var durationMins = Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) % 3600000 / 60000));
    return /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
      style: s.root,
      children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoStatusBar.StatusBar, {
        style: "dark"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 7
      }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNativeSafeAreaContext.SafeAreaView, {
        edges: ['top'],
        style: s.headerArea,
        children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
          style: s.header,
          children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TouchableOpacity, {
            style: s.headerBtn,
            onPress: () => router.back(),
            activeOpacity: 0.7,
            children: /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
              name: "close",
              size: 22,
              color: _constants2.Colors.textPrimary
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 225,
              columnNumber: 13
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 224,
            columnNumber: 11
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
            style: s.headerTitle,
            children: t('createEvent.title')
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 227,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 223,
          columnNumber: 9
        }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
          style: s.stepper,
          children: _constants3.STEPS.map((step, idx) => {
            var done = idx < activeStep;
            var active = idx === activeStep;
            return /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(React.default.Fragment, {
              children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TouchableOpacity, {
                style: s.stepTouch,
                onPress: () => idx < activeStep && setActiveStep(idx),
                activeOpacity: 0.7,
                children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
                  style: [s.stepCircle, active && s.stepCircleActive, done && s.stepCircleDone],
                  children: done ? /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
                    name: "checkmark",
                    size: 14,
                    color: _constants2.Colors.white
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 244,
                    columnNumber: 23
                  }, this) : /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
                    name: step.icon,
                    size: 14,
                    color: active ? _constants2.Colors.white : '#94A3B8'
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 246,
                    columnNumber: 23
                  }, this)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 242,
                  columnNumber: 19
                }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
                  style: [s.stepText, active && s.stepTextActive, done && s.stepTextDone],
                  children: t(step.labelKey)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 249,
                  columnNumber: 19
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 237,
                columnNumber: 17
              }, this), idx < _constants3.STEPS.length - 1 && /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
                style: [s.stepConnector, done && s.stepConnectorDone]
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 253,
                columnNumber: 44
              }, this)]
            }, step.key, true, {
              fileName: _jsxFileName,
              lineNumber: 236,
              columnNumber: 15
            }, this);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 231,
          columnNumber: 9
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 222,
        columnNumber: 7
      }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.KeyboardAvoidingView, {
        style: {
          flex: 1
        },
        behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : undefined,
        keyboardVerticalOffset: 0,
        children: /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.ScrollView, {
          ref: scrollRef,
          style: s.scroll,
          contentContainerStyle: s.scrollInner,
          showsVerticalScrollIndicator: false,
          keyboardShouldPersistTaps: "handled",
          keyboardDismissMode: "interactive",
          children: [activeStep === 0 && /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_componentsStepDetails.StepDetails, {
            control: control,
            errors: errors,
            t: t,
            coverImage: coverImage,
            pickCoverImage: pickCoverImage,
            titleValue: titleValue,
            descValue: descValue,
            eventType: eventType,
            setEventType: setEventType,
            locationValue: locationValue,
            latitude: latitude,
            longitude: longitude,
            address: address,
            params: params
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 276,
            columnNumber: 13
          }, this), activeStep === 1 && /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_componentsStepSchedule.StepSchedule, {
            t: t,
            startDate: startDate,
            endDate: endDate,
            showPicker: showPicker,
            setShowPicker: setShowPicker,
            onDatePickerChange: onDatePickerChange,
            durationHrs: durationHrs,
            durationMins: durationMins
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 296,
            columnNumber: 13
          }, this), activeStep === 2 && /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_componentsStepSettings.StepSettings, {
            t: t,
            control: control,
            errors: errors,
            difficulty: difficulty,
            setDifficulty: setDifficulty,
            selectedEquipment: selectedEquipment,
            toggleEquipment: toggleEquipment,
            titleValue: titleValue,
            locationValue: locationValue,
            eventType: eventType,
            startDate: startDate
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 310,
            columnNumber: 13
          }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Animated.View, {
            style: {
              height: keyboardPadding
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 326,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 266,
          columnNumber: 9
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 261,
        columnNumber: 7
      }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNativeSafeAreaContext.SafeAreaView, {
        edges: ['bottom'],
        style: s.bottomArea,
        children: /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
          style: s.bottomBar,
          children: [activeStep > 0 ? /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TouchableOpacity, {
            style: s.backBtn,
            onPress: () => {
              setActiveStep(p => p - 1);
              scrollRef.current?.scrollTo({
                y: 0,
                animated: true
              });
            },
            activeOpacity: 0.7,
            children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
              name: "arrow-back",
              size: 18,
              color: _constants2.Colors.textPrimary
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 342,
              columnNumber: 15
            }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
              style: s.backBtnText,
              children: t('common.back')
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 343,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 334,
            columnNumber: 13
          }, this) : /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.View, {
            style: {
              minWidth: 80
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 346,
            columnNumber: 13
          }, this), activeStep < _constants3.STEPS.length - 1 ? /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TouchableOpacity, {
            style: s.nextBtn,
            onPress: goNext,
            activeOpacity: 0.8,
            children: [/*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
              style: s.nextBtnText,
              children: t('common.next')
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 351,
              columnNumber: 15
            }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
              name: "arrow-forward",
              size: 18,
              color: "#fff"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 352,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 350,
            columnNumber: 13
          }, this) : /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.TouchableOpacity, {
            style: [s.submitBtn, createEvent.isPending && {
              opacity: 0.7
            }],
            onPress: handleSubmit(onSubmit),
            activeOpacity: 0.8,
            disabled: createEvent.isPending,
            children: [createEvent.isPending ? /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.ActivityIndicator, {
              size: "small",
              color: "#fff"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 362,
              columnNumber: 17
            }, this) : /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_expoVectorIcons.Ionicons, {
              name: "rocket-outline",
              size: 18,
              color: "#fff"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 364,
              columnNumber: 17
            }, this), /*#__PURE__*/(0, _reactJsxDevRuntime.jsxDEV)(_reactNative.Text, {
              style: s.submitText,
              children: createEvent.isPending ? t('createEvent.creating') : t('createEvent.publish')
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 366,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 355,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 332,
          columnNumber: 9
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 331,
        columnNumber: 7
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 5
    }, this);
  }
  _s(CreateEventScreen, "5VcHG0E1D0aUdUgQnCTAI8gmCyo=", false, function () {
    return [_expoRouter.useRouter, _reactI18next.useTranslation, _storesAuthStore.useAuthStore, _hooksUseEventQueries.useCreateEvent, _expoRouter.useLocalSearchParams, _reactHookForm.useForm];
  });
  _c = CreateEventScreen;
  var s = _reactNative.StyleSheet.create({
    stepTextDone: {
      color: _constants2.Colors.primary
    },
    stepTextActive: {
      color: _constants2.Colors.primary,
      fontFamily: _constants.Fonts.bold
    },
    scrollInner: {
      paddingBottom: 20
    },
    stepCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#E2E8F0',
      alignItems: 'center',
      justifyContent: 'center'
    },
    stepCircleDone: {
      backgroundColor: _constants2.Colors.primary
    },
    scroll: {
      flex: 1
    },
    headerTitle: {
      fontFamily: _constants.Fonts.bold,
      fontSize: 18,
      color: _constants2.Colors.textPrimary
    },
    backBtnText: {
      fontFamily: _constants.Fonts.semiBold,
      fontSize: 15,
      color: _constants2.Colors.textPrimary
    },
    stepText: {
      fontFamily: _constants.Fonts.medium,
      fontSize: 11,
      color: '#94A3B8'
    },
    stepConnector: {
      flex: 1,
      height: 2,
      backgroundColor: '#E2E8F0',
      marginHorizontal: 6,
      borderRadius: 1,
      marginBottom: 18
    },
    headerArea: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(32,105,58,0.06)',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      zIndex: 10
    },
    stepTouch: {
      alignItems: 'center',
      gap: 4,
      minWidth: 60
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingBottom: 14
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10
    },
    submitBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: _constants2.Colors.primary,
      paddingHorizontal: 26,
      paddingVertical: 14,
      borderRadius: 16,
      shadowColor: _constants2.Colors.primary,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4
    },
    stepCircleActive: {
      backgroundColor: _constants2.Colors.primary,
      shadowColor: _constants2.Colors.primary,
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.35,
      shadowRadius: 6,
      elevation: 4
    },
    stepConnectorDone: {
      backgroundColor: _constants2.Colors.primary
    },
    bottomArea: {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: 'rgba(32,105,58,0.06)'
    },
    backBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 12,
      minWidth: 80
    },
    nextBtnText: {
      fontFamily: _constants.Fonts.bold,
      fontSize: 15,
      color: '#fff'
    },
    submitText: {
      fontFamily: _constants.Fonts.bold,
      fontSize: 15,
      color: '#fff'
    },
    headerBtn: {
      position: 'absolute',
      left: 16,
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F1F5F9'
    },
    nextBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: _constants2.Colors.primary,
      paddingHorizontal: 26,
      paddingVertical: 14,
      borderRadius: 16,
      shadowColor: _constants2.Colors.primary,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4
    },
    root: {
      flex: 1,
      backgroundColor: '#F4F7F5'
    },
    bottomBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10
    }
  });
  var _c;
  $RefreshReg$(_c, "CreateEventScreen");
});","lineCount":758,"map":[[29,2,39,15,"Object"],[29,8,39,15],[29,9,39,15,"defineProperty"],[29,23,39,15],[29,24,39,15,"exports"],[29,31,39,15],[30,4,39,15,"enumerable"],[30,14,39,15],[31,4,39,15,"get"],[31,7,39,15],[31,18,39,15,"get"],[31,19,39,15],[32,6,39,15],[32,13,39,15,"CreateEventScreen"],[32,30,39,15],[33,4,39,15],[34,2,39,15],[35,2,375,1],[35,6,375,1,"_babelRuntimeHelpersAsyncToGenerator"],[35,42,375,1],[35,45,375,1,"require"],[35,52,375,1],[35,53,375,1,"_dependencyMap"],[35,67,375,1],[36,2,375,1],[36,6,375,1,"_asyncToGenerator"],[36,23,375,1],[36,26,375,1,"_interopDefault"],[36,41,375,1],[36,42,375,1,"_babelRuntimeHelpersAsyncToGenerator"],[36,78,375,1],[37,2,375,1],[37,6,375,1,"_babelRuntimeHelpersSlicedToArray"],[37,39,375,1],[37,42,375,1,"require"],[37,49,375,1],[37,50,375,1,"_dependencyMap"],[37,64,375,1],[38,2,375,1],[38,6,375,1,"_slicedToArray"],[38,20,375,1],[38,23,375,1,"_interopDefault"],[38,38,375,1],[38,39,375,1,"_babelRuntimeHelpersSlicedToArray"],[38,72,375,1],[39,2,1,0],[39,6,1,0,"_constants"],[39,16,1,0],[39,19,1,0,"require"],[39,26,1,0],[39,27,1,0,"_dependencyMap"],[39,41,1,0],[40,2,3,0],[40,6,3,0,"_hooksUseEventQueries"],[40,27,3,0],[40,30,3,0,"require"],[40,37,3,0],[40,38,3,0,"_dependencyMap"],[40,52,3,0],[41,2,4,0],[41,6,4,0,"_storesAuthStore"],[41,22,4,0],[41,25,4,0,"require"],[41,32,4,0],[41,33,4,0,"_dependencyMap"],[41,47,4,0],[42,2,5,0],[42,6,5,0,"_expoVectorIcons"],[42,22,5,0],[42,25,5,0,"require"],[42,32,5,0],[42,33,5,0,"_dependencyMap"],[42,47,5,0],[43,2,6,0],[43,6,6,0,"_hookformResolversZod"],[43,27,6,0],[43,30,6,0,"require"],[43,37,6,0],[43,38,6,0,"_dependencyMap"],[43,52,6,0],[44,2,8,0],[44,6,8,0,"_expoImagePicker"],[44,22,8,0],[44,25,8,0,"require"],[44,32,8,0],[44,33,8,0,"_dependencyMap"],[44,47,8,0],[45,2,8,0],[45,6,8,0,"ImagePicker"],[45,17,8,0],[45,20,8,0,"_interopNamespace"],[45,37,8,0],[45,38,8,0,"_expoImagePicker"],[45,54,8,0],[46,2,9,0],[46,6,9,0,"_expoRouter"],[46,17,9,0],[46,20,9,0,"require"],[46,27,9,0],[46,28,9,0,"_dependencyMap"],[46,42,9,0],[47,2,10,0],[47,6,10,0,"_expoStatusBar"],[47,20,10,0],[47,23,10,0,"require"],[47,30,10,0],[47,31,10,0,"_dependencyMap"],[47,45,10,0],[48,2,11,0],[48,6,11,0,"_react"],[48,12,11,0],[48,15,11,0,"require"],[48,22,11,0],[48,23,11,0,"_dependencyMap"],[48,37,11,0],[49,2,11,0],[49,6,11,0,"React"],[49,11,11,0],[49,14,11,0,"_interopDefault"],[49,29,11,0],[49,30,11,0,"_react"],[49,36,11,0],[50,2,12,0],[50,6,12,0,"_reactHookForm"],[50,20,12,0],[50,23,12,0,"require"],[50,30,12,0],[50,31,12,0,"_dependencyMap"],[50,45,12,0],[51,2,13,0],[51,6,13,0,"_reactI18next"],[51,19,13,0],[51,22,13,0,"require"],[51,29,13,0],[51,30,13,0,"_dependencyMap"],[51,44,13,0],[52,2,14,0],[52,6,14,0,"_reactNative"],[52,18,14,0],[52,21,14,0,"require"],[52,28,14,0],[52,29,14,0,"_dependencyMap"],[52,43,14,0],[53,2,27,0],[53,6,27,0,"_reactNativeSafeAreaContext"],[53,33,27,0],[53,36,27,0,"require"],[53,43,27,0],[53,44,27,0,"_dependencyMap"],[53,58,27,0],[54,2,28,0],[54,6,28,0,"_constants2"],[54,17,28,0],[54,20,28,0,"require"],[54,27,28,0],[54,28,28,0,"_dependencyMap"],[54,42,28,0],[55,2,30,0],[55,6,30,0,"_constants3"],[55,17,30,0],[55,20,30,0,"require"],[55,27,30,0],[55,28,30,0,"_dependencyMap"],[55,42,30,0],[56,2,31,0],[56,6,31,0,"_componentsStepDetails"],[56,28,31,0],[56,31,31,0,"require"],[56,38,31,0],[56,39,31,0,"_dependencyMap"],[56,53,31,0],[57,2,32,0],[57,6,32,0,"_componentsStepSchedule"],[57,29,32,0],[57,32,32,0,"require"],[57,39,32,0],[57,40,32,0,"_dependencyMap"],[57,54,32,0],[58,2,33,0],[58,6,33,0,"_componentsStepSettings"],[58,29,33,0],[58,32,33,0,"require"],[58,39,33,0],[58,40,33,0,"_dependencyMap"],[58,54,33,0],[59,2,33,57],[59,6,33,57,"_reactJsxDevRuntime"],[59,25,33,57],[59,28,33,57,"require"],[59,35,33,57],[59,36,33,57,"_dependencyMap"],[59,50,33,57],[60,2,37,0],[60,6,37,0,"_Dimensions$get"],[60,21,37,0],[60,24,37,18,"Dimensions"],[60,36,37,28],[60,37,37,28,"Dimensions"],[60,47,37,28],[60,48,37,29,"get"],[60,51,37,32],[60,52,37,33],[60,60,37,41],[60,61,37,42],[61,4,37,8,"width"],[61,9,37,13],[61,12,37,13,"_Dimensions$get"],[61,27,37,13],[61,28,37,8,"width"],[61,33,37,13],[62,2,39,15],[62,11,39,24,"CreateEventScreen"],[62,28,39,41,"CreateEventScreen"],[62,29,39,41],[62,31,39,44],[63,4,39,44,"_s"],[63,6,39,44],[64,4,40,2],[64,8,40,8,"router"],[64,14,40,14],[64,17,40,17],[64,21,40,17,"useRouter"],[64,32,40,26],[64,33,40,26,"useRouter"],[64,42,40,26],[64,44,40,27],[64,45,40,28],[65,4,41,2],[65,8,41,2,"_useTranslation"],[65,23,41,2],[65,26,41,16],[65,30,41,16,"useTranslation"],[65,43,41,30],[65,44,41,30,"useTranslation"],[65,58,41,30],[65,60,41,31],[65,61,41,32],[66,6,41,10,"t"],[66,7,41,11],[66,10,41,11,"_useTranslation"],[66,25,41,11],[66,26,41,10,"t"],[66,27,41,11],[67,4,42,2],[67,8,42,8,"user"],[67,12,42,12],[67,15,42,15],[67,19,42,15,"useAuthStore"],[67,35,42,27],[67,36,42,27,"useAuthStore"],[67,48,42,27],[67,50,42,29,"st"],[67,52,42,31],[67,56,42,36,"st"],[67,58,42,38],[67,59,42,39,"user"],[67,63,42,43],[67,64,42,44],[68,4,43,2],[68,8,43,8,"createEvent"],[68,19,43,19],[68,22,43,22],[68,26,43,22,"useCreateEvent"],[68,47,43,36],[68,48,43,36,"useCreateEvent"],[68,62,43,36],[68,64,43,37],[68,65,43,38],[69,4,44,2],[69,8,44,8,"scrollRef"],[69,17,44,17],[69,20,44,20],[69,24,44,20,"useRef"],[69,30,44,26],[69,31,44,26,"useRef"],[69,37,44,26],[69,39,44,39],[69,43,44,43],[69,44,44,44],[70,4,46,2],[70,8,46,8,"params"],[70,14,46,14],[70,17,46,17],[70,21,46,17,"useLocalSearchParams"],[70,32,46,37],[70,33,46,37,"useLocalSearchParams"],[70,53,46,37],[70,55,52,5],[70,56,52,6],[72,4,54,2],[73,4,55,2],[73,8,55,2,"_useForm"],[73,16,55,2],[73,19,61,6],[73,23,61,6,"useForm"],[73,37,61,13],[73,38,61,13,"useForm"],[73,45,61,13],[73,47,61,31],[74,8,62,4,"resolver"],[74,16,62,12],[74,18,62,14],[74,22,62,14,"zodResolver"],[74,43,62,25],[74,44,62,25,"zodResolver"],[74,55,62,25],[74,57,62,26,"createEventSchema"],[74,68,62,43],[74,69,62,43,"createEventSchema"],[74,86,62,43],[74,87,62,44],[75,8,63,4,"defaultValues"],[75,21,63,17],[75,23,63,19],[76,10,64,6,"title"],[76,15,64,11],[76,17,64,13],[76,19,64,15],[77,10,65,6,"description"],[77,21,65,17],[77,23,65,19],[77,25,65,21],[78,10,66,6,"location"],[78,18,66,14],[78,20,66,16,"params"],[78,26,66,22],[78,27,66,23,"location"],[78,35,66,31],[78,39,66,35],[78,41,66,37],[79,10,67,6,"maxParticipants"],[79,25,67,21],[79,27,67,23],[79,29,67,25],[80,10,68,6,"ecoPointReward"],[80,24,68,20],[80,26,68,22],[81,8,69,4],[81,9,69,5],[82,8,70,4,"mode"],[82,12,70,8],[82,14,70,10],[83,6,71,2],[83,7,71,3],[83,8,71,4],[84,6,56,4,"control"],[84,13,56,11],[84,16,56,11,"_useForm"],[84,24,56,11],[84,25,56,4,"control"],[84,32,56,11],[85,6,57,4,"handleSubmit"],[85,18,57,16],[85,21,57,16,"_useForm"],[85,29,57,16],[85,30,57,4,"handleSubmit"],[85,42,57,16],[86,6,58,17,"errors"],[86,12,58,23],[86,15,58,23,"_useForm"],[86,23,58,23],[86,24,58,4,"formState"],[86,33,58,13],[86,34,58,17,"errors"],[86,40,58,23],[87,6,59,4,"watch"],[87,11,59,9],[87,14,59,9,"_useForm"],[87,22,59,9],[87,23,59,4,"watch"],[87,28,59,9],[88,6,60,4,"trigger"],[88,13,60,11],[88,16,60,11,"_useForm"],[88,24,60,11],[88,25,60,4,"trigger"],[88,32,60,11],[89,4,73,2],[89,8,73,8,"titleValue"],[89,18,73,18],[89,21,73,21,"watch"],[89,26,73,26],[89,27,73,27],[89,34,73,34],[89,35,73,35],[90,4,74,2],[90,8,74,8,"descValue"],[90,17,74,17],[90,20,74,20,"watch"],[90,25,74,25],[90,26,74,26],[90,39,74,39],[90,40,74,40],[90,44,74,44],[90,46,74,46],[91,4,75,2],[91,8,75,8,"locationValue"],[91,21,75,21],[91,24,75,24,"watch"],[91,29,75,29],[91,30,75,30],[91,40,75,40],[91,41,75,41],[93,4,77,2],[94,4,78,2],[94,8,78,2,"_useState"],[94,17,78,2],[94,20,78,36],[94,24,78,36,"useState"],[94,30,78,44],[94,31,78,44,"useState"],[94,39,78,44],[94,41,78,56],[94,50,78,65],[94,51,78,66],[95,6,78,66,"_useState2"],[95,16,78,66],[95,23,78,66,"_slicedToArray"],[95,37,78,66],[95,38,78,66,"default"],[95,45,78,66],[95,47,78,66,"_useState"],[95,56,78,66],[96,6,78,9,"eventType"],[96,15,78,18],[96,18,78,18,"_useState2"],[96,28,78,18],[97,6,78,20,"setEventType"],[97,18,78,32],[97,21,78,32,"_useState2"],[97,31,78,32],[98,4,79,2],[98,8,79,2,"_useState3"],[98,18,79,2],[98,21,79,38],[98,25,79,38,"useState"],[98,31,79,46],[98,32,79,46,"useState"],[98,40,79,46],[98,42,79,64],[98,48,79,70],[98,49,79,71],[99,6,79,71,"_useState4"],[99,16,79,71],[99,23,79,71,"_slicedToArray"],[99,37,79,71],[99,38,79,71,"default"],[99,45,79,71],[99,47,79,71,"_useState3"],[99,57,79,71],[100,6,79,9,"difficulty"],[100,16,79,19],[100,19,79,19,"_useState4"],[100,29,79,19],[101,6,79,21,"setDifficulty"],[101,19,79,34],[101,22,79,34,"_useState4"],[101,32,79,34],[102,4,80,2],[102,8,80,2,"_useState5"],[102,18,80,2],[102,21,80,20],[102,25,80,20,"useState"],[102,31,80,28],[102,32,80,28,"useState"],[102,40,80,28],[102,42,80,29,"params"],[102,48,80,35],[102,49,80,36,"address"],[102,56,80,43],[102,60,80,47],[102,62,80,49],[102,63,80,50],[103,6,80,50,"_useState6"],[103,16,80,50],[103,23,80,50,"_slicedToArray"],[103,37,80,50],[103,38,80,50,"default"],[103,45,80,50],[103,47,80,50,"_useState5"],[103,57,80,50],[104,6,80,9,"address"],[104,13,80,16],[104,16,80,16,"_useState6"],[104,26,80,16],[105,4,81,2],[105,8,81,2,"_useState7"],[105,18,81,2],[105,21,81,21],[105,25,81,21,"useState"],[105,31,81,29],[105,32,81,29,"useState"],[105,40,81,29],[105,42,81,30,"params"],[105,48,81,36],[105,49,81,37,"latitude"],[105,57,81,45],[105,60,81,48,"parseFloat"],[105,70,81,58],[105,71,81,59,"params"],[105,77,81,65],[105,78,81,66,"latitude"],[105,86,81,74],[105,87,81,75],[105,90,81,78],[105,91,81,79],[105,92,81,80],[106,6,81,80,"_useState8"],[106,16,81,80],[106,23,81,80,"_slicedToArray"],[106,37,81,80],[106,38,81,80,"default"],[106,45,81,80],[106,47,81,80,"_useState7"],[106,57,81,80],[107,6,81,9,"latitude"],[107,14,81,17],[107,17,81,17,"_useState8"],[107,27,81,17],[108,4,82,2],[108,8,82,2,"_useState9"],[108,18,82,2],[108,21,82,22],[108,25,82,22,"useState"],[108,31,82,30],[108,32,82,30,"useState"],[108,40,82,30],[108,42,82,31,"params"],[108,48,82,37],[108,49,82,38,"longitude"],[108,58,82,47],[108,61,82,50,"parseFloat"],[108,71,82,60],[108,72,82,61,"params"],[108,78,82,67],[108,79,82,68,"longitude"],[108,88,82,77],[108,89,82,78],[108,92,82,81],[108,93,82,82],[108,94,82,83],[109,6,82,83,"_useState0"],[109,16,82,83],[109,23,82,83,"_slicedToArray"],[109,37,82,83],[109,38,82,83,"default"],[109,45,82,83],[109,47,82,83,"_useState9"],[109,57,82,83],[110,6,82,9,"longitude"],[110,15,82,18],[110,18,82,18,"_useState0"],[110,28,82,18],[111,4,83,2],[111,8,83,2,"_useState1"],[111,18,83,2],[111,21,83,52],[111,25,83,52,"useState"],[111,31,83,60],[111,32,83,60,"useState"],[111,40,83,60],[111,42,83,74],[111,46,83,78,"Set"],[111,49,83,81],[111,50,83,82],[111,51,83,83],[111,59,83,91],[111,61,83,93],[111,73,83,105],[111,74,83,106],[111,75,83,107],[111,76,83,108],[112,6,83,108,"_useState10"],[112,17,83,108],[112,24,83,108,"_slicedToArray"],[112,38,83,108],[112,39,83,108,"default"],[112,46,83,108],[112,48,83,108,"_useState1"],[112,58,83,108],[113,6,83,9,"selectedEquipment"],[113,23,83,26],[113,26,83,26,"_useState10"],[113,37,83,26],[114,6,83,28,"setSelectedEquipment"],[114,26,83,48],[114,29,83,48,"_useState10"],[114,40,83,48],[115,4,84,2],[115,8,84,2,"_useState11"],[115,19,84,2],[115,22,84,38],[115,26,84,38,"useState"],[115,32,84,46],[115,33,84,46,"useState"],[115,41,84,46],[115,43,84,62],[115,47,84,66],[115,48,84,67],[116,6,84,67,"_useState12"],[116,17,84,67],[116,24,84,67,"_slicedToArray"],[116,38,84,67],[116,39,84,67,"default"],[116,46,84,67],[116,48,84,67,"_useState11"],[116,59,84,67],[117,6,84,9,"coverImage"],[117,16,84,19],[117,19,84,19,"_useState12"],[117,30,84,19],[118,6,84,21,"setCoverImage"],[118,19,84,34],[118,22,84,34,"_useState12"],[118,33,84,34],[119,4,86,2],[119,8,86,2,"_useState13"],[119,19,86,2],[119,22,86,36],[119,26,86,36,"useState"],[119,32,86,44],[119,33,86,44,"useState"],[119,41,86,44],[119,43,86,45],[119,49,86,51],[120,8,87,4],[120,12,87,10,"d"],[120,13,87,11],[120,16,87,14],[120,20,87,18,"Date"],[120,24,87,22],[120,25,87,23],[120,26,87,24],[121,8,88,4,"d"],[121,9,88,5],[121,10,88,6,"setDate"],[121,17,88,13],[121,18,88,14,"d"],[121,19,88,15],[121,20,88,16,"getDate"],[121,27,88,23],[121,28,88,24],[121,29,88,25],[121,32,88,28],[121,33,88,29],[121,34,88,30],[122,8,89,4,"d"],[122,9,89,5],[122,10,89,6,"setHours"],[122,18,89,14],[122,19,89,15],[122,20,89,16],[122,22,89,18],[122,23,89,19],[122,25,89,21],[122,26,89,22],[122,28,89,24],[122,29,89,25],[122,30,89,26],[123,8,90,4],[123,15,90,11,"d"],[123,16,90,12],[124,6,91,2],[124,7,91,3],[124,8,91,4],[125,6,91,4,"_useState14"],[125,17,91,4],[125,24,91,4,"_slicedToArray"],[125,38,91,4],[125,39,91,4,"default"],[125,46,91,4],[125,48,91,4,"_useState13"],[125,59,91,4],[126,6,86,9,"startDate"],[126,15,86,18],[126,18,86,18,"_useState14"],[126,29,86,18],[127,6,86,20,"setStartDate"],[127,18,86,32],[127,21,86,32,"_useState14"],[127,32,86,32],[128,4,92,2],[128,8,92,2,"_useState15"],[128,19,92,2],[128,22,92,32],[128,26,92,32,"useState"],[128,32,92,40],[128,33,92,40,"useState"],[128,41,92,40],[128,43,92,41],[128,49,92,47],[129,8,93,4],[129,12,93,10,"d"],[129,13,93,11],[129,16,93,14],[129,20,93,18,"Date"],[129,24,93,22],[129,25,93,23],[129,26,93,24],[130,8,94,4,"d"],[130,9,94,5],[130,10,94,6,"setDate"],[130,17,94,13],[130,18,94,14,"d"],[130,19,94,15],[130,20,94,16,"getDate"],[130,27,94,23],[130,28,94,24],[130,29,94,25],[130,32,94,28],[130,33,94,29],[130,34,94,30],[131,8,95,4,"d"],[131,9,95,5],[131,10,95,6,"setHours"],[131,18,95,14],[131,19,95,15],[131,21,95,17],[131,23,95,19],[131,24,95,20],[131,26,95,22],[131,27,95,23],[131,29,95,25],[131,30,95,26],[131,31,95,27],[132,8,96,4],[132,15,96,11,"d"],[132,16,96,12],[133,6,97,2],[133,7,97,3],[133,8,97,4],[134,6,97,4,"_useState16"],[134,17,97,4],[134,24,97,4,"_slicedToArray"],[134,38,97,4],[134,39,97,4,"default"],[134,46,97,4],[134,48,97,4,"_useState15"],[134,59,97,4],[135,6,92,9,"endDate"],[135,13,92,16],[135,16,92,16,"_useState16"],[135,27,92,16],[136,6,92,18,"setEndDate"],[136,16,92,28],[136,19,92,28,"_useState16"],[136,30,92,28],[137,4,99,2],[137,8,99,2,"_useState17"],[137,19,99,2],[137,22,99,38],[137,26,99,38,"useState"],[137,32,99,46],[137,33,99,46,"useState"],[137,41,99,46],[137,43,99,105],[137,47,99,109],[137,48,99,110],[138,6,99,110,"_useState18"],[138,17,99,110],[138,24,99,110,"_slicedToArray"],[138,38,99,110],[138,39,99,110,"default"],[138,46,99,110],[138,48,99,110,"_useState17"],[138,59,99,110],[139,6,99,9,"showPicker"],[139,16,99,19],[139,19,99,19,"_useState18"],[139,30,99,19],[140,6,99,21,"setShowPicker"],[140,19,99,34],[140,22,99,34,"_useState18"],[140,33,99,34],[141,4,100,2],[141,8,100,2,"_useState19"],[141,19,100,2],[141,22,100,38],[141,26,100,38,"useState"],[141,32,100,46],[141,33,100,46,"useState"],[141,41,100,46],[141,43,100,47],[141,44,100,48],[141,45,100,49],[142,6,100,49,"_useState20"],[142,17,100,49],[142,24,100,49,"_slicedToArray"],[142,38,100,49],[142,39,100,49,"default"],[142,46,100,49],[142,48,100,49,"_useState19"],[142,59,100,49],[143,6,100,9,"activeStep"],[143,16,100,19],[143,19,100,19,"_useState20"],[143,30,100,19],[144,6,100,21,"setActiveStep"],[144,19,100,34],[144,22,100,34,"_useState20"],[144,33,100,34],[146,4,102,2],[147,4,103,2],[147,8,103,8,"keyboardPadding"],[147,23,103,23],[147,26,103,26],[147,30,103,26,"useRef"],[147,36,103,32],[147,37,103,32,"useRef"],[147,43,103,32],[147,45,103,33],[147,49,103,37,"Animated"],[147,61,103,45],[147,62,103,45,"Animated"],[147,70,103,45],[147,71,103,46,"Value"],[147,76,103,51],[147,77,103,52],[147,78,103,53],[147,79,103,54],[147,80,103,55],[147,81,103,56,"current"],[147,88,103,63],[148,4,105,2],[148,8,105,2,"useEffect"],[148,14,105,11],[148,15,105,11,"useEffect"],[148,24,105,11],[148,26,105,12],[148,32,105,18],[149,6,106,4],[149,10,106,10,"showSub"],[149,17,106,17],[149,20,106,20,"Keyboard"],[149,32,106,28],[149,33,106,28,"Keyboard"],[149,41,106,28],[149,42,106,29,"addListener"],[149,53,106,40],[149,54,106,41,"Platform"],[149,66,106,49],[149,67,106,49,"Platform"],[149,75,106,49],[149,76,106,50,"OS"],[149,78,106,52],[149,83,106,57],[149,88,106,62],[149,91,106,65],[149,109,106,83],[149,112,106,86],[149,129,106,103],[149,131,106,106,"e"],[149,132,106,107],[149,136,107,6,"Animated"],[149,148,107,14],[149,149,107,14,"Animated"],[149,157,107,14],[149,158,107,15,"spring"],[149,164,107,21],[149,165,107,22,"keyboardPadding"],[149,180,107,37],[149,182,107,39],[150,8,107,41,"toValue"],[150,15,107,48],[150,17,107,50,"e"],[150,18,107,51],[150,19,107,52,"endCoordinates"],[150,33,107,66],[150,34,107,67,"height"],[150,40,107,73],[151,8,107,75,"useNativeDriver"],[151,23,107,90],[151,25,107,92],[152,6,107,98],[152,7,107,99],[152,8,107,100],[152,9,107,101,"start"],[152,14,107,106],[152,15,107,107],[152,16,108,4],[152,17,108,5],[153,6,109,4],[153,10,109,10,"hideSub"],[153,17,109,17],[153,20,109,20,"Keyboard"],[153,32,109,28],[153,33,109,28,"Keyboard"],[153,41,109,28],[153,42,109,29,"addListener"],[153,53,109,40],[153,54,109,41,"Platform"],[153,66,109,49],[153,67,109,49,"Platform"],[153,75,109,49],[153,76,109,50,"OS"],[153,78,109,52],[153,83,109,57],[153,88,109,62],[153,91,109,65],[153,109,109,83],[153,112,109,86],[153,129,109,103],[153,131,109,105],[153,137,110,6,"Animated"],[153,149,110,14],[153,150,110,14,"Animated"],[153,158,110,14],[153,159,110,15,"spring"],[153,165,110,21],[153,166,110,22,"keyboardPadding"],[153,181,110,37],[153,183,110,39],[154,8,110,41,"toValue"],[154,15,110,48],[154,17,110,50],[154,18,110,51],[155,8,110,53,"useNativeDriver"],[155,23,110,68],[155,25,110,70],[156,6,110,76],[156,7,110,77],[156,8,110,78],[156,9,110,79,"start"],[156,14,110,84],[156,15,110,85],[156,16,111,4],[156,17,111,5],[157,6,112,4],[157,13,112,11],[157,19,112,17],[158,8,113,6,"showSub"],[158,15,113,13],[158,16,113,14,"remove"],[158,22,113,20],[158,23,113,21],[158,24,113,22],[159,8,114,6,"hideSub"],[159,15,114,13],[159,16,114,14,"remove"],[159,22,114,20],[159,23,114,21],[159,24,114,22],[160,6,115,4],[160,7,115,5],[161,4,116,2],[161,5,116,3],[161,7,116,5],[161,8,116,6,"keyboardPadding"],[161,23,116,21],[161,24,116,22],[161,25,116,23],[163,4,118,2],[164,4,119,2],[164,8,119,8,"toggleEquipment"],[164,23,119,23],[164,26,119,26],[164,30,119,26,"useCallback"],[164,36,119,37],[164,37,119,37,"useCallback"],[164,48,119,37],[164,50,119,39,"item"],[164,54,119,51],[164,58,119,56],[165,6,120,4,"setSelectedEquipment"],[165,26,120,24],[165,27,120,26,"prev"],[165,31,120,30],[165,35,120,35],[166,8,121,6],[166,12,121,12,"n"],[166,13,121,13],[166,16,121,16],[166,20,121,20,"Set"],[166,23,121,23],[166,24,121,24,"prev"],[166,28,121,28],[166,29,121,29],[167,8,122,6],[167,12,122,10,"n"],[167,13,122,11],[167,14,122,12,"has"],[167,17,122,15],[167,18,122,16,"item"],[167,22,122,20],[167,23,122,21],[167,25,122,23,"n"],[167,26,122,24],[167,27,122,25,"delete"],[167,33,122,31],[167,34,122,32,"item"],[167,38,122,36],[167,39,122,37],[167,40,122,38],[167,45,123,11,"n"],[167,46,123,12],[167,47,123,13,"add"],[167,50,123,16],[167,51,123,17,"item"],[167,55,123,21],[167,56,123,22],[168,8,124,6],[168,15,124,13,"n"],[168,16,124,14],[169,6,125,4],[169,7,125,5],[169,8,125,6],[170,4,126,2],[170,5,126,3],[170,7,126,5],[170,9,126,7],[170,10,126,8],[171,4,128,2],[171,8,128,8,"pickCoverImage"],[171,22,128,22],[172,6,128,22],[172,10,128,22,"_ref"],[172,14,128,22],[172,21,128,22,"_asyncToGenerator"],[172,38,128,22],[172,39,128,22,"default"],[172,46,128,22],[172,48,128,25],[172,61,128,37],[173,8,129,4],[173,12,129,4,"_yield$ImagePicker$re"],[173,33,129,4],[173,42,129,29,"ImagePicker"],[173,53,129,40],[173,54,129,41,"requestMediaLibraryPermissionsAsync"],[173,89,129,76],[173,90,129,77],[173,91,129,78],[174,10,129,12,"status"],[174,16,129,18],[174,19,129,18,"_yield$ImagePicker$re"],[174,40,129,18],[174,41,129,12,"status"],[174,47,129,18],[175,8,130,4],[175,12,130,8,"status"],[175,18,130,14],[175,23,130,19],[175,32,130,28],[175,34,130,30],[176,10,131,6,"Alert"],[176,22,131,11],[176,23,131,11,"Alert"],[176,28,131,11],[176,29,131,12,"alert"],[176,34,131,17],[176,35,131,18,"t"],[176,36,131,19],[176,37,131,20],[176,51,131,34],[176,52,131,35],[176,54,131,37],[176,92,131,75],[176,93,131,76],[177,10,132,6],[178,8,133,4],[179,8,134,4],[179,12,134,10,"result"],[179,18,134,16],[179,27,134,25,"ImagePicker"],[179,38,134,36],[179,39,134,37,"launchImageLibraryAsync"],[179,62,134,60],[179,63,134,61],[180,10,135,6,"mediaTypes"],[180,20,135,16],[180,22,135,18],[180,23,135,19],[180,31,135,27],[180,32,135,28],[181,10,136,6,"allowsEditing"],[181,23,136,19],[181,25,136,21],[181,29,136,25],[182,10,137,6,"aspect"],[182,16,137,12],[182,18,137,14],[182,19,137,15],[182,21,137,17],[182,23,137,19],[182,24,137,20],[182,25,137,21],[183,10,138,6,"quality"],[183,17,138,13],[183,19,138,15],[184,8,139,4],[184,9,139,5],[184,10,139,6],[185,8,140,4],[185,12,140,8],[185,13,140,9,"result"],[185,19,140,15],[185,20,140,16,"canceled"],[185,28,140,24],[185,32,140,28,"result"],[185,38,140,34],[185,39,140,35,"assets"],[185,45,140,41],[185,46,140,42,"length"],[185,52,140,48],[185,55,140,51],[185,56,140,52],[185,58,140,54,"setCoverImage"],[185,71,140,67],[185,72,140,68,"result"],[185,78,140,74],[185,79,140,75,"assets"],[185,85,140,81],[185,86,140,82],[185,87,140,83],[185,88,140,84],[185,89,140,85,"uri"],[185,92,140,88],[185,93,140,89],[186,6,141,2],[186,7,141,3],[187,6,141,3],[187,22,128,8,"pickCoverImage"],[187,36,128,22,"pickCoverImage"],[187,37,128,22],[188,8,128,22],[188,15,128,22,"_ref"],[188,19,128,22],[188,20,128,22,"apply"],[188,25,128,22],[188,32,128,22,"arguments"],[188,41,128,22],[189,6,128,22],[190,4,128,22],[190,7,141,3],[191,4,143,2],[191,8,143,8,"goNext"],[191,14,143,14],[192,6,143,14],[192,10,143,14,"_ref2"],[192,15,143,14],[192,22,143,14,"_asyncToGenerator"],[192,39,143,14],[192,40,143,14,"default"],[192,47,143,14],[192,49,143,17],[192,62,143,29],[193,8,144,4],[193,12,144,8,"activeStep"],[193,22,144,18],[193,27,144,23],[193,28,144,24],[193,30,144,26],[194,10,145,6],[194,14,145,12,"valid"],[194,19,145,17],[194,28,145,26,"trigger"],[194,35,145,33],[194,36,145,34],[194,37,145,35],[194,44,145,42],[194,46,145,44],[194,56,145,54],[194,57,145,55],[194,58,145,56],[195,10,146,6],[195,14,146,10],[195,15,146,11,"valid"],[195,20,146,16],[195,22,146,18],[196,8,147,4],[197,8,148,4,"setActiveStep"],[197,21,148,17],[197,22,148,19,"s"],[197,23,148,20],[197,27,148,25,"Math"],[197,31,148,29],[197,32,148,30,"min"],[197,35,148,33],[197,36,148,34,"s"],[197,37,148,35],[197,40,148,38],[197,41,148,39],[197,43,148,41,"STEPS"],[197,54,148,46],[197,55,148,46,"STEPS"],[197,60,148,46],[197,61,148,47,"length"],[197,67,148,53],[197,70,148,56],[197,71,148,57],[197,72,148,58],[197,73,148,59],[198,8,149,4,"scrollRef"],[198,17,149,13],[198,18,149,14,"current"],[198,25,149,21],[198,27,149,23,"scrollTo"],[198,35,149,31],[198,36,149,32],[199,10,149,34,"y"],[199,11,149,35],[199,13,149,37],[199,14,149,38],[200,10,149,40,"animated"],[200,18,149,48],[200,20,149,50],[201,8,149,55],[201,9,149,56],[201,10,149,57],[202,6,150,2],[202,7,150,3],[203,6,150,3],[203,22,143,8,"goNext"],[203,28,143,14,"goNext"],[203,29,143,14],[204,8,143,14],[204,15,143,14,"_ref2"],[204,20,143,14],[204,21,143,14,"apply"],[204,26,143,14],[204,33,143,14,"arguments"],[204,42,143,14],[205,6,143,14],[206,4,143,14],[206,7,150,3],[207,4,152,2],[207,8,152,8,"onSubmit"],[207,16,152,16],[208,6,152,16],[208,10,152,16,"_ref3"],[208,15,152,16],[208,22,152,16,"_asyncToGenerator"],[208,39,152,16],[208,40,152,16,"default"],[208,47,152,16],[208,49,152,19],[208,60,152,26,"data"],[208,64,152,47],[208,66,152,52],[209,8,153,4],[209,12,153,8],[209,13,153,9,"user"],[209,17,153,13],[209,19,153,15,"id"],[209,21,153,17],[209,23,153,19],[210,10,154,6,"Alert"],[210,22,154,11],[210,23,154,11,"Alert"],[210,28,154,11],[210,29,154,12,"alert"],[210,34,154,17],[210,35,154,18,"t"],[210,36,154,19],[210,37,154,20],[210,51,154,34],[210,52,154,35],[210,54,154,37,"t"],[210,55,154,38],[210,56,154,39],[210,83,154,66],[210,84,154,67],[210,85,154,68],[211,10,155,6],[212,8,156,4],[213,8,157,4],[213,12,157,8,"endDate"],[213,19,157,15],[213,23,157,19,"startDate"],[213,32,157,28],[213,34,157,30],[214,10,158,6,"Alert"],[214,22,158,11],[214,23,158,11,"Alert"],[214,28,158,11],[214,29,158,12,"alert"],[214,34,158,17],[214,35,158,18,"t"],[214,36,158,19],[214,37,158,20],[214,51,158,34],[214,52,158,35],[214,54,158,37,"t"],[214,55,158,38],[214,56,158,39],[214,98,158,81],[214,99,158,82],[214,100,158,83],[215,10,159,6],[216,8,160,4],[217,8,162,4],[217,12,162,8],[218,10,163,6],[218,14,163,12,"event"],[218,19,163,17],[218,28,163,26,"createEvent"],[218,39,163,37],[218,40,163,38,"mutateAsync"],[218,51,163,49],[218,52,163,50],[219,12,164,8,"organizer_id"],[219,24,164,20],[219,26,164,22,"user"],[219,30,164,26],[219,31,164,27,"id"],[219,33,164,29],[220,12,165,8,"title"],[220,17,165,13],[220,19,165,15,"data"],[220,23,165,19],[220,24,165,20,"title"],[220,29,165,25],[220,30,165,26,"trim"],[220,34,165,30],[220,35,165,31],[220,36,165,32],[221,12,166,8,"description"],[221,23,166,19],[221,25,166,21,"data"],[221,29,166,25],[221,30,166,26,"description"],[221,41,166,37],[221,43,166,39,"trim"],[221,47,166,43],[221,48,166,44],[221,49,166,45],[221,53,166,49,"undefined"],[221,62,166,58],[222,12,167,8,"type"],[222,16,167,12],[222,18,167,14,"eventType"],[222,27,167,23],[223,12,168,8,"start_date"],[223,22,168,18],[223,24,168,20,"startDate"],[223,33,168,29],[223,34,168,30,"toISOString"],[223,45,168,41],[223,46,168,42],[223,47,168,43],[224,12,169,8,"end_date"],[224,20,169,16],[224,22,169,18,"endDate"],[224,29,169,25],[224,30,169,26,"toISOString"],[224,41,169,37],[224,42,169,38],[224,43,169,39],[225,12,170,8,"latitude"],[225,20,170,16],[226,12,171,8,"longitude"],[226,21,171,17],[227,12,172,8,"location"],[227,20,172,16],[227,22,172,18,"data"],[227,26,172,22],[227,27,172,23,"location"],[227,35,172,31],[227,36,172,32,"trim"],[227,40,172,36],[227,41,172,37],[227,42,172,38],[228,12,173,8,"address"],[228,19,173,15],[228,21,173,17,"address"],[228,28,173,24],[228,29,173,25,"trim"],[228,33,173,29],[228,34,173,30],[228,35,173,31],[228,39,173,35,"undefined"],[228,48,173,44],[229,12,174,8,"max_paticipants"],[229,27,174,23],[229,29,174,25,"data"],[229,33,174,29],[229,34,174,30,"maxParticipants"],[229,49,174,45],[229,53,174,49,"undefined"],[229,62,174,58],[230,12,175,8,"equipment"],[230,21,175,17],[230,23,175,19,"Array"],[230,28,175,24],[230,29,175,25,"from"],[230,33,175,29],[230,34,175,30,"selectedEquipment"],[230,51,175,47],[230,52,175,48],[230,53,175,49,"join"],[230,57,175,53],[230,58,175,54],[230,61,175,57],[230,62,175,58],[230,66,175,62,"undefined"],[230,75,175,71],[231,12,176,8,"difficulty"],[231,22,176,18],[232,12,177,8,"eco_point_reward"],[232,28,177,24],[232,30,177,26,"data"],[232,34,177,30],[232,35,177,31,"ecoPointReward"],[232,49,177,45],[232,53,177,49],[232,54,177,50],[233,12,178,8,"cover_image_url"],[233,27,178,23],[233,29,178,25,"coverImage"],[233,39,178,35],[233,43,178,39,"undefined"],[233,52,178,48],[234,12,179,8,"status"],[234,18,179,14],[234,20,179,16],[235,10,180,6],[235,11,180,7],[235,12,180,8],[236,10,181,6,"router"],[236,16,181,12],[236,17,181,13,"replace"],[236,24,181,20],[236,25,181,21],[236,36,181,32,"event"],[236,41,181,37],[236,42,181,38,"id"],[236,44,181,40],[236,46,181,42],[236,47,181,43],[237,8,182,4],[237,9,182,5],[237,10,182,6],[237,17,182,13,"error"],[237,22,182,23],[237,24,182,25],[238,10,183,6,"Alert"],[238,22,183,11],[238,23,183,11,"Alert"],[238,28,183,11],[238,29,183,12,"alert"],[238,34,183,17],[238,35,183,18,"t"],[238,36,183,19],[238,37,183,20],[238,51,183,34],[238,52,183,35],[238,54,183,37,"error"],[238,59,183,42],[238,61,183,44,"response"],[238,69,183,52],[238,71,183,54,"data"],[238,75,183,58],[238,77,183,60,"detail"],[238,83,183,66],[238,87,183,70,"t"],[238,88,183,71],[238,89,183,72],[238,114,183,97],[238,115,183,98],[238,116,183,99],[239,8,184,4],[240,6,185,2],[240,7,185,3],[241,6,185,3],[241,22,152,8,"onSubmit"],[241,30,152,16,"onSubmit"],[241,31,152,16,"_x"],[241,33,152,16],[242,8,152,16],[242,15,152,16,"_ref3"],[242,20,152,16],[242,21,152,16,"apply"],[242,26,152,16],[242,33,152,16,"arguments"],[242,42,152,16],[243,6,152,16],[244,4,152,16],[244,7,185,3],[245,4,187,2],[245,8,187,8,"onDatePickerChange"],[245,26,187,26],[245,29,187,30,"type"],[245,33,187,42],[245,37,187,47],[245,38,187,48,"_"],[245,39,187,70],[245,41,187,72,"date"],[245,45,187,83],[245,50,187,88],[246,6,188,4,"setShowPicker"],[246,19,188,17],[246,20,188,18],[246,24,188,22],[246,25,188,23],[247,6,189,4],[247,10,189,8],[247,11,189,9,"date"],[247,15,189,13],[247,17,189,15],[248,6,190,4],[248,10,190,8,"type"],[248,14,190,12],[248,19,190,17],[248,30,190,28],[248,32,190,30],[249,8,191,6],[249,12,191,12,"u"],[249,13,191,13],[249,16,191,16],[249,20,191,20,"Date"],[249,24,191,24],[249,25,191,25,"startDate"],[249,34,191,34],[249,35,191,35],[250,8,192,6,"u"],[250,9,192,7],[250,10,192,8,"setFullYear"],[250,21,192,19],[250,22,192,20,"date"],[250,26,192,24],[250,27,192,25,"getFullYear"],[250,38,192,36],[250,39,192,37],[250,40,192,38],[250,42,192,40,"date"],[250,46,192,44],[250,47,192,45,"getMonth"],[250,55,192,53],[250,56,192,54],[250,57,192,55],[250,59,192,57,"date"],[250,63,192,61],[250,64,192,62,"getDate"],[250,71,192,69],[250,72,192,70],[250,73,192,71],[250,74,192,72],[251,8,193,6,"setStartDate"],[251,20,193,18],[251,21,193,19,"u"],[251,22,193,20],[251,23,193,21],[252,8,194,6],[252,12,194,10,"u"],[252,13,194,11],[252,17,194,15,"endDate"],[252,24,194,22],[252,26,194,24],[253,10,195,8],[253,14,195,14,"e"],[253,15,195,15],[253,18,195,18],[253,22,195,22,"Date"],[253,26,195,26],[253,27,195,27,"u"],[253,28,195,28],[253,29,195,29],[254,10,196,8,"e"],[254,11,196,9],[254,12,196,10,"setHours"],[254,20,196,18],[254,21,196,19,"u"],[254,22,196,20],[254,23,196,21,"getHours"],[254,31,196,29],[254,32,196,30],[254,33,196,31],[254,36,196,34],[254,37,196,35],[254,38,196,36],[255,10,197,8,"setEndDate"],[255,20,197,18],[255,21,197,19,"e"],[255,22,197,20],[255,23,197,21],[256,8,198,6],[257,6,199,4],[257,7,199,5],[257,13,199,11],[257,17,199,15,"type"],[257,21,199,19],[257,26,199,24],[257,37,199,35],[257,39,199,37],[258,8,200,6],[258,12,200,12,"u"],[258,14,200,13],[258,17,200,16],[258,21,200,20,"Date"],[258,25,200,24],[258,26,200,25,"startDate"],[258,35,200,34],[258,36,200,35],[259,8,201,6,"u"],[259,10,201,7],[259,11,201,8,"setHours"],[259,19,201,16],[259,20,201,17,"date"],[259,24,201,21],[259,25,201,22,"getHours"],[259,33,201,30],[259,34,201,31],[259,35,201,32],[259,37,201,34,"date"],[259,41,201,38],[259,42,201,39,"getMinutes"],[259,52,201,49],[259,53,201,50],[259,54,201,51],[259,55,201,52],[260,8,202,6,"setStartDate"],[260,20,202,18],[260,21,202,19,"u"],[260,23,202,20],[260,24,202,21],[261,6,203,4],[261,7,203,5],[261,13,203,11],[261,17,203,15,"type"],[261,21,203,19],[261,26,203,24],[261,35,203,33],[261,37,203,35],[262,8,204,6],[262,12,204,12,"u"],[262,15,204,13],[262,18,204,16],[262,22,204,20,"Date"],[262,26,204,24],[262,27,204,25,"endDate"],[262,34,204,32],[262,35,204,33],[263,8,205,6,"u"],[263,11,205,7],[263,12,205,8,"setFullYear"],[263,23,205,19],[263,24,205,20,"date"],[263,28,205,24],[263,29,205,25,"getFullYear"],[263,40,205,36],[263,41,205,37],[263,42,205,38],[263,44,205,40,"date"],[263,48,205,44],[263,49,205,45,"getMonth"],[263,57,205,53],[263,58,205,54],[263,59,205,55],[263,61,205,57,"date"],[263,65,205,61],[263,66,205,62,"getDate"],[263,73,205,69],[263,74,205,70],[263,75,205,71],[263,76,205,72],[264,8,206,6,"setEndDate"],[264,18,206,16],[264,19,206,17,"u"],[264,22,206,18],[264,23,206,19],[265,6,207,4],[265,7,207,5],[265,13,207,11],[266,8,208,6],[266,12,208,12,"u"],[266,15,208,13],[266,18,208,16],[266,22,208,20,"Date"],[266,26,208,24],[266,27,208,25,"endDate"],[266,34,208,32],[266,35,208,33],[267,8,209,6,"u"],[267,11,209,7],[267,12,209,8,"setHours"],[267,20,209,16],[267,21,209,17,"date"],[267,25,209,21],[267,26,209,22,"getHours"],[267,34,209,30],[267,35,209,31],[267,36,209,32],[267,38,209,34,"date"],[267,42,209,38],[267,43,209,39,"getMinutes"],[267,53,209,49],[267,54,209,50],[267,55,209,51],[267,56,209,52],[268,8,210,6,"setEndDate"],[268,18,210,16],[268,19,210,17,"u"],[268,22,210,18],[268,23,210,19],[269,6,211,4],[270,4,212,2],[270,5,212,3],[271,4,214,2],[271,8,214,8,"durationHrs"],[271,19,214,19],[271,22,214,22,"Math"],[271,26,214,26],[271,27,214,27,"max"],[271,30,214,30],[271,31,214,31],[271,32,214,32],[271,34,214,34,"Math"],[271,38,214,38],[271,39,214,39,"round"],[271,44,214,44],[271,45,214,45],[271,46,214,46,"endDate"],[271,53,214,53],[271,54,214,54,"getTime"],[271,61,214,61],[271,62,214,62],[271,63,214,63],[271,66,214,66,"startDate"],[271,75,214,75],[271,76,214,76,"getTime"],[271,83,214,83],[271,84,214,84],[271,85,214,85],[271,89,214,89],[271,96,214,96],[271,97,214,97],[271,98,214,98],[272,4,215,2],[272,8,215,8,"durationMins"],[272,20,215,20],[272,23,215,23,"Math"],[272,27,215,27],[272,28,215,28,"max"],[272,31,215,31],[272,32,215,32],[272,33,215,33],[272,35,215,35,"Math"],[272,39,215,39],[272,40,215,40,"round"],[272,45,215,45],[272,46,215,47],[272,47,215,48,"endDate"],[272,54,215,55],[272,55,215,56,"getTime"],[272,62,215,63],[272,63,215,64],[272,64,215,65],[272,67,215,68,"startDate"],[272,76,215,77],[272,77,215,78,"getTime"],[272,84,215,85],[272,85,215,86],[272,86,215,87],[272,90,215,91],[272,97,215,98],[272,100,215,102],[272,105,215,107],[272,106,215,108],[272,107,215,109],[273,4,217,2],[273,24,218,4],[273,28,218,4,"_reactJsxDevRuntime"],[273,47,218,4],[273,48,218,4,"jsxDEV"],[273,54,218,4],[273,56,218,5,"_reactNative"],[273,68,218,9],[273,69,218,9,"View"],[273,73,218,9],[274,6,218,10,"style"],[274,11,218,15],[274,13,218,17,"s"],[274,14,218,18],[274,15,218,19,"root"],[274,19,218,24],[275,6,218,24,"children"],[275,14,218,24],[275,30,219,6],[275,34,219,6,"_reactJsxDevRuntime"],[275,53,219,6],[275,54,219,6,"jsxDEV"],[275,60,219,6],[275,62,219,7,"_expoStatusBar"],[275,76,219,16],[275,77,219,16,"StatusBar"],[275,86,219,16],[276,8,219,17,"style"],[276,13,219,22],[276,15,219,23],[277,6,219,29],[278,8,219,29,"fileName"],[278,16,219,29],[278,18,219,29,"_jsxFileName"],[278,30,219,29],[279,8,219,29,"lineNumber"],[279,18,219,29],[280,8,219,29,"columnNumber"],[280,20,219,29],[281,6,219,29],[281,13,219,31],[281,14,219,32],[281,29,222,6],[281,33,222,6,"_reactJsxDevRuntime"],[281,52,222,6],[281,53,222,6,"jsxDEV"],[281,59,222,6],[281,61,222,7,"_reactNativeSafeAreaContext"],[281,88,222,19],[281,89,222,19,"SafeAreaView"],[281,101,222,19],[282,8,222,20,"edges"],[282,13,222,25],[282,15,222,27],[282,16,222,28],[282,21,222,33],[282,22,222,35],[283,8,222,36,"style"],[283,13,222,41],[283,15,222,43,"s"],[283,16,222,44],[283,17,222,45,"headerArea"],[283,27,222,56],[284,8,222,56,"children"],[284,16,222,56],[284,32,223,8],[284,36,223,8,"_reactJsxDevRuntime"],[284,55,223,8],[284,56,223,8,"jsxDEV"],[284,62,223,8],[284,64,223,9,"_reactNative"],[284,76,223,13],[284,77,223,13,"View"],[284,81,223,13],[285,10,223,14,"style"],[285,15,223,19],[285,17,223,21,"s"],[285,18,223,22],[285,19,223,23,"header"],[285,25,223,30],[286,10,223,30,"children"],[286,18,223,30],[286,34,224,10],[286,38,224,10,"_reactJsxDevRuntime"],[286,57,224,10],[286,58,224,10,"jsxDEV"],[286,64,224,10],[286,66,224,11,"_reactNative"],[286,78,224,27],[286,79,224,27,"TouchableOpacity"],[286,95,224,27],[287,12,224,28,"style"],[287,17,224,33],[287,19,224,35,"s"],[287,20,224,36],[287,21,224,37,"headerBtn"],[287,30,224,47],[288,12,224,48,"onPress"],[288,19,224,55],[288,21,224,57,"onPress"],[288,22,224,57],[288,27,224,63,"router"],[288,33,224,69],[288,34,224,70,"back"],[288,38,224,74],[288,39,224,75],[288,40,224,77],[289,12,224,78,"activeOpacity"],[289,25,224,91],[289,27,224,93],[289,30,224,97],[290,12,224,97,"children"],[290,20,224,97],[290,35,225,12],[290,39,225,12,"_reactJsxDevRuntime"],[290,58,225,12],[290,59,225,12,"jsxDEV"],[290,65,225,12],[290,67,225,13,"_expoVectorIcons"],[290,83,225,21],[290,84,225,21,"Ionicons"],[290,92,225,21],[291,14,225,22,"name"],[291,18,225,26],[291,20,225,27],[291,27,225,34],[292,14,225,35,"size"],[292,18,225,39],[292,20,225,41],[292,22,225,44],[293,14,225,45,"color"],[293,19,225,50],[293,21,225,52,"Colors"],[293,32,225,58],[293,33,225,58,"Colors"],[293,39,225,58],[293,40,225,59,"textPrimary"],[294,12,225,71],[295,14,225,71,"fileName"],[295,22,225,71],[295,24,225,71,"_jsxFileName"],[295,36,225,71],[296,14,225,71,"lineNumber"],[296,24,225,71],[297,14,225,71,"columnNumber"],[297,26,225,71],[298,12,225,71],[298,19,225,73],[299,10,225,74],[300,12,225,74,"fileName"],[300,20,225,74],[300,22,225,74,"_jsxFileName"],[300,34,225,74],[301,12,225,74,"lineNumber"],[301,22,225,74],[302,12,225,74,"columnNumber"],[302,24,225,74],[303,10,225,74],[303,17,226,28],[303,18,226,29],[303,33,227,10],[303,37,227,10,"_reactJsxDevRuntime"],[303,56,227,10],[303,57,227,10,"jsxDEV"],[303,63,227,10],[303,65,227,11,"_reactNative"],[303,77,227,15],[303,78,227,15,"Text"],[303,82,227,15],[304,12,227,16,"style"],[304,17,227,21],[304,19,227,23,"s"],[304,20,227,24],[304,21,227,25,"headerTitle"],[304,32,227,37],[305,12,227,37,"children"],[305,20,227,37],[305,22,227,39,"t"],[305,23,227,40],[305,24,227,41],[305,43,227,60],[306,10,227,61],[307,12,227,61,"fileName"],[307,20,227,61],[307,22,227,61,"_jsxFileName"],[307,34,227,61],[308,12,227,61,"lineNumber"],[308,22,227,61],[309,12,227,61,"columnNumber"],[309,24,227,61],[310,10,227,61],[310,17,227,68],[310,18,227,69],[311,8,227,69],[312,10,227,69,"fileName"],[312,18,227,69],[312,20,227,69,"_jsxFileName"],[312,32,227,69],[313,10,227,69,"lineNumber"],[313,20,227,69],[314,10,227,69,"columnNumber"],[314,22,227,69],[315,8,227,69],[315,15,228,14],[315,16,228,15],[315,31,231,8],[315,35,231,8,"_reactJsxDevRuntime"],[315,54,231,8],[315,55,231,8,"jsxDEV"],[315,61,231,8],[315,63,231,9,"_reactNative"],[315,75,231,13],[315,76,231,13,"View"],[315,80,231,13],[316,10,231,14,"style"],[316,15,231,19],[316,17,231,21,"s"],[316,18,231,22],[316,19,231,23,"stepper"],[316,26,231,31],[317,10,231,31,"children"],[317,18,231,31],[317,20,232,11,"STEPS"],[317,31,232,16],[317,32,232,16,"STEPS"],[317,37,232,16],[317,38,232,17,"map"],[317,41,232,20],[317,42,232,21],[317,43,232,22,"step"],[317,47,232,26],[317,49,232,28,"idx"],[317,52,232,31],[317,57,232,36],[318,12,233,12],[318,16,233,18,"done"],[318,20,233,22],[318,23,233,25,"idx"],[318,26,233,28],[318,29,233,31,"activeStep"],[318,39,233,41],[319,12,234,12],[319,16,234,18,"active"],[319,22,234,24],[319,25,234,27,"idx"],[319,28,234,30],[319,33,234,35,"activeStep"],[319,43,234,45],[320,12,235,12],[320,32,236,14],[320,36,236,14,"_reactJsxDevRuntime"],[320,55,236,14],[320,56,236,14,"jsxDEV"],[320,62,236,14],[320,64,236,15,"React"],[320,69,236,20],[320,70,236,20,"default"],[320,77,236,20],[320,78,236,21,"Fragment"],[320,86,236,29],[321,14,236,29,"children"],[321,22,236,29],[321,38,237,16],[321,42,237,16,"_reactJsxDevRuntime"],[321,61,237,16],[321,62,237,16,"jsxDEV"],[321,68,237,16],[321,70,237,17,"_reactNative"],[321,82,237,33],[321,83,237,33,"TouchableOpacity"],[321,99,237,33],[322,16,238,18,"style"],[322,21,238,23],[322,23,238,25,"s"],[322,24,238,26],[322,25,238,27,"stepTouch"],[322,34,238,37],[323,16,239,18,"onPress"],[323,23,239,25],[323,25,239,27,"onPress"],[323,26,239,27],[323,31,239,33,"idx"],[323,34,239,36],[323,37,239,39,"activeStep"],[323,47,239,49],[323,51,239,53,"setActiveStep"],[323,64,239,66],[323,65,239,67,"idx"],[323,68,239,70],[323,69,239,72],[324,16,240,18,"activeOpacity"],[324,29,240,31],[324,31,240,33],[324,34,240,37],[325,16,240,37,"children"],[325,24,240,37],[325,40,242,18],[325,44,242,18,"_reactJsxDevRuntime"],[325,63,242,18],[325,64,242,18,"jsxDEV"],[325,70,242,18],[325,72,242,19,"_reactNative"],[325,84,242,23],[325,85,242,23,"View"],[325,89,242,23],[326,18,242,24,"style"],[326,23,242,29],[326,25,242,31],[326,26,242,32,"s"],[326,27,242,33],[326,28,242,34,"stepCircle"],[326,38,242,44],[326,40,242,46,"active"],[326,46,242,52],[326,50,242,56,"s"],[326,51,242,57],[326,52,242,58,"stepCircleActive"],[326,68,242,74],[326,70,242,76,"done"],[326,74,242,80],[326,78,242,84,"s"],[326,79,242,85],[326,80,242,86,"stepCircleDone"],[326,94,242,100],[326,95,242,102],[327,18,242,102,"children"],[327,26,242,102],[327,28,243,21,"done"],[327,32,243,25],[327,48,244,22],[327,52,244,22,"_reactJsxDevRuntime"],[327,71,244,22],[327,72,244,22,"jsxDEV"],[327,78,244,22],[327,80,244,23,"_expoVectorIcons"],[327,96,244,31],[327,97,244,31,"Ionicons"],[327,105,244,31],[328,20,244,32,"name"],[328,24,244,36],[328,26,244,37],[328,37,244,48],[329,20,244,49,"size"],[329,24,244,53],[329,26,244,55],[329,28,244,58],[330,20,244,59,"color"],[330,25,244,64],[330,27,244,66,"Colors"],[330,38,244,72],[330,39,244,72,"Colors"],[330,45,244,72],[330,46,244,73,"white"],[331,18,244,79],[332,20,244,79,"fileName"],[332,28,244,79],[332,30,244,79,"_jsxFileName"],[332,42,244,79],[333,20,244,79,"lineNumber"],[333,30,244,79],[334,20,244,79,"columnNumber"],[334,32,244,79],[335,18,244,79],[335,25,244,81],[335,26,244,82],[335,42,246,22],[335,46,246,22,"_reactJsxDevRuntime"],[335,65,246,22],[335,66,246,22,"jsxDEV"],[335,72,246,22],[335,74,246,23,"_expoVectorIcons"],[335,90,246,31],[335,91,246,31,"Ionicons"],[335,99,246,31],[336,20,246,32,"name"],[336,24,246,36],[336,26,246,38,"step"],[336,30,246,42],[336,31,246,43,"icon"],[336,35,246,48],[337,20,246,49,"size"],[337,24,246,53],[337,26,246,55],[337,28,246,58],[338,20,246,59,"color"],[338,25,246,64],[338,27,246,66,"active"],[338,33,246,72],[338,36,246,75,"Colors"],[338,47,246,81],[338,48,246,81,"Colors"],[338,54,246,81],[338,55,246,82,"white"],[338,60,246,87],[338,63,246,90],[339,18,246,100],[340,20,246,100,"fileName"],[340,28,246,100],[340,30,246,100,"_jsxFileName"],[340,42,246,100],[341,20,246,100,"lineNumber"],[341,30,246,100],[342,20,246,100,"columnNumber"],[342,32,246,100],[343,18,246,100],[343,25,246,102],[344,16,247,21],[345,18,247,21,"fileName"],[345,26,247,21],[345,28,247,21,"_jsxFileName"],[345,40,247,21],[346,18,247,21,"lineNumber"],[346,28,247,21],[347,18,247,21,"columnNumber"],[347,30,247,21],[348,16,247,21],[348,23,248,24],[348,24,248,25],[348,39,249,18],[348,43,249,18,"_reactJsxDevRuntime"],[348,62,249,18],[348,63,249,18,"jsxDEV"],[348,69,249,18],[348,71,249,19,"_reactNative"],[348,83,249,23],[348,84,249,23,"Text"],[348,88,249,23],[349,18,249,24,"style"],[349,23,249,29],[349,25,249,31],[349,26,249,32,"s"],[349,27,249,33],[349,28,249,34,"stepText"],[349,36,249,42],[349,38,249,44,"active"],[349,44,249,50],[349,48,249,54,"s"],[349,49,249,55],[349,50,249,56,"stepTextActive"],[349,64,249,70],[349,66,249,72,"done"],[349,70,249,76],[349,74,249,80,"s"],[349,75,249,81],[349,76,249,82,"stepTextDone"],[349,88,249,94],[349,89,249,96],[350,18,249,96,"children"],[350,26,249,96],[350,28,250,21,"t"],[350,29,250,22],[350,30,250,23,"step"],[350,34,250,27],[350,35,250,28,"labelKey"],[350,43,250,43],[351,16,250,44],[352,18,250,44,"fileName"],[352,26,250,44],[352,28,250,44,"_jsxFileName"],[352,40,250,44],[353,18,250,44,"lineNumber"],[353,28,250,44],[354,18,250,44,"columnNumber"],[354,30,250,44],[355,16,250,44],[355,23,251,24],[355,24,251,25],[356,14,251,25],[357,16,251,25,"fileName"],[357,24,251,25],[357,26,251,25,"_jsxFileName"],[357,38,251,25],[358,16,251,25,"lineNumber"],[358,26,251,25],[359,16,251,25,"columnNumber"],[359,28,251,25],[360,14,251,25],[360,21,252,34],[360,22,252,35],[360,24,253,17,"idx"],[360,27,253,20],[360,30,253,23,"STEPS"],[360,41,253,28],[360,42,253,28,"STEPS"],[360,47,253,28],[360,48,253,29,"length"],[360,54,253,35],[360,57,253,38],[360,58,253,39],[360,75,253,43],[360,79,253,43,"_reactJsxDevRuntime"],[360,98,253,43],[360,99,253,43,"jsxDEV"],[360,105,253,43],[360,107,253,44,"_reactNative"],[360,119,253,48],[360,120,253,48,"View"],[360,124,253,48],[361,16,253,49,"style"],[361,21,253,54],[361,23,253,56],[361,24,253,57,"s"],[361,25,253,58],[361,26,253,59,"stepConnector"],[361,39,253,72],[361,41,253,74,"done"],[361,45,253,78],[361,49,253,82,"s"],[361,50,253,83],[361,51,253,84,"stepConnectorDone"],[361,68,253,101],[362,14,253,103],[363,16,253,103,"fileName"],[363,24,253,103],[363,26,253,103,"_jsxFileName"],[363,38,253,103],[364,16,253,103,"lineNumber"],[364,26,253,103],[365,16,253,103,"columnNumber"],[365,28,253,103],[366,14,253,103],[366,21,253,105],[366,22,253,106],[367,12,253,106],[367,15,236,35,"step"],[367,19,236,39],[367,20,236,40,"key"],[367,23,236,43],[368,14,236,43,"fileName"],[368,22,236,43],[368,24,236,43,"_jsxFileName"],[368,36,236,43],[369,14,236,43,"lineNumber"],[369,24,236,43],[370,14,236,43,"columnNumber"],[370,26,236,43],[371,12,236,43],[371,19,254,30],[371,20,254,31],[372,10,256,10],[372,11,256,11],[373,8,256,12],[374,10,256,12,"fileName"],[374,18,256,12],[374,20,256,12,"_jsxFileName"],[374,32,256,12],[375,10,256,12,"lineNumber"],[375,20,256,12],[376,10,256,12,"columnNumber"],[376,22,256,12],[377,8,256,12],[377,15,257,14],[377,16,257,15],[378,6,257,15],[379,8,257,15,"fileName"],[379,16,257,15],[379,18,257,15,"_jsxFileName"],[379,30,257,15],[380,8,257,15,"lineNumber"],[380,18,257,15],[381,8,257,15,"columnNumber"],[381,20,257,15],[382,6,257,15],[382,13,258,20],[382,14,258,21],[382,29,261,6],[382,33,261,6,"_reactJsxDevRuntime"],[382,52,261,6],[382,53,261,6,"jsxDEV"],[382,59,261,6],[382,61,261,7,"_reactNative"],[382,73,261,27],[382,74,261,27,"KeyboardAvoidingView"],[382,94,261,27],[383,8,262,8,"style"],[383,13,262,13],[383,15,262,15],[384,10,262,17,"flex"],[384,14,262,21],[384,16,262,23],[385,8,262,25],[385,9,262,27],[386,8,263,8,"behavior"],[386,16,263,16],[386,18,263,18,"Platform"],[386,30,263,26],[386,31,263,26,"Platform"],[386,39,263,26],[386,40,263,27,"OS"],[386,42,263,29],[386,47,263,34],[386,52,263,39],[386,55,263,42],[386,64,263,51],[386,67,263,54,"undefined"],[386,76,263,64],[387,8,264,8,"keyboardVerticalOffset"],[387,30,264,30],[387,32,264,32],[387,33,264,34],[388,8,264,34,"children"],[388,16,264,34],[388,31,266,8],[388,35,266,8,"_reactJsxDevRuntime"],[388,54,266,8],[388,55,266,8,"jsxDEV"],[388,61,266,8],[388,63,266,9,"_reactNative"],[388,75,266,19],[388,76,266,19,"ScrollView"],[388,86,266,19],[389,10,267,10,"ref"],[389,13,267,13],[389,15,267,15,"scrollRef"],[389,24,267,25],[390,10,268,10,"style"],[390,15,268,15],[390,17,268,17,"s"],[390,18,268,18],[390,19,268,19,"scroll"],[390,25,268,26],[391,10,269,10,"contentContainerStyle"],[391,31,269,31],[391,33,269,33,"s"],[391,34,269,34],[391,35,269,35,"scrollInner"],[391,46,269,47],[392,10,270,10,"showsVerticalScrollIndicator"],[392,38,270,38],[392,40,270,40],[392,45,270,46],[393,10,271,10,"keyboardShouldPersistTaps"],[393,35,271,35],[393,37,271,36],[393,46,271,45],[394,10,272,10,"keyboardDismissMode"],[394,29,272,29],[394,31,272,30],[394,44,272,43],[395,10,272,43,"children"],[395,18,272,43],[395,21,275,11,"activeStep"],[395,31,275,21],[395,36,275,26],[395,37,275,27],[395,54,276,12],[395,58,276,12,"_reactJsxDevRuntime"],[395,77,276,12],[395,78,276,12,"jsxDEV"],[395,84,276,12],[395,86,276,13,"_componentsStepDetails"],[395,108,276,24],[395,109,276,24,"StepDetails"],[395,120,276,24],[396,12,277,14,"control"],[396,19,277,21],[396,21,277,23,"control"],[396,28,277,31],[397,12,278,14,"errors"],[397,18,278,20],[397,20,278,22,"errors"],[397,26,278,29],[398,12,279,14,"t"],[398,13,279,15],[398,15,279,17,"t"],[398,16,279,19],[399,12,280,14,"coverImage"],[399,22,280,24],[399,24,280,26,"coverImage"],[399,34,280,37],[400,12,281,14,"pickCoverImage"],[400,26,281,28],[400,28,281,30,"pickCoverImage"],[400,42,281,45],[401,12,282,14,"titleValue"],[401,22,282,24],[401,24,282,26,"titleValue"],[401,34,282,37],[402,12,283,14,"descValue"],[402,21,283,23],[402,23,283,25,"descValue"],[402,32,283,35],[403,12,284,14,"eventType"],[403,21,284,23],[403,23,284,25,"eventType"],[403,32,284,35],[404,12,285,14,"setEventType"],[404,24,285,26],[404,26,285,28,"setEventType"],[404,38,285,41],[405,12,286,14,"locationValue"],[405,25,286,27],[405,27,286,29,"locationValue"],[405,40,286,43],[406,12,287,14,"latitude"],[406,20,287,22],[406,22,287,24,"latitude"],[406,30,287,33],[407,12,288,14,"longitude"],[407,21,288,23],[407,23,288,25,"longitude"],[407,32,288,35],[408,12,289,14,"address"],[408,19,289,21],[408,21,289,23,"address"],[408,28,289,31],[409,12,290,14,"params"],[409,18,290,20],[409,20,290,22,"params"],[410,10,290,29],[411,12,290,29,"fileName"],[411,20,290,29],[411,22,290,29,"_jsxFileName"],[411,34,290,29],[412,12,290,29,"lineNumber"],[412,22,290,29],[413,12,290,29,"columnNumber"],[413,24,290,29],[414,10,290,29],[414,17,291,13],[414,18,292,11],[414,20,295,11,"activeStep"],[414,30,295,21],[414,35,295,26],[414,36,295,27],[414,53,296,12],[414,57,296,12,"_reactJsxDevRuntime"],[414,76,296,12],[414,77,296,12,"jsxDEV"],[414,83,296,12],[414,85,296,13,"_componentsStepSchedule"],[414,108,296,25],[414,109,296,25,"StepSchedule"],[414,121,296,25],[415,12,297,14,"t"],[415,13,297,15],[415,15,297,17,"t"],[415,16,297,19],[416,12,298,14,"startDate"],[416,21,298,23],[416,23,298,25,"startDate"],[416,32,298,35],[417,12,299,14,"endDate"],[417,19,299,21],[417,21,299,23,"endDate"],[417,28,299,31],[418,12,300,14,"showPicker"],[418,22,300,24],[418,24,300,26,"showPicker"],[418,34,300,37],[419,12,301,14,"setShowPicker"],[419,25,301,27],[419,27,301,29,"setShowPicker"],[419,40,301,43],[420,12,302,14,"onDatePickerChange"],[420,30,302,32],[420,32,302,34,"onDatePickerChange"],[420,50,302,53],[421,12,303,14,"durationHrs"],[421,23,303,25],[421,25,303,27,"durationHrs"],[421,36,303,39],[422,12,304,14,"durationMins"],[422,24,304,26],[422,26,304,28,"durationMins"],[423,10,304,41],[424,12,304,41,"fileName"],[424,20,304,41],[424,22,304,41,"_jsxFileName"],[424,34,304,41],[425,12,304,41,"lineNumber"],[425,22,304,41],[426,12,304,41,"columnNumber"],[426,24,304,41],[427,10,304,41],[427,17,305,14],[427,18,306,11],[427,20,309,11,"activeStep"],[427,30,309,21],[427,35,309,26],[427,36,309,27],[427,53,310,12],[427,57,310,12,"_reactJsxDevRuntime"],[427,76,310,12],[427,77,310,12,"jsxDEV"],[427,83,310,12],[427,85,310,13,"_componentsStepSettings"],[427,108,310,25],[427,109,310,25,"StepSettings"],[427,121,310,25],[428,12,311,14,"t"],[428,13,311,15],[428,15,311,17,"t"],[428,16,311,19],[429,12,312,14,"control"],[429,19,312,21],[429,21,312,23,"control"],[429,28,312,31],[430,12,313,14,"errors"],[430,18,313,20],[430,20,313,22,"errors"],[430,26,313,29],[431,12,314,14,"difficulty"],[431,22,314,24],[431,24,314,26,"difficulty"],[431,34,314,37],[432,12,315,14,"setDifficulty"],[432,25,315,27],[432,27,315,29,"setDifficulty"],[432,40,315,43],[433,12,316,14,"selectedEquipment"],[433,29,316,31],[433,31,316,33,"selectedEquipment"],[433,48,316,51],[434,12,317,14,"toggleEquipment"],[434,27,317,29],[434,29,317,31,"toggleEquipment"],[434,44,317,47],[435,12,318,14,"titleValue"],[435,22,318,24],[435,24,318,26,"titleValue"],[435,34,318,37],[436,12,319,14,"locationValue"],[436,25,319,27],[436,27,319,29,"locationValue"],[436,40,319,43],[437,12,320,14,"eventType"],[437,21,320,23],[437,23,320,25,"eventType"],[437,32,320,35],[438,12,321,14,"startDate"],[438,21,321,23],[438,23,321,25,"startDate"],[439,10,321,35],[440,12,321,35,"fileName"],[440,20,321,35],[440,22,321,35,"_jsxFileName"],[440,34,321,35],[441,12,321,35,"lineNumber"],[441,22,321,35],[442,12,321,35,"columnNumber"],[442,24,321,35],[443,10,321,35],[443,17,322,13],[443,18,323,11],[443,33,326,10],[443,37,326,10,"_reactJsxDevRuntime"],[443,56,326,10],[443,57,326,10,"jsxDEV"],[443,63,326,10],[443,65,326,11,"_reactNative"],[443,77,326,19],[443,78,326,19,"Animated"],[443,86,326,19],[443,87,326,20,"View"],[443,91,326,24],[444,12,326,25,"style"],[444,17,326,30],[444,19,326,32],[445,14,326,34,"height"],[445,20,326,40],[445,22,326,42,"keyboardPadding"],[446,12,326,58],[447,10,326,60],[448,12,326,60,"fileName"],[448,20,326,60],[448,22,326,60,"_jsxFileName"],[448,34,326,60],[449,12,326,60,"lineNumber"],[449,22,326,60],[450,12,326,60,"columnNumber"],[450,24,326,60],[451,10,326,60],[451,17,326,62],[451,18,326,63],[452,8,326,63],[453,10,326,63,"fileName"],[453,18,326,63],[453,20,326,63,"_jsxFileName"],[453,32,326,63],[454,10,326,63,"lineNumber"],[454,20,326,63],[455,10,326,63,"columnNumber"],[455,22,326,63],[456,8,326,63],[456,15,327,20],[457,6,327,21],[458,8,327,21,"fileName"],[458,16,327,21],[458,18,327,21,"_jsxFileName"],[458,30,327,21],[459,8,327,21,"lineNumber"],[459,18,327,21],[460,8,327,21,"columnNumber"],[460,20,327,21],[461,6,327,21],[461,13,328,28],[461,14,328,29],[461,29,331,6],[461,33,331,6,"_reactJsxDevRuntime"],[461,52,331,6],[461,53,331,6,"jsxDEV"],[461,59,331,6],[461,61,331,7,"_reactNativeSafeAreaContext"],[461,88,331,19],[461,89,331,19,"SafeAreaView"],[461,101,331,19],[462,8,331,20,"edges"],[462,13,331,25],[462,15,331,27],[462,16,331,28],[462,24,331,36],[462,25,331,38],[463,8,331,39,"style"],[463,13,331,44],[463,15,331,46,"s"],[463,16,331,47],[463,17,331,48,"bottomArea"],[463,27,331,59],[464,8,331,59,"children"],[464,16,331,59],[464,31,332,8],[464,35,332,8,"_reactJsxDevRuntime"],[464,54,332,8],[464,55,332,8,"jsxDEV"],[464,61,332,8],[464,63,332,9,"_reactNative"],[464,75,332,13],[464,76,332,13,"View"],[464,80,332,13],[465,10,332,14,"style"],[465,15,332,19],[465,17,332,21,"s"],[465,18,332,22],[465,19,332,23,"bottomBar"],[465,28,332,33],[466,10,332,33,"children"],[466,18,332,33],[466,21,333,11,"activeStep"],[466,31,333,21],[466,34,333,24],[466,35,333,25],[466,51,334,12],[466,55,334,12,"_reactJsxDevRuntime"],[466,74,334,12],[466,75,334,12,"jsxDEV"],[466,81,334,12],[466,83,334,13,"_reactNative"],[466,95,334,29],[466,96,334,29,"TouchableOpacity"],[466,112,334,29],[467,12,335,14,"style"],[467,17,335,19],[467,19,335,21,"s"],[467,20,335,22],[467,21,335,23,"backBtn"],[467,28,335,31],[468,12,336,14,"onPress"],[468,19,336,21],[468,21,336,23,"onPress"],[468,22,336,23],[468,27,336,29],[469,14,337,16,"setActiveStep"],[469,27,337,29],[469,28,337,31,"p"],[469,29,337,32],[469,33,337,37,"p"],[469,34,337,38],[469,37,337,41],[469,38,337,42],[469,39,337,43],[470,14,338,16,"scrollRef"],[470,23,338,25],[470,24,338,26,"current"],[470,31,338,33],[470,33,338,35,"scrollTo"],[470,41,338,43],[470,42,338,44],[471,16,338,46,"y"],[471,17,338,47],[471,19,338,49],[471,20,338,50],[472,16,338,52,"animated"],[472,24,338,60],[472,26,338,62],[473,14,338,67],[473,15,338,68],[473,16,338,69],[474,12,339,14],[474,13,339,16],[475,12,340,14,"activeOpacity"],[475,25,340,27],[475,27,340,29],[475,30,340,33],[476,12,340,33,"children"],[476,20,340,33],[476,36,342,14],[476,40,342,14,"_reactJsxDevRuntime"],[476,59,342,14],[476,60,342,14,"jsxDEV"],[476,66,342,14],[476,68,342,15,"_expoVectorIcons"],[476,84,342,23],[476,85,342,23,"Ionicons"],[476,93,342,23],[477,14,342,24,"name"],[477,18,342,28],[477,20,342,29],[477,32,342,41],[478,14,342,42,"size"],[478,18,342,46],[478,20,342,48],[478,22,342,51],[479,14,342,52,"color"],[479,19,342,57],[479,21,342,59,"Colors"],[479,32,342,65],[479,33,342,65,"Colors"],[479,39,342,65],[479,40,342,66,"textPrimary"],[480,12,342,78],[481,14,342,78,"fileName"],[481,22,342,78],[481,24,342,78,"_jsxFileName"],[481,36,342,78],[482,14,342,78,"lineNumber"],[482,24,342,78],[483,14,342,78,"columnNumber"],[483,26,342,78],[484,12,342,78],[484,19,342,80],[484,20,342,81],[484,35,343,14],[484,39,343,14,"_reactJsxDevRuntime"],[484,58,343,14],[484,59,343,14,"jsxDEV"],[484,65,343,14],[484,67,343,15,"_reactNative"],[484,79,343,19],[484,80,343,19,"Text"],[484,84,343,19],[485,14,343,20,"style"],[485,19,343,25],[485,21,343,27,"s"],[485,22,343,28],[485,23,343,29,"backBtnText"],[485,34,343,41],[486,14,343,41,"children"],[486,22,343,41],[486,24,343,43,"t"],[486,25,343,44],[486,26,343,45],[486,39,343,58],[487,12,343,59],[488,14,343,59,"fileName"],[488,22,343,59],[488,24,343,59,"_jsxFileName"],[488,36,343,59],[489,14,343,59,"lineNumber"],[489,24,343,59],[490,14,343,59,"columnNumber"],[490,26,343,59],[491,12,343,59],[491,19,343,66],[491,20,343,67],[492,10,343,67],[493,12,343,67,"fileName"],[493,20,343,67],[493,22,343,67,"_jsxFileName"],[493,34,343,67],[494,12,343,67,"lineNumber"],[494,22,343,67],[495,12,343,67,"columnNumber"],[495,24,343,67],[496,10,343,67],[496,17,344,30],[496,18,344,31],[496,34,346,12],[496,38,346,12,"_reactJsxDevRuntime"],[496,57,346,12],[496,58,346,12,"jsxDEV"],[496,64,346,12],[496,66,346,13,"_reactNative"],[496,78,346,17],[496,79,346,17,"View"],[496,83,346,17],[497,12,346,18,"style"],[497,17,346,23],[497,19,346,25],[498,14,346,27,"minWidth"],[498,22,346,35],[498,24,346,37],[499,12,346,40],[500,10,346,42],[501,12,346,42,"fileName"],[501,20,346,42],[501,22,346,42,"_jsxFileName"],[501,34,346,42],[502,12,346,42,"lineNumber"],[502,22,346,42],[503,12,346,42,"columnNumber"],[503,24,346,42],[504,10,346,42],[504,17,346,44],[504,18,347,11],[504,20,349,11,"activeStep"],[504,30,349,21],[504,33,349,24,"STEPS"],[504,44,349,29],[504,45,349,29,"STEPS"],[504,50,349,29],[504,51,349,30,"length"],[504,57,349,36],[504,60,349,39],[504,61,349,40],[504,77,350,12],[504,81,350,12,"_reactJsxDevRuntime"],[504,100,350,12],[504,101,350,12,"jsxDEV"],[504,107,350,12],[504,109,350,13,"_reactNative"],[504,121,350,29],[504,122,350,29,"TouchableOpacity"],[504,138,350,29],[505,12,350,30,"style"],[505,17,350,35],[505,19,350,37,"s"],[505,20,350,38],[505,21,350,39,"nextBtn"],[505,28,350,47],[506,12,350,48,"onPress"],[506,19,350,55],[506,21,350,57,"goNext"],[506,27,350,64],[507,12,350,65,"activeOpacity"],[507,25,350,78],[507,27,350,80],[507,30,350,84],[508,12,350,84,"children"],[508,20,350,84],[508,36,351,14],[508,40,351,14,"_reactJsxDevRuntime"],[508,59,351,14],[508,60,351,14,"jsxDEV"],[508,66,351,14],[508,68,351,15,"_reactNative"],[508,80,351,19],[508,81,351,19,"Text"],[508,85,351,19],[509,14,351,20,"style"],[509,19,351,25],[509,21,351,27,"s"],[509,22,351,28],[509,23,351,29,"nextBtnText"],[509,34,351,41],[510,14,351,41,"children"],[510,22,351,41],[510,24,351,43,"t"],[510,25,351,44],[510,26,351,45],[510,39,351,58],[511,12,351,59],[512,14,351,59,"fileName"],[512,22,351,59],[512,24,351,59,"_jsxFileName"],[512,36,351,59],[513,14,351,59,"lineNumber"],[513,24,351,59],[514,14,351,59,"columnNumber"],[514,26,351,59],[515,12,351,59],[515,19,351,66],[515,20,351,67],[515,35,352,14],[515,39,352,14,"_reactJsxDevRuntime"],[515,58,352,14],[515,59,352,14,"jsxDEV"],[515,65,352,14],[515,67,352,15,"_expoVectorIcons"],[515,83,352,23],[515,84,352,23,"Ionicons"],[515,92,352,23],[516,14,352,24,"name"],[516,18,352,28],[516,20,352,29],[516,35,352,44],[517,14,352,45,"size"],[517,18,352,49],[517,20,352,51],[517,22,352,54],[518,14,352,55,"color"],[518,19,352,60],[518,21,352,61],[519,12,352,67],[520,14,352,67,"fileName"],[520,22,352,67],[520,24,352,67,"_jsxFileName"],[520,36,352,67],[521,14,352,67,"lineNumber"],[521,24,352,67],[522,14,352,67,"columnNumber"],[522,26,352,67],[523,12,352,67],[523,19,352,69],[523,20,352,70],[524,10,352,70],[525,12,352,70,"fileName"],[525,20,352,70],[525,22,352,70,"_jsxFileName"],[525,34,352,70],[526,12,352,70,"lineNumber"],[526,22,352,70],[527,12,352,70,"columnNumber"],[527,24,352,70],[528,10,352,70],[528,17,353,30],[528,18,353,31],[528,34,355,12],[528,38,355,12,"_reactJsxDevRuntime"],[528,57,355,12],[528,58,355,12,"jsxDEV"],[528,64,355,12],[528,66,355,13,"_reactNative"],[528,78,355,29],[528,79,355,29,"TouchableOpacity"],[528,95,355,29],[529,12,356,14,"style"],[529,17,356,19],[529,19,356,21],[529,20,356,22,"s"],[529,21,356,23],[529,22,356,24,"submitBtn"],[529,31,356,33],[529,33,356,35,"createEvent"],[529,44,356,46],[529,45,356,47,"isPending"],[529,54,356,56],[529,58,356,60],[530,14,356,62,"opacity"],[530,21,356,69],[530,23,356,71],[531,12,356,75],[531,13,356,76],[531,14,356,78],[532,12,357,14,"onPress"],[532,19,357,21],[532,21,357,23,"handleSubmit"],[532,33,357,35],[532,34,357,36,"onSubmit"],[532,42,357,44],[532,43,357,46],[533,12,358,14,"activeOpacity"],[533,25,358,27],[533,27,358,29],[533,30,358,33],[534,12,359,14,"disabled"],[534,20,359,22],[534,22,359,24,"createEvent"],[534,33,359,35],[534,34,359,36,"isPending"],[534,43,359,46],[535,12,359,46,"children"],[535,20,359,46],[535,23,361,15,"createEvent"],[535,34,361,26],[535,35,361,27,"isPending"],[535,44,361,36],[535,60,362,16],[535,64,362,16,"_reactJsxDevRuntime"],[535,83,362,16],[535,84,362,16,"jsxDEV"],[535,90,362,16],[535,92,362,17,"_reactNative"],[535,104,362,34],[535,105,362,34,"ActivityIndicator"],[535,122,362,34],[536,14,362,35,"size"],[536,18,362,39],[536,20,362,40],[536,27,362,47],[537,14,362,48,"color"],[537,19,362,53],[537,21,362,54],[538,12,362,60],[539,14,362,60,"fileName"],[539,22,362,60],[539,24,362,60,"_jsxFileName"],[539,36,362,60],[540,14,362,60,"lineNumber"],[540,24,362,60],[541,14,362,60,"columnNumber"],[541,26,362,60],[542,12,362,60],[542,19,362,62],[542,20,362,63],[542,36,364,16],[542,40,364,16,"_reactJsxDevRuntime"],[542,59,364,16],[542,60,364,16,"jsxDEV"],[542,66,364,16],[542,68,364,17,"_expoVectorIcons"],[542,84,364,25],[542,85,364,25,"Ionicons"],[542,93,364,25],[543,14,364,26,"name"],[543,18,364,30],[543,20,364,31],[543,36,364,47],[544,14,364,48,"size"],[544,18,364,52],[544,20,364,54],[544,22,364,57],[545,14,364,58,"color"],[545,19,364,63],[545,21,364,64],[546,12,364,70],[547,14,364,70,"fileName"],[547,22,364,70],[547,24,364,70,"_jsxFileName"],[547,36,364,70],[548,14,364,70,"lineNumber"],[548,24,364,70],[549,14,364,70,"columnNumber"],[549,26,364,70],[550,12,364,70],[550,19,364,72],[550,20,365,15],[550,35,366,14],[550,39,366,14,"_reactJsxDevRuntime"],[550,58,366,14],[550,59,366,14,"jsxDEV"],[550,65,366,14],[550,67,366,15,"_reactNative"],[550,79,366,19],[550,80,366,19,"Text"],[550,84,366,19],[551,14,366,20,"style"],[551,19,366,25],[551,21,366,27,"s"],[551,22,366,28],[551,23,366,29,"submitText"],[551,33,366,40],[552,14,366,40,"children"],[552,22,366,40],[552,24,367,17,"createEvent"],[552,35,367,28],[552,36,367,29,"isPending"],[552,45,367,38],[552,48,367,41,"t"],[552,49,367,42],[552,50,367,43],[552,72,367,65],[552,73,367,66],[552,76,367,69,"t"],[552,77,367,70],[552,78,367,71],[552,99,367,92],[553,12,367,93],[554,14,367,93,"fileName"],[554,22,367,93],[554,24,367,93,"_jsxFileName"],[554,36,367,93],[555,14,367,93,"lineNumber"],[555,24,367,93],[556,14,367,93,"columnNumber"],[556,26,367,93],[557,12,367,93],[557,19,368,20],[557,20,368,21],[558,10,368,21],[559,12,368,21,"fileName"],[559,20,368,21],[559,22,368,21,"_jsxFileName"],[559,34,368,21],[560,12,368,21,"lineNumber"],[560,22,368,21],[561,12,368,21,"columnNumber"],[561,24,368,21],[562,10,368,21],[562,17,369,30],[562,18,370,11],[563,8,370,11],[564,10,370,11,"fileName"],[564,18,370,11],[564,20,370,11,"_jsxFileName"],[564,32,370,11],[565,10,370,11,"lineNumber"],[565,20,370,11],[566,10,370,11,"columnNumber"],[566,22,370,11],[567,8,370,11],[567,15,371,14],[568,6,371,15],[569,8,371,15,"fileName"],[569,16,371,15],[569,18,371,15,"_jsxFileName"],[569,30,371,15],[570,8,371,15,"lineNumber"],[570,18,371,15],[571,8,371,15,"columnNumber"],[571,20,371,15],[572,6,371,15],[572,13,372,20],[572,14,372,21],[573,4,372,21],[574,6,372,21,"fileName"],[574,14,372,21],[574,16,372,21,"_jsxFileName"],[574,28,372,21],[575,6,372,21,"lineNumber"],[575,16,372,21],[576,6,372,21,"columnNumber"],[576,18,372,21],[577,4,372,21],[577,11,373,10],[577,12,373,11],[578,2,375,0],[579,2,375,1,"_s"],[579,4,375,1],[579,5,39,24,"CreateEventScreen"],[579,22,39,41],[580,4,39,41],[580,12,40,17,"useRouter"],[580,23,40,26],[580,24,40,26,"useRouter"],[580,33,40,26],[580,35,41,16,"useTranslation"],[580,48,41,30],[580,49,41,30,"useTranslation"],[580,63,41,30],[580,65,42,15,"useAuthStore"],[580,81,42,27],[580,82,42,27,"useAuthStore"],[580,94,42,27],[580,96,43,22,"useCreateEvent"],[580,117,43,36],[580,118,43,36,"useCreateEvent"],[580,132,43,36],[580,134,46,17,"useLocalSearchParams"],[580,145,46,37],[580,146,46,37,"useLocalSearchParams"],[580,166,46,37],[580,168,61,6,"useForm"],[580,182,61,13],[580,183,61,13,"useForm"],[580,190,61,13],[581,2,61,13],[582,2,61,13,"_c"],[582,4,61,13],[582,7,39,24,"CreateEventScreen"],[582,24,39,41],[583,2,378,0],[583,6,378,6,"s"],[583,7,378,7],[583,10,378,10,"StyleSheet"],[583,22,378,20],[583,23,378,20,"StyleSheet"],[583,33,378,20],[583,34,378,21,"create"],[583,40,378,27],[583,41,378,28],[584,4,379,2,"stepTextDone"],[584,16,379,14],[584,18,379,16],[585,6,379,18,"color"],[585,11,379,23],[585,13,379,25,"Colors"],[585,24,379,31],[585,25,379,31,"Colors"],[585,31,379,31],[585,32,379,32,"primary"],[586,4,379,40],[586,5,379,41],[587,4,380,2,"stepTextActive"],[587,18,380,16],[587,20,380,18],[588,6,380,20,"color"],[588,11,380,25],[588,13,380,27,"Colors"],[588,24,380,33],[588,25,380,33,"Colors"],[588,31,380,33],[588,32,380,34,"primary"],[588,39,380,41],[589,6,380,43,"fontFamily"],[589,16,380,53],[589,18,380,55,"Fonts"],[589,28,380,60],[589,29,380,60,"Fonts"],[589,34,380,60],[589,35,380,61,"bold"],[590,4,380,66],[590,5,380,67],[591,4,381,2,"scrollInner"],[591,15,381,13],[591,17,381,15],[592,6,381,17,"paddingBottom"],[592,19,381,30],[592,21,381,32],[593,4,381,35],[593,5,381,36],[594,4,382,2,"stepCircle"],[594,14,382,12],[594,16,382,14],[595,6,383,4,"width"],[595,11,383,9],[595,13,383,11],[595,15,383,13],[596,6,384,4,"height"],[596,12,384,10],[596,14,384,12],[596,16,384,14],[597,6,385,4,"borderRadius"],[597,18,385,16],[597,20,385,18],[597,22,385,20],[598,6,386,4,"backgroundColor"],[598,21,386,19],[598,23,386,21],[598,32,386,30],[599,6,387,4,"alignItems"],[599,16,387,14],[599,18,387,16],[599,26,387,24],[600,6,388,4,"justifyContent"],[600,20,388,18],[600,22,388,20],[601,4,389,2],[601,5,389,3],[602,4,390,2,"stepCircleDone"],[602,18,390,16],[602,20,390,18],[603,6,390,20,"backgroundColor"],[603,21,390,35],[603,23,390,37,"Colors"],[603,34,390,43],[603,35,390,43,"Colors"],[603,41,390,43],[603,42,390,44,"primary"],[604,4,390,52],[604,5,390,53],[605,4,391,2,"scroll"],[605,10,391,8],[605,12,391,10],[606,6,391,12,"flex"],[606,10,391,16],[606,12,391,18],[607,4,391,20],[607,5,391,21],[608,4,392,2,"headerTitle"],[608,15,392,13],[608,17,392,15],[609,6,392,17,"fontFamily"],[609,16,392,27],[609,18,392,29,"Fonts"],[609,28,392,34],[609,29,392,34,"Fonts"],[609,34,392,34],[609,35,392,35,"bold"],[609,39,392,39],[610,6,392,41,"fontSize"],[610,14,392,49],[610,16,392,51],[610,18,392,53],[611,6,392,55,"color"],[611,11,392,60],[611,13,392,62,"Colors"],[611,24,392,68],[611,25,392,68,"Colors"],[611,31,392,68],[611,32,392,69,"textPrimary"],[612,4,392,81],[612,5,392,82],[613,4,393,2,"backBtnText"],[613,15,393,13],[613,17,393,15],[614,6,393,17,"fontFamily"],[614,16,393,27],[614,18,393,29,"Fonts"],[614,28,393,34],[614,29,393,34,"Fonts"],[614,34,393,34],[614,35,393,35,"semiBold"],[614,43,393,43],[615,6,393,45,"fontSize"],[615,14,393,53],[615,16,393,55],[615,18,393,57],[616,6,393,59,"color"],[616,11,393,64],[616,13,393,66,"Colors"],[616,24,393,72],[616,25,393,72,"Colors"],[616,31,393,72],[616,32,393,73,"textPrimary"],[617,4,393,85],[617,5,393,86],[618,4,394,2,"stepText"],[618,12,394,10],[618,14,394,12],[619,6,394,14,"fontFamily"],[619,16,394,24],[619,18,394,26,"Fonts"],[619,28,394,31],[619,29,394,31,"Fonts"],[619,34,394,31],[619,35,394,32,"medium"],[619,41,394,38],[620,6,394,40,"fontSize"],[620,14,394,48],[620,16,394,50],[620,18,394,52],[621,6,394,54,"color"],[621,11,394,59],[621,13,394,61],[622,4,394,71],[622,5,394,72],[623,4,395,2,"stepConnector"],[623,17,395,15],[623,19,395,17],[624,6,396,4,"flex"],[624,10,396,8],[624,12,396,10],[624,13,396,11],[625,6,397,4,"height"],[625,12,397,10],[625,14,397,12],[625,15,397,13],[626,6,398,4,"backgroundColor"],[626,21,398,19],[626,23,398,21],[626,32,398,30],[627,6,399,4,"marginHorizontal"],[627,22,399,20],[627,24,399,22],[627,25,399,23],[628,6,400,4,"borderRadius"],[628,18,400,16],[628,20,400,18],[628,21,400,19],[629,6,401,4,"marginBottom"],[629,18,401,16],[629,20,401,18],[630,4,402,2],[630,5,402,3],[631,4,403,2,"headerArea"],[631,14,403,12],[631,16,403,14],[632,6,404,4,"backgroundColor"],[632,21,404,19],[632,23,404,21],[632,29,404,27],[633,6,405,4,"borderBottomWidth"],[633,23,405,21],[633,25,405,23],[633,26,405,24],[634,6,406,4,"borderBottomColor"],[634,23,406,21],[634,25,406,23],[634,47,406,45],[635,6,407,4,"elevation"],[635,15,407,13],[635,17,407,15],[635,18,407,16],[636,6,408,4,"shadowColor"],[636,17,408,15],[636,19,408,17],[636,25,408,23],[637,6,409,4,"shadowOffset"],[637,18,409,16],[637,20,409,18],[638,8,409,20,"width"],[638,13,409,25],[638,15,409,27],[638,16,409,28],[639,8,409,30,"height"],[639,14,409,36],[639,16,409,38],[640,6,409,40],[640,7,409,41],[641,6,410,4,"shadowOpacity"],[641,19,410,17],[641,21,410,19],[641,25,410,23],[642,6,411,4,"shadowRadius"],[642,18,411,16],[642,20,411,18],[642,21,411,19],[643,6,412,4,"zIndex"],[643,12,412,10],[643,14,412,12],[644,4,413,2],[644,5,413,3],[645,4,414,2,"stepTouch"],[645,13,414,11],[645,15,414,13],[646,6,414,15,"alignItems"],[646,16,414,25],[646,18,414,27],[646,26,414,35],[647,6,414,37,"gap"],[647,9,414,40],[647,11,414,42],[647,12,414,43],[648,6,414,45,"minWidth"],[648,14,414,53],[648,16,414,55],[649,4,414,58],[649,5,414,59],[650,4,415,2,"stepper"],[650,11,415,9],[650,13,415,11],[651,6,415,13,"flexDirection"],[651,19,415,26],[651,21,415,28],[651,26,415,33],[652,6,415,35,"alignItems"],[652,16,415,45],[652,18,415,47],[652,26,415,55],[653,6,415,57,"paddingHorizontal"],[653,23,415,74],[653,25,415,76],[653,27,415,78],[654,6,415,80,"paddingBottom"],[654,19,415,93],[654,21,415,95],[655,4,415,98],[655,5,415,99],[656,4,416,2,"header"],[656,10,416,8],[656,12,416,10],[657,6,417,4,"flexDirection"],[657,19,417,17],[657,21,417,19],[657,26,417,24],[658,6,418,4,"alignItems"],[658,16,418,14],[658,18,418,16],[658,26,418,24],[659,6,419,4,"justifyContent"],[659,20,419,18],[659,22,419,20],[659,30,419,28],[660,6,420,4,"paddingHorizontal"],[660,23,420,21],[660,25,420,23],[660,27,420,25],[661,6,421,4,"paddingVertical"],[661,21,421,19],[661,23,421,21],[662,4,422,2],[662,5,422,3],[663,4,423,2,"submitBtn"],[663,13,423,11],[663,15,423,13],[664,6,424,4,"flexDirection"],[664,19,424,17],[664,21,424,19],[664,26,424,24],[665,6,425,4,"alignItems"],[665,16,425,14],[665,18,425,16],[665,26,425,24],[666,6,426,4,"gap"],[666,9,426,7],[666,11,426,9],[666,12,426,10],[667,6,427,4,"backgroundColor"],[667,21,427,19],[667,23,427,21,"Colors"],[667,34,427,27],[667,35,427,27,"Colors"],[667,41,427,27],[667,42,427,28,"primary"],[667,49,427,35],[668,6,428,4,"paddingHorizontal"],[668,23,428,21],[668,25,428,23],[668,27,428,25],[669,6,429,4,"paddingVertical"],[669,21,429,19],[669,23,429,21],[669,25,429,23],[670,6,430,4,"borderRadius"],[670,18,430,16],[670,20,430,18],[670,22,430,20],[671,6,431,4,"shadowColor"],[671,17,431,15],[671,19,431,17,"Colors"],[671,30,431,23],[671,31,431,23,"Colors"],[671,37,431,23],[671,38,431,24,"primary"],[671,45,431,31],[672,6,432,4,"shadowOffset"],[672,18,432,16],[672,20,432,18],[673,8,432,20,"width"],[673,13,432,25],[673,15,432,27],[673,16,432,28],[674,8,432,30,"height"],[674,14,432,36],[674,16,432,38],[675,6,432,40],[675,7,432,41],[676,6,433,4,"shadowOpacity"],[676,19,433,17],[676,21,433,19],[676,24,433,22],[677,6,434,4,"shadowRadius"],[677,18,434,16],[677,20,434,18],[677,21,434,19],[678,6,435,4,"elevation"],[678,15,435,13],[678,17,435,15],[679,4,436,2],[679,5,436,3],[680,4,437,2,"stepCircleActive"],[680,20,437,18],[680,22,437,20],[681,6,438,4,"backgroundColor"],[681,21,438,19],[681,23,438,21,"Colors"],[681,34,438,27],[681,35,438,27,"Colors"],[681,41,438,27],[681,42,438,28,"primary"],[681,49,438,35],[682,6,439,4,"shadowColor"],[682,17,439,15],[682,19,439,17,"Colors"],[682,30,439,23],[682,31,439,23,"Colors"],[682,37,439,23],[682,38,439,24,"primary"],[682,45,439,31],[683,6,440,4,"shadowOffset"],[683,18,440,16],[683,20,440,18],[684,8,440,20,"width"],[684,13,440,25],[684,15,440,27],[684,16,440,28],[685,8,440,30,"height"],[685,14,440,36],[685,16,440,38],[686,6,440,40],[686,7,440,41],[687,6,441,4,"shadowOpacity"],[687,19,441,17],[687,21,441,19],[687,25,441,23],[688,6,442,4,"shadowRadius"],[688,18,442,16],[688,20,442,18],[688,21,442,19],[689,6,443,4,"elevation"],[689,15,443,13],[689,17,443,15],[690,4,444,2],[690,5,444,3],[691,4,445,2,"stepConnectorDone"],[691,21,445,19],[691,23,445,21],[692,6,445,23,"backgroundColor"],[692,21,445,38],[692,23,445,40,"Colors"],[692,34,445,46],[692,35,445,46,"Colors"],[692,41,445,46],[692,42,445,47,"primary"],[693,4,445,55],[693,5,445,56],[694,4,446,2,"bottomArea"],[694,14,446,12],[694,16,446,14],[695,6,446,16,"backgroundColor"],[695,21,446,31],[695,23,446,33],[695,29,446,39],[696,6,446,41,"borderTopWidth"],[696,20,446,55],[696,22,446,57],[696,23,446,58],[697,6,446,60,"borderTopColor"],[697,20,446,74],[697,22,446,76],[698,4,446,99],[698,5,446,100],[699,4,447,2,"backBtn"],[699,11,447,9],[699,13,447,11],[700,6,448,4,"flexDirection"],[700,19,448,17],[700,21,448,19],[700,26,448,24],[701,6,449,4,"alignItems"],[701,16,449,14],[701,18,449,16],[701,26,449,24],[702,6,450,4,"gap"],[702,9,450,7],[702,11,450,9],[702,12,450,10],[703,6,451,4,"paddingHorizontal"],[703,23,451,21],[703,25,451,23],[703,27,451,25],[704,6,452,4,"paddingVertical"],[704,21,452,19],[704,23,452,21],[704,25,452,23],[705,6,453,4,"minWidth"],[705,14,453,12],[705,16,453,14],[706,4,454,2],[706,5,454,3],[707,4,455,2,"nextBtnText"],[707,15,455,13],[707,17,455,15],[708,6,455,17,"fontFamily"],[708,16,455,27],[708,18,455,29,"Fonts"],[708,28,455,34],[708,29,455,34,"Fonts"],[708,34,455,34],[708,35,455,35,"bold"],[708,39,455,39],[709,6,455,41,"fontSize"],[709,14,455,49],[709,16,455,51],[709,18,455,53],[710,6,455,55,"color"],[710,11,455,60],[710,13,455,62],[711,4,455,69],[711,5,455,70],[712,4,456,2,"submitText"],[712,14,456,12],[712,16,456,14],[713,6,456,16,"fontFamily"],[713,16,456,26],[713,18,456,28,"Fonts"],[713,28,456,33],[713,29,456,33,"Fonts"],[713,34,456,33],[713,35,456,34,"bold"],[713,39,456,38],[714,6,456,40,"fontSize"],[714,14,456,48],[714,16,456,50],[714,18,456,52],[715,6,456,54,"color"],[715,11,456,59],[715,13,456,61],[716,4,456,68],[716,5,456,69],[717,4,457,2,"headerBtn"],[717,13,457,11],[717,15,457,13],[718,6,458,4,"position"],[718,14,458,12],[718,16,458,14],[718,26,458,24],[719,6,459,4,"left"],[719,10,459,8],[719,12,459,10],[719,14,459,12],[720,6,460,4,"width"],[720,11,460,9],[720,13,460,11],[720,15,460,13],[721,6,461,4,"height"],[721,12,461,10],[721,14,461,12],[721,16,461,14],[722,6,462,4,"borderRadius"],[722,18,462,16],[722,20,462,18],[722,22,462,20],[723,6,463,4,"alignItems"],[723,16,463,14],[723,18,463,16],[723,26,463,24],[724,6,464,4,"justifyContent"],[724,20,464,18],[724,22,464,20],[724,30,464,28],[725,6,465,4,"backgroundColor"],[725,21,465,19],[725,23,465,21],[726,4,466,2],[726,5,466,3],[727,4,467,2,"nextBtn"],[727,11,467,9],[727,13,467,11],[728,6,468,4,"flexDirection"],[728,19,468,17],[728,21,468,19],[728,26,468,24],[729,6,469,4,"alignItems"],[729,16,469,14],[729,18,469,16],[729,26,469,24],[730,6,470,4,"gap"],[730,9,470,7],[730,11,470,9],[730,12,470,10],[731,6,471,4,"backgroundColor"],[731,21,471,19],[731,23,471,21,"Colors"],[731,34,471,27],[731,35,471,27,"Colors"],[731,41,471,27],[731,42,471,28,"primary"],[731,49,471,35],[732,6,472,4,"paddingHorizontal"],[732,23,472,21],[732,25,472,23],[732,27,472,25],[733,6,473,4,"paddingVertical"],[733,21,473,19],[733,23,473,21],[733,25,473,23],[734,6,474,4,"borderRadius"],[734,18,474,16],[734,20,474,18],[734,22,474,20],[735,6,475,4,"shadowColor"],[735,17,475,15],[735,19,475,17,"Colors"],[735,30,475,23],[735,31,475,23,"Colors"],[735,37,475,23],[735,38,475,24,"primary"],[735,45,475,31],[736,6,476,4,"shadowOffset"],[736,18,476,16],[736,20,476,18],[737,8,476,20,"width"],[737,13,476,25],[737,15,476,27],[737,16,476,28],[738,8,476,30,"height"],[738,14,476,36],[738,16,476,38],[739,6,476,40],[739,7,476,41],[740,6,477,4,"shadowOpacity"],[740,19,477,17],[740,21,477,19],[740,24,477,22],[741,6,478,4,"shadowRadius"],[741,18,478,16],[741,20,478,18],[741,21,478,19],[742,6,479,4,"elevation"],[742,15,479,13],[742,17,479,15],[743,4,480,2],[743,5,480,3],[744,4,481,2,"root"],[744,8,481,6],[744,10,481,8],[745,6,481,10,"flex"],[745,10,481,14],[745,12,481,16],[745,13,481,17],[746,6,481,19,"backgroundColor"],[746,21,481,34],[746,23,481,36],[747,4,481,46],[747,5,481,47],[748,4,482,2,"bottomBar"],[748,13,482,11],[748,15,482,13],[749,6,483,4,"flexDirection"],[749,19,483,17],[749,21,483,19],[749,26,483,24],[750,6,484,4,"alignItems"],[750,16,484,14],[750,18,484,16],[750,26,484,24],[751,6,485,4,"justifyContent"],[751,20,485,18],[751,22,485,20],[751,37,485,35],[752,6,486,4,"paddingHorizontal"],[752,23,486,21],[752,25,486,23],[752,27,486,25],[753,6,487,4,"paddingVertical"],[753,21,487,19],[753,23,487,21],[754,4,488,2],[755,2,489,0],[755,3,489,1],[755,4,489,2],[756,2,489,3],[756,6,489,3,"_c"],[756,8,489,3],[757,2,489,3,"$RefreshReg$"],[757,14,489,3],[757,15,489,3,"_c"],[757,17,489,3],[758,0,489,3],[758,3]],"functionMap":{"names":["<global>","CreateEventScreen","useAuthStore$argument_0","useState$argument_0","useEffect$argument_0","Keyboard.addListener$argument_1","<anonymous>","toggleEquipment","setSelectedEquipment$argument_0","pickCoverImage","goNext","setActiveStep$argument_0","onSubmit","onDatePickerChange","TouchableOpacity.props.onPress","STEPS.map$argument_0"],"mappings":"AAA;eCsC;4BCG,eD;6CE4C;GFK;yCEC;GFK;YGQ;yGCC;4GDC;yGCE;sFDC;WEE;KFG;GHC;sCMG;yBCC;KDK;GNC;yBQE;GRa;iBSE;kBCK,wCD;GTE;mBWE;GXiC;6BYE,kBP;GLyB;yDaY,mBb;qBcQ;2BDO,4CC;WdiB;uBagF;8BHC,YG;ebE;CDoC"},"hasCjsExports":false},"type":"js/module"}]