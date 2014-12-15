describe "model/rect_type", ()->
  it "rectTypes", () ->
    expect(rectTypes["image"].length).toEqual(4)
    expect(rectTypes["image"][0].min_align).toEqual(1)
