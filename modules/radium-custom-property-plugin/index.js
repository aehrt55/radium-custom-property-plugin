export default function customPropertyPlugin(arg1 = {}) {
  const isCustomKey = (key) => (key === (arg1.key || ':data'));
  const main = ({
    addCSS,
    appendImportantToEachValue,
    config,
    cssRuleSetToString,
    hash,
    style,
  }) => {
    let className;
    const newStyle = Object.entries(style).reduce((newStyleInProgress, [key, value]) => {
      if (isCustomKey(key)) {
        const ruleCSS = cssRuleSetToString('', appendImportantToEachValue(value), config.userAgent);
        className = `susu-rad-${hash(ruleCSS)}`;
        const css = `.${className}${ruleCSS}`;
        addCSS(css);
      } else {
        newStyleInProgress[key] = value;
      }
      return newStyleInProgress;
    }, {});
    return {
      props: className ? { [arg1.propertyName || 'data-rad-class-name']: className } : null,
      style: newStyle,
    };
  };
  if (arg1.hasOwnProperty('addCSS')) {
    return main.call(null, arg1);
  }
  return main;
}
