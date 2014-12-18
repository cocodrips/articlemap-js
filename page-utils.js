// Generated by CoffeeScript 1.6.3
(function() {
  this.pageUtils = {
    isGroup: function(pageSet) {
      return pageSet instanceof Array;
    },
    prioritySum: function(pageSets) {
      var i, s, _i, _ref;
      if (!pageUtils.isGroup(pageSets)) {
        return pageSets.priority;
      }
      s = 0;
      for (i = _i = 0, _ref = pageSets.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        s += pageUtils.prioritySum(pageSets[i]);
      }
      return s;
    },
    length: function(pageSets) {
      var i, s, _i, _ref;
      if (!pageUtils.isGroup(pageSets)) {
        return 1;
      }
      s = 0;
      for (i = _i = 0, _ref = pageSets.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        s += pageUtils.length(pageSets[i]);
      }
      return s;
    },
    avg: function(pageSets) {
      return pageUtils.prioritySum(pageSets) / pageUtils.length(pageSets);
    },
    max: function(pageSets) {
      var i, maxIndex, maxi, v, _i, _ref;
      maxi = 0;
      maxIndex = 0;
      for (i = _i = 0, _ref = pageSets.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        v = pageUtils.avg[pageSets[i]];
        if (maxi < v) {
          maxi = v;
          maxIndex = i;
        }
      }
      return pageSets[maxIndex];
    },
    sort: function(pageSets, reverse, key) {
      var i, _i, _ref, _results;
      if (reverse == null) {
        reverse = false;
      }
      if (key == null) {
        key = null;
      }
      if (!key) {
        key = function(a, b) {
          return pageUtils.prioritySum(a) < pageUtils.prioritySum(b);
        };
      }
      pageSets.sort(key);
      _results = [];
      for (i = _i = 0, _ref = pageSets.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (pageUtils.isGroup(pageSets[i])) {
          _results.push(pageUtils.sort(pageSets[i], reverse, key));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    new_sets: function(pageSets, target) {
      var pageSet;
      if (!pageUtils.isGroup(pageSets)) {
        return pageSets;
      }
      return (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = pageSets.length; _i < _len; _i++) {
          pageSet = pageSets[_i];
          if (target !== pageSet) {
            _results.push(pageUtils.new_sets(pageSet));
          }
        }
        return _results;
      })();
    },
    idealSum: function(pageSets) {
      var i, s, _i, _ref;
      if (!pageUtils.isGroup(pageSets)) {
        return pageSets.idealArea;
      }
      s = 0;
      for (i = _i = 0, _ref = pageSets.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        s += pageUtils.idealSum(pageSets[i]);
      }
      return s;
    },
    grouping: function(pageSets, range) {
      var base, group, groups, pageSet, pages, rectType, top;
      if (range == null) {
        range = 1.3;
      }
      pageSets = [].concat(pageSets);
      top = pageSets.pop();
      groups = [[top]];
      for (rectType in rectTypes) {
        pages = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = pageSets.length; _i < _len; _i++) {
            pageSet = pageSets[_i];
            if (pageSet.type === rectType) {
              _results.push(pageSet);
            }
          }
          return _results;
        })();
        pageUtils.sort(pages);
        while (pages.length > 0) {
          base = pages.pop();
          group = [base];
          if (pages.length > 0 && pages[pages.length - 1].priority <= Math.ceil(base.priority * range)) {
            group.push(pages.pop());
          }
          groups.push(group);
        }
      }
      return groups;
    },
    getOptimumSet: function(pageSets, rect) {
      var dict, i, match, optimumSet, s, _i;
      s = rect.area;
      match = Infinity | 1000000000000;
      optimumSet = null;
      for (i = _i = 1; _i <= 4; i = ++_i) {
        dict = pageUtils.combination(pageSets, i, s, match, optimumSet);
        match = dict.match;
        optimumSet = dict.optimumSet;
      }
      return optimumSet;
    },
    combination: function(pageSets, n, s, match, optimumSet) {
      var areaSum, pageSet, _i, _len, _ref;
      if (pageSets.length < n) {
        return {
          "match": match,
          "optimumSet": optimumSet
        };
      }
      _ref = pageUtils.nCombination(pageSets, n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pageSet = _ref[_i];
        areaSum = pageUtils.sum(pageSet, function(x) {
          return pageUtils.idealSum(x);
        });
        if (Math.abs(s - areaSum) < Math.abs(s - match)) {
          optimumSet = pageSet;
          match = areaSum;
        }
      }
      return {
        "match": match,
        "optimumSet": optimumSet
      };
    },
    nCombination: function(sets, n) {
      var c, combs, head, i, j, tailcombs, _i, _j, _ref, _ref1;
      if (sets.length < n || n <= 0) {
        return [];
      }
      if (sets.length === n) {
        return [sets];
      }
      if (n === 1) {
        return (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = sets.length; _i < _len; _i++) {
            c = sets[_i];
            _results.push(c);
          }
          return _results;
        })();
      }
      combs = [];
      for (i = _i = 0, _ref = sets.length - n + 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        head = sets.slice(i, i + 1);
        tailcombs = pageUtils.nCombination(sets.slice(i + 1), n - 1);
        for (j = _j = 0, _ref1 = tailcombs.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          combs.push(head.concat(tailcombs[j]));
        }
      }
      return combs;
    },
    deformPriorities: function(pageSets, area, min_width, min_height) {
      var areaMin, page, pageSet, prioritySum, x, _i, _len, _results;
      prioritySum = pageUtils.prioritySum(pageSets);
      areaMin = min_height * min_height;
      x = (area / areaMin) / prioritySum;
      _results = [];
      for (_i = 0, _len = pageSets.length; _i < _len; _i++) {
        pageSet = pageSets[_i];
        if (pageUtils.isGroup(pageSet)) {
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = pageSet.length; _j < _len1; _j++) {
              page = pageSet[_j];
              _results1.push(page.priority = Math.ceil(x * page.priority));
            }
            return _results1;
          })());
        } else {
          _results.push(pageSet.priority = Math.ceil(x * pageSet.priority));
        }
      }
      return _results;
    },
    debug: function(pageSets) {
      var pageSet;
      if (!pageUtils.isGroup(pageSets)) {
        return pageSets.priority;
      }
      return (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = pageSets.length; _i < _len; _i++) {
          pageSet = pageSets[_i];
          _results.push(pageUtils.debug(pageSet));
        }
        return _results;
      })();
    },
    sum: function(array, f) {
      var a, s, _i, _len;
      if (f == null) {
        f = null;
      }
      if (!f) {
        f = function(x) {
          return x;
        };
      }
      s = 0;
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        a = array[_i];
        s += f(a);
      }
      return s;
    },
    diffRatio: function(rect, rectType) {
      var minRatio, ratio, t, _i, _len, _ref;
      minRatio = 10000;
      _ref = rectTypes[rectType];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        ratio = rect.width / rect.height;
        console.log(t.ratio < ratio ? ratio / t.ratio : t.ratio / ratio);
        minRatio = Math.min(minRatio, t.ratio < ratio ? ratio / t.ratio : t.ratio / ratio);
      }
      return minRatio;
    }
  };

}).call(this);
