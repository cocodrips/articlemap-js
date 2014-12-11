describe "model/rect_type", ()->
  it "rect_types", () ->
    expect(rect_types["image"].length).toEqual(4)
    expect(rect_types["image"][0].min_align).toEqual(1)
