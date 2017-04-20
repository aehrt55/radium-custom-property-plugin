function isPseudoSelector(key) {
  switch (key) {
  case 'hover':
  case 'active':
  case 'visited':
  case 'focus':
  case 'disabled':
  case 'after':
  case 'before':
    return true;
  default:
    return false;
  }
}

function isPseudoSelectors(key) {
  return ((key[0] === ':') && key
  .split(':').splice(1).reduce((result, _key) => (result && isPseudoSelector(_key)), true));
}

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
    const makeCSS = (_style) => cssRuleSetToString('', appendImportantToEachValue(_style), config.userAgent);
    let className;
    const newStyle = Object.entries(style).reduce((newStyleInProgress, [key, value]) => {
      if (isCustomKey(key)) {
        const pseudos = {};
        const pureStyle = Object.entries(value).reduce((_newStyleInProgress, [_key, _value]) => {
          if (isPseudoSelectors(_key)) {
            pseudos[_key] = _value;
          } else {
            _newStyleInProgress[_key] = _value;
          }
          return _newStyleInProgress;
        }, {});
        const ruleCSS = makeCSS(pureStyle);
        className = `susu-custom-${hash(ruleCSS)}`;
        const css = `.${className}${ruleCSS}`;
        addCSS(css);
        Object.entries(pseudos)
        .forEach(([_key, _value]) => addCSS(`.${className}${_key}${makeCSS(_value)}`));
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
