function NgGridFlexibleHeightPlugin(opts) {
  var self = this;
  self.grid = null;
  self.scope = null;
  self.init = function(scope, grid) {
    self.grid = grid;
    self.scope = scope;
    var recalcHeightForData = function() {
      setTimeout(innerRecalcForData, 1);
    };
    var innerRecalcForData = function() {
      var gridId = self.grid.gridId;
      var footerPanelSel = '.' + gridId + ' .ngFooterPanel';
      var extraHeight = self.grid.$topPanel.height() + $(footerPanelSel).height();
      var naturalHeight = self.grid.$canvas.height();
      if (scope.baseViewportHeight == null || scope.baseViewportHeight === 0) {
        scope.baseViewportHeight = self.grid.$viewport.height();
      }
      // if (scope.baseViewportHeight > naturalHeight) {
      if (opts != null) {
        if (opts.minHeight != null && (naturalHeight + extraHeight) < opts.minHeight) {
          naturalHeight = opts.minHeight - extraHeight;
        }
      }
      self.grid.$viewport.hide();
      self.grid.$viewport.css('height', (naturalHeight + 15) + 'px');
      self.grid.$root.css('height', (naturalHeight + extraHeight + 15) + 'px');
      self.grid.rootDim.outerHeight = (naturalHeight + extraHeight + 15)
      if (scope.baseViewportHeight < naturalHeight) {
        //self.grid.$canvas.css('width', self.grid.$viewport.width());
        self.grid.$canvas.css('bottom-border', 'none');
        self.grid.configureColumnWidths();
        scope.adjustScrollTop(0, true);
        scope.baseViewportHeight = self.grid.$viewport.height();
      }
      // }
      self.grid.refreshDomSizes();
      setTimeout(function() {
        self.grid.$viewport.show();
      }, 1);
    };
    scope.catHashKeys = function() {
      var hash = '',
        idx;
      for (idx in scope.renderedRows) {
        hash += scope.renderedRows[idx].$$hashKey;
      }
      return hash;
    };
    scope.$watch('catHashKeys()', innerRecalcForData);
    scope.$watch(grid.config.data, recalcHeightForData);
  };
}