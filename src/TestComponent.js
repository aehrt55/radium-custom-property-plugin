import React from 'react';
import Radium, { Plugins } from 'radium';
import plugin from 'radium-custom-property-plugin';

const style = {
  color: '#123456',
  ':data': {
    color: 'red',
  },
};

const TestComponent = (props) => (
  <div style={style} {...props}>
    TestComponent
  </div>
);

export default Radium({
  plugins: [
    Plugins.mergeStyleArray,
    Plugins.checkProps,
    Plugins.resolveMediaQueries,
    plugin,
    Plugins.keyframes,
    Plugins.removeNestedStyles,
    Plugins.prefix,
    Plugins.checkProps,
  ],
})(TestComponent);
