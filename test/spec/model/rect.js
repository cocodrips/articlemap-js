// Generated by CoffeeScript 1.6.3
(function() {
  describe("model/rect", function() {
    beforeEach(function() {
      return this.rect = new Rect(100, 200, 300, 400);
    });
    it("initialize", function() {
      var rect;
      expect(this.rect.y).toEqual(200);
      rect = new Rect();
      return expect(rect.x).toEqual(0);
    });
    it("area", function() {
      return expect(this.rect.area()).toEqual(120000);
    });
    describe("isEqual function", function() {
      it("equal", function() {
        var rect_1, rect_2;
        rect_1 = new Rect(100, 100);
        rect_2 = new Rect(100, 100);
        return expect(rect_1.isEqual(rect_2)).toBe(true);
      });
      return it("not equal", function() {
        var rect_1, rect_2;
        rect_1 = new Rect(100, 100);
        rect_2 = new Rect(200, 100);
        return expect(rect_1.isEqual(rect_2)).toBe(false);
      });
    });
    return it("copy", function() {
      var copy;
      copy = this.rect.copy();
      expect(copy === this.rect).toBeFalsy();
      return expect(copy.isEqual(this.rect)).toBeTruthy();
    });
  });

}).call(this);
