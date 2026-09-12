// Global test setup: mock native-only modules so screens render under Jest.
import 'react-native-gesture-handler/jestSetup';

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
