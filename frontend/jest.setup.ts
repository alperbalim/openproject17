// jsdom setup for tests
// Provide minimal globals Angular/Karma would normally set
import '@testing-library/jest-dom';

// If the custom elements registration isn't global, import here
import './src/custom-elements/index';
