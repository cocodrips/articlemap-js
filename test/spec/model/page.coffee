describe "model/page", ()->
  it "Create page object", () ->
    page = new Page(10, "image")
    expect(page.originalPriority).toEqual(10)
    expect(page.type).toEqual("image")
    expect(page.name).toBe(null)

  describe "isEqual function", () ->
    page_1 = new Page(10, "image")
    page_2 = new Page(10, "image")

    it "Equal", () ->
      page_1_2 = page_1
      expect(page_1.isEqual(page_1_2)).toBe(true)

    it "Not equal", () ->
      expect(page_1.isEqual(page_2)).toBe(false)

