describe "model/rect_type", ()->
  it "rectTypes", () ->
    expect(rectTypes["image"].length).toEqual(4)
    expect(rectTypes["image"][0].minAlign).toEqual(1)
