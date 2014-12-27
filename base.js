// Generated by CoffeeScript 1.6.3
(function() {
  var DEFAULT_HEIGHT, DEFAULT_WIDTH;

  DEFAULT_WIDTH = 500;

  DEFAULT_HEIGHT = 500;

  this.Base = (function() {
    function Base(data, width, height, min_width, min_height, pageSets) {
      if (data == null) {
        data = null;
      }
      this.width = width != null ? width : DEFAULT_WIDTH;
      this.height = height != null ? height : DEFAULT_HEIGHT;
      this.min_width = min_width != null ? min_width : 100;
      this.min_height = min_height != null ? min_height : 60;
      this.pageSets = pageSets != null ? pageSets : null;
      if (!pageSets) {
        this.pageSets = this.createPageSets(data);
      }
      this.layoutOrder = [];
    }

    Base.prototype.createPageSets = function(data) {
      var d;
      return (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          d = data[_i];
          _results.push(new Page(d.priority, d.type, d.name));
        }
        return _results;
      })();
    };

    Base.prototype.setIdealArea = function(pageSets) {
      var area, prioritySum;
      prioritySum = pageUtils.prioritySum(pageSets);
      area = this.width * this.height;
      return this.calcIdealArea(pageSets, area, prioritySum);
    };

    Base.prototype.calcIdealArea = function(pageSets, area, prioritySum) {
      var pageSet, _i, _len, _results;
      if (!pageUtils.isGroup(pageSets)) {
        return pageSets.idealArea = pageSets.priority * area / prioritySum;
      } else {
        _results = [];
        for (_i = 0, _len = pageSets.length; _i < _len; _i++) {
          pageSet = pageSets[_i];
          _results.push(this.calcIdealArea(pageSet, area, prioritySum));
        }
        return _results;
      }
    };

    Base.prototype.newSets = function(pageSets, targets) {
      var isSame, pageSet, sets, target, _i, _j, _k, _len, _len1, _len2;
      if (!pageUtils.isGroup(target)) {
        targets = [targets];
      }
      for (_i = 0, _len = targets.length; _i < _len; _i++) {
        target = targets[_i];
        this.layoutOrder.push(target);
      }
      sets = [];
      for (_j = 0, _len1 = pageSets.length; _j < _len1; _j++) {
        pageSet = pageSets[_j];
        isSame = false;
        for (_k = 0, _len2 = targets.length; _k < _len2; _k++) {
          target = targets[_k];
          if (target === pageSet) {
            isSame = true;
            break;
          }
        }
        if (!isSame) {
          sets.push(pageSet);
        }
      }
      return sets;
    };

    return Base;

  })();

}).call(this);
