describe "model/rect", ()->
  beforeEach () ->
    @rect = new Rect(100, 200, 300, 400)

  it "initialize", () ->
    expect(@rect.y).toEqual(200)
    rect = new Rect()
    expect(rect.x).toEqual(0)

  describe "isEqual function", () ->
    it "equal", () ->
      rect_1 = new Rect(100, 100)
      rect_2 = new Rect(100, 100)
      expect(rect_1.isEqual(rect_2)).toBe(true)

    it "not equal", () ->
      rect_1 = new Rect(100, 100)
      rect_2 = new Rect(200, 100)
      expect(rect_1.isEqual(rect_2)).toBe(false)
