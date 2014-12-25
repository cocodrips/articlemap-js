// Generated by CoffeeScript 1.6.3
(function() {
  describe("page-utils", function() {
    beforeEach(function() {
      var page, pageSets, _i, _j, _len, _len1, _ref, _ref1, _results;
      this.pageSets = [new Page(1, "text"), new Page(2, "text"), [new Page(3, "image")]];
      this.pageSets2 = [new Page(10, "text"), new Page(2, "text"), [new Page(3, "image")], [new Page(2, "text"), new Page(2, "text")]];
      this.flatSets = [new Page(1, "text"), new Page(2, "text"), new Page(5, "text"), new Page(10, "text"), new Page(11, "text"), new Page(20, "text"), new Page(30, "image"), new Page(32, "image"), new Page(45, "image")];
      this.hierarchicalSets = [[new Page(1, "text"), new Page(2, "text")], [new Page(5, "text")], [new Page(10, "text"), new Page(11, "text")], [new Page(20, "text")], [new Page(30, "image"), new Page(32, "image")], [new Page(45, "image")]];
      _ref = this.flatSets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        page = _ref[_i];
        page.idealArea = page.priority;
      }
      _ref1 = this.hierarchicalSets;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        pageSets = _ref1[_j];
        _results.push((function() {
          var _k, _len2, _results1;
          _results1 = [];
          for (_k = 0, _len2 = pageSets.length; _k < _len2; _k++) {
            page = pageSets[_k];
            _results1.push(page.idealArea = page.priority);
          }
          return _results1;
        })());
      }
      return _results;
    });
    it("isGroup", function() {
      var a, d;
      a = [1, 2, 3];
      d = {
        hello: 10
      };
      expect(pageUtils.isGroup(a)).toBe(true);
      return expect(pageUtils.isGroup(d)).toBe(false);
    });
    it("prioritySum", function() {
      expect(pageUtils.prioritySum(this.pageSets)).toEqual(6);
      return expect(pageUtils.prioritySum(this.flatSets)).toEqual(156);
    });
    it("length", function() {
      expect(pageUtils.length(this.pageSets)).toEqual(3);
      return expect(pageUtils.length(this.pageSets2)).toEqual(5);
    });
    it("max", function() {
      var target;
      expect(pageUtils.max(this.pageSets2)).toEqual(this.pageSets2[0]);
      target = new Page(10, "text");
      return expect(pageUtils.max(target)).toEqual(target);
    });
    it("sort", function() {
      var reverse, sortset;
      pageUtils.sort(this.pageSets2);
      expect(this.pageSets2[2][0].priority).toEqual(2);
      sortset = [new Page(10, "text"), new Page(4, "text"), new Page(9, "text")];
      pageUtils.sort(sortset, reverse = false);
      expect(sortset[0].originalPriority).toEqual(4);
      pageUtils.sort(sortset, reverse = true);
      return expect(sortset[0].originalPriority).toEqual(10);
    });
    it("newSets", function() {
      var target;
      console.log(this.pageSets);
      target = pageUtils.newSets(this.pageSets, this.pageSets[0]);
      console.log(target);
      return expect(target[0]).toEqual(this.pageSets[1]);
    });
    it("grouping", function() {
      var t, target, tt, _i, _len, _results;
      target = pageUtils.grouping(this.flatSets);
      expect(target[4][0].priority).toEqual(5);
      console.log(target);
      console.log("grouping");
      _results = [];
      for (_i = 0, _len = target.length; _i < _len; _i++) {
        t = target[_i];
        _results.push(console.log((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = t.length; _j < _len1; _j++) {
            tt = t[_j];
            _results1.push(tt.priority);
          }
          return _results1;
        })()));
      }
      return _results;
    });
    it("getOptimumSet", function() {
      var target;
      target = pageUtils.getOptimumSet(this.hierarchicalSets, new Rect(0, 0, 1, 8));
      expect(target.length).toEqual(2);
      return expect(target[1][0].priority).toEqual(5);
    });
    it("combination", function() {
      var target;
      target = pageUtils.combination(this.flatSets, 2, 25, 100000, []);
      return expect(target.optimumSet[1].priority).toEqual(20);
    });
    it("nCombination", function() {
      var target;
      target = pageUtils.nCombination([1, 2, 3, 4], 2);
      expect(target.length).toEqual(6);
      expect(target[5][1]).toEqual(4);
      return target = pageUtils.nCombination(this.hierarchicalSets, 2);
    });
    it("prioritySum", function() {
      var target;
      target = pageUtils.sum([1, 2, 3]);
      expect(target).toEqual(6);
      target = pageUtils.sum(this.flatSets, function(x) {
        return x.priority;
      });
      return expect(target).toEqual(156);
    });
    it("deformPriorities", function() {
      pageUtils.deformPriorities(this.flatSets, 100, 2, 2);
      return expect(this.flatSets[8].priority).toEqual(8);
    });
    it("diffRatio", function() {
      return expect(pageUtils.diffRatio(new Rect(0, 0, 100, 120), "text")).toEqual(1.2);
    });
    return it("isFlat", function() {
      expect(pageUtils.isFlat(this.pageSets)).toBeFalsy();
      return expect(pageUtils.isFlat(this.flatSets)).toBeTruthy();
    });
  });

}).call(this);
