// Generated by CoffeeScript 1.6.3
(function() {
  describe("base", function() {
    beforeEach(function() {
      this.d = [
        {
          priority: 10,
          type: "image"
        }, {
          priority: 20,
          type: "text"
        }
      ];
      return this.base = new Base(this.d, null, 500, 500);
    });
    it("initialize", function() {
      expect(this.base.pageSets[1].originalPriority).toEqual(20);
      return expect(this.base.pageSets[0].type).toEqual(this.d[0].type);
    });
    it("setIdealArea", function() {
      this.base.setIdealArea(this.base.pageSets);
      return expect(this.base.pageSets[0].idealArea > (500 * 500 - 1) / 3).toBeTruthy();
    });
    return it("newSets", function() {
      var target;
      target = this.base.newSets(this.base.pageSets, this.base.pageSets[0]);
      return expect(target[0]).toEqual(this.base.pageSets[1]);
    });
  });

}).call(this);
