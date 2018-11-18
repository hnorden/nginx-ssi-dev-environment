(function() {
  if (window.ssi) {
    loadCssFiles(window.ssi);
  } else {
    console.log('window.ssi missing');
  }

  function loadCssFiles(ssiConfig) {
    var selectedNginxStrategyId;
    var cssStrategy;
    var strategyIdx;
    var strategy;
    var fileIdx;
    var file;
    var hierarchyIdx;
    var path;
    var key;
    var basePath;

    console.log('load css files');

    setupStrategies();
    basePath = ssiConfig.frame + '/styles/themes/strategy' + selectedNginxStrategyId;
    overrideSsiConfig();

    for (strategyIdx = 0; strategyIdx < ssiConfig.strategies.length; strategyIdx++) {
      strategy = ssiConfig.strategies[strategyIdx];
      if (strategy.cssStrategy === cssStrategy) {
        for (fileIdx = 0; fileIdx < strategy.requestCssFiles.length; fileIdx++) {
          file = strategy.requestCssFiles[fileIdx];
          path = ''; // reset path before concatenating
          for (hierarchyIdx = 0; hierarchyIdx < file.hierarchy.length; hierarchyIdx++) {
            key = file.hierarchy[hierarchyIdx];
            path += '/' + ssiConfig[key];
          }
          createLink(basePath + path + '/header-theme.css', file.id);
        }
      }
    }

    function setupStrategies() {
      selectedNginxStrategyId = ssiConfig.selectedNginxStrategyId;
      cssStrategy = ssiConfig.strategyMap[selectedNginxStrategyId];
    }

    function overrideSsiConfig() {
      var selectedOverrides = ssiConfig.testIssues ? 'overridesToTestIssues' : 'overrides';
      var overrides = ssiConfig[selectedOverrides]['nginxStrategyId' + selectedNginxStrategyId];
      if (overrides) {
        ssiConfig.group = overrides.group || ssiConfig.group;
        ssiConfig.instance = overrides.instance || ssiConfig.instance;
      }
    }

    function createLink(hrefLink, id) {
      var link = document.createElement('link');
      link.id = id;
      link.href = hrefLink;
      link.type = 'text/css';
      link.rel = 'stylesheet';

      link.onload = function() {
        console.log('link loaded: ' + id);
      };
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }
})();
