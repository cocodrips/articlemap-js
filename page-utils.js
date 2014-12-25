// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
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
      if (!pageUtils.isGroup(pageSets)) {
        return pageSets;
      }
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
      if (reverse == null) {
        reverse = false;
      }
      if (key == null) {
        key = null;
      }
      if (!key) {
        key = function(a, b) {
          return pageUtils.prioritySum(a) - pageUtils.prioritySum(b);
        };
      }
      pageSets.sort(key);
      if (reverse) {
        return pageSets.reverse();
      }
    },
    newSets: function(pageSets, targets) {
      var isSame, pageSet, sets, target, _i, _j, _len, _len1;
      if (!pageUtils.isGroup(target)) {
        targets = [targets];
      }
      sets = [];
      for (_i = 0, _len = pageSets.length; _i < _len; _i++) {
        pageSet = pageSets[_i];
        isSame = false;
        for (_j = 0, _len1 = targets.length; _j < _len1; _j++) {
          target = targets[_j];
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
      var base, group, groups, key, pageSet, pages, rectType, reverse, top;
      if (range == null) {
        range = 1.3;
      }
      pageSets = [].concat(pageSets);
      pageUtils.sort(pageSets);
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
        pageUtils.sort(pages, reverse = true);
        while (pages.length > 0) {
          base = pages.pop();
          group = [base];
          if (pages.length > 0 && pages[pages.length - 1].originalPriority <= Math.ceil(base.originalPriority * range)) {
            group.push(pages.pop());
          }
          groups.push(group);
        }
      }
      pageUtils.sort(groups, reverse = true, key = function(a, b) {
        return pageUtils.avg(a) - pageUtils.avg(b);
      });
      return groups;
    },
    getOptimumSet: function(pageSets, rect) {
      var i, idealSum, j, k, match, optimumSet, s, set, _i, _j, _ref, _ref1;
      s = Infinity;
      match = Infinity | 1000000000000;
      optimumSet = null;
      for (i = _i = 1, _ref = 1 << pageSets.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
        j = i;
        set = [];
        idealSum = 0;
        for (k = _j = 0, _ref1 = pageSets.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; k = 0 <= _ref1 ? ++_j : --_j) {
          if (j % 2 === 1) {
            idealSum += pageUtils.idealSum(pageSets[k]);
            set.push(pageSets[k]);
          }
          j = j >> 1;
        }
        if (Math.abs(rect.area() - idealSum) < s) {
          s = idealSum;
          optimumSet = set;
        }
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
    diffRatio: function(rect, rectType) {
      var minRatio, ratio, t, _i, _len, _ref;
      minRatio = 10000;
      _ref = rectTypes[rectType];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        ratio = rect.width / rect.height;
        minRatio = Math.min(minRatio, t.ratio < ratio ? ratio / t.ratio : t.ratio / ratio);
      }
      return minRatio;
    },
    isFlat: function(pageSets) {
      var page, _i, _len;
      for (_i = 0, _len = pageSets.length; _i < _len; _i++) {
        page = pageSets[_i];
        if (pageUtils.isGroup(page)) {
          return false;
        }
      }
      return true;
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
    }
  };

}).call(this);
