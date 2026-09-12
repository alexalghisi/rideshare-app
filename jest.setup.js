// Global test setup: mock native-only modules so screens render under Jest.
import 'react-native-gesture-handler/jestSetup';
import { Animated } from 'react-native';

// Resolve animations synchronously in tests. This keeps entrance animations
// and React Navigation transitions from leaving timers running after a test,
// which otherwise leaks open handles and stalls teardown on slower machines.
const immediateAnimation = (value, config) => ({
  start: (callback) => {
    if (value && typeof value.setValue === 'function' && config) {
      value.setValue(config.toValue);
    }
    callback && callback({ finished: true });
  },
  stop: () => {},
  reset: () => {},
});
jest.spyOn(Animated, 'timing').mockImplementation(immediateAnimation);
jest.spyOn(Animated, 'spring').mockImplementation(immediateAnimation);

// Safe area context is a native module; provide light-weight passthroughs
// with zero insets so screens render in the Jest environment.
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  const Passthrough = ({ children, ...props }) =>
    React.createElement(View, props, children);
  return {
    SafeAreaProvider: Passthrough,
    SafeAreaView: Passthrough,
    SafeAreaConsumer: ({ children }) => children(insets),
    SafeAreaInsetsContext: React.createContext(insets),
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: { insets, frame },
  };
});

// react-native-maps is a native module; render its components as plain views.
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockComponent = (name) => {
    const Comp = ({ children, ...props }) =>
      React.createElement(View, { ...props, testID: props.testID || name }, children);
    Comp.displayName = name;
    return Comp;
  };
  return {
    __esModule: true,
    default: MockComponent('MapView'),
    Marker: MockComponent('Marker'),
    PROVIDER_GOOGLE: 'google',
  };
});
