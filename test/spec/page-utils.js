// Generated by CoffeeScript 1.6.3
(function() {
  describe("page-utils", function() {
    beforeEach(function() {
      this.pageSets = [new Page(1, "text"), new Page(2, "text"), [new Page(3, "image")]];
      this.pageSets2 = [new Page(10, "text"), new Page(2, "text"), [new Page(3, "image")], [new Page(2, "text"), new Page(2, "text")]];
      return this.flatSets = [new Page(1, "text"), new Page(2, "text"), new Page(5, "text"), new Page(10, "text"), new Page(11, "text"), new Page(20, "text"), new Page(30, "image"), new Page(32, "image"), new Page(45, "image")];
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
      return expect(pageUtils.prioritySum(this.pageSets)).toEqual(6);
    });
    it("length", function() {
      expect(pageUtils.length(this.pageSets)).toEqual(3);
      return expect(pageUtils.length(this.pageSets2)).toEqual(5);
    });
    it("maxi", function() {
      return expect(pageUtils.max(this.pageSets2)).toEqual(this.pageSets2[0]);
    });
    it("sort", function() {
      pageUtils.sort(this.pageSets2);
      return expect(this.pageSets2[2][0].priority).toEqual(3);
    });
    it("new_sets", function() {
      var target;
      target = pageUtils.new_sets(this.pageSets, this.pageSets[0]);
      return expect(target[0]).toEqual(this.pageSets[1]);
    });
    it("grouping", function() {
      var target;
      target = pageUtils.grouping(this.flatSets);
      return expect(target[4][1].priority).toEqual(11);
    });
    it("combination", function() {
      var page, target, _i, _len, _ref;
      _ref = this.flatSets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        page = _ref[_i];
        page.idealArea = page.priority;
      }
      target = pageUtils.combination(this.flatSets, 2, 25, 100000, []);
      return expect(target.optimumSet[1].priority).toEqual(20);
    });
    it("nCombination", function() {
      var target;
      target = pageUtils.nCombination([1, 2, 3, 4], 2);
      expect(target.length).toEqual(6);
      return expect(target[5][1]).toEqual(4);
    });
    return it("prioritySum", function() {
      var target;
      target = pageUtils.sum([1, 2, 3]);
      expect(target).toEqual(6);
      target = pageUtils.sum(this.flatSets, function(x) {
        return x.priority;
      });
      return expect(target).toEqual(156);
    });
  });

}).call(this);
