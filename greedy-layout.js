// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GreedyLayout = (function(_super) {
    __extends(GreedyLayout, _super);

    function GreedyLayout() {
      _ref = GreedyLayout.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GreedyLayout.prototype.layout = function() {
      var groupSets;
      pageUtils.sort(this.pageSets);
      groupSets = pageUtils.grouping(this.pageSets);
      pageUtils.deformPriorities(groupSets, this.width * this.height, this.min_width, this.min_height);
      this.setIdealArea(groupSets);
      pageUtils.sort(groupSets, true, pageUtils.avg);
      return this.arrange(groupSets, new Rect(0, 0, this.width, this.height));
    };

    GreedyLayout.prototype.arrange = function(pageSets, rect) {
      if (pageSets.length < 1) {

      } else if (pageSets.length < 3) {
        return this.split(pageSets, rect);
      } else {
        return this.arrangeTopLeft(pageSets, rect);
      }
    };

    GreedyLayout.prototype.split = function(pageSets, rect) {
      var diff, horizontalRect, horizontalRects, i, isVertical, minDiff, ratioType, verticalRect, verticalRects, _i, _j, _len, _len1;
      verticalRects = this.splitPageSetsArea(pageSets, rect, true, false);
      diff = 0;
      for (i = _i = 0, _len = verticalRects.length; _i < _len; i = ++_i) {
        verticalRect = verticalRects[i];
        ratioType = pageUtils.isGroup(pageSets[i]) ? pageSets[i][0].type : pageSets[i].type;
        diff += pageUtils.diffRatio(verticalRect, ratioType);
      }
      console.log("横", verticalRects, diff);
      minDiff = diff;
      isVertical = true;
      horizontalRects = this.splitPageSetsArea(pageSets, rect, false, false);
      diff = 0;
      for (i = _j = 0, _len1 = horizontalRects.length; _j < _len1; i = ++_j) {
        horizontalRect = horizontalRects[i];
        ratioType = pageUtils.isGroup(pageSets[i]) ? pageSets[i][0].type : pageSets[i].type;
        diff += pageUtils.diffRatio(horizontalRect, ratioType);
      }
      console.log("縦", horizontalRects, diff);
      if (diff < minDiff) {
        isVertical = false;
      }
      return this.splitPageSetsArea(pageSets, rect, isVertical, true);
    };

    GreedyLayout.prototype.arrangeTopLeft = function(pageSets, rect) {
      var bottomSetsRect, d, idealArea, isVertical, minDiff, optimalSets, optimalTopRect, rectType, remainingRect, remainingSets, target, tops, width, _i, _j, _len, _len1, _ref1;
      tops = pageUtils.max(pageSets);
      remainingSets = this.newSets(pageSets, tops);
      optimalTopRect = null;
      optimalSets = [];
      minDiff = 100000000000000;
      idealArea = pageUtils.idealSum(tops);
      isVertical = false;
      _ref1 = rectTypes[tops[0].type];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        rectType = _ref1[_i];
        if (tops.length < rectType.minAlign) {
          continue;
        }
        d = this.fixTopLeftRect(remainingSets, rect, idealArea, rectType.ratio / tops.length);
        if (d.diff < minDiff) {
          minDiff = d.diff;
          optimalTopRect = d.topRect;
          optimalSets = d.pageSets;
          isVertical = true;
        }
        d = this.fixTopLeftRect(remainingSets, rect, idealArea, rectType.ratio * tops.length);
        if (d.diff < minDiff) {
          minDiff = d.diff;
          optimalTopRect = d.topRect;
          optimalSets = d.pageSets;
          isVertical = false;
        }
      }
      width = (pageUtils.idealSum(tops) + pageUtils.idealSum(optimalSets)) / rect.height;
      optimalTopRect.height = optimalTopRect.area() / width;
      optimalTopRect.width = width;
      bottomSetsRect = this.bottomRect(rect, optimalTopRect);
      remainingRect = rect.copy();
      remainingRect.x += width;
      remainingRect.width -= width;
      for (_j = 0, _len1 = optimalSets.length; _j < _len1; _j++) {
        target = optimalSets[_j];
        remainingSets = this.newSets(remainingSets, target);
      }
      this.split(tops, optimalTopRect);
      this.arrange(optimalSets, bottomSetsRect);
      return this.arrange(remainingSets, remainingRect);
    };

    GreedyLayout.prototype.fixTopLeftRect = function(remainingSets, parentRect, idealArea, ratio) {
      var bottomRect, diff_dict, topRect;
      topRect = parentRect.copy();
      topRect.height = Math.sqrt(idealArea / ratio);
      topRect.width = ratio * topRect.height;
      if (parentRect.height - topRect.height < this.minHeight) {
        topRect.height = parentRect.height;
        topRect.width = idealArea / topRect.height;
      }
      if (parentRect.width - topRect.width < this.minWidth) {
        topRect.height = idealArea / topRect.width;
        topRect.width = parentRect.width;
      }
      bottomRect = this.bottomRect(parentRect, topRect);
      diff_dict = this.diffFromIdealArea(remainingSets, bottomRect);
      diff_dict['topRect'] = topRect;
      return diff_dict;
    };

    GreedyLayout.prototype.diffFromIdealArea = function(remainingSets, bottomRect) {
      var bottomSets, closest_area;
      bottomSets = pageUtils.getOptimumSet(remainingSets, bottomRect);
      closest_area = pageUtils.idealSum(bottomSets);
      return {
        diff: Math.abs(bottomRect.area() - closest_area),
        pageSets: bottomSets
      };
    };

    GreedyLayout.prototype.bottomRect = function(parentRect, topRect) {
      return new Rect(parentRect.x, parentRect.y + topRect.height, topRect.width, parentRect.height - topRect.height);
    };

    GreedyLayout.prototype.splitPageSetsArea = function(pageSets, rect, isVertical, fix) {
      var idealSum, isFlat, page, pageRect, tmpRect, tmpRects, _i, _len;
      if (isVertical == null) {
        isVertical = true;
      }
      if (fix == null) {
        fix = true;
      }
      idealSum = pageUtils.idealSum(pageSets);
      isFlat = pageUtils.isFlat(pageSets);
      tmpRect = rect.copy();
      tmpRects = [];
      if (isFlat) {
        if (isVertical) {
          tmpRect.height = rect.height / pageSets.length;
        }
        if (!isVertical) {
          tmpRect.width = rect.width / pageSets.length;
        }
      }
      for (_i = 0, _len = pageSets.length; _i < _len; _i++) {
        page = pageSets[_i];
        if (!isFlat) {
          if (isVertical) {
            tmpRect.height = rect.height * (pageUtils.idealSum(page) / idealSum);
          }
          if (!isVertical) {
            tmpRect.width = rect.width * (pageUtils.idealSum(page) / idealSum);
          }
        }
        pageRect = tmpRect.copy();
        if (isVertical) {
          tmpRect.y += tmpRect.height;
        }
        if (!isVertical) {
          tmpRect.x += tmpRect.width;
        }
        if (!fix) {
          tmpRects.push(pageRect);
          continue;
        }
        if (pageUtils.isGroup(page)) {
          this.arrange(page, pageRect);
        } else {
          page.rect = pageRect;
        }
      }
      return tmpRects;
    };

    return GreedyLayout;

  })(Base);

}).call(this);
