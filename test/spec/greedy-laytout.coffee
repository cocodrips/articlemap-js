describe "page-utils", () ->
  beforeEach () ->
    @d =
      [
        {
          priority: 10
          type: "text"
        }
        {
          priority: 11
          type: "text"
        }
        {
          priority: 20
          type: "text"
        }
      ]
    @layout = new GreedyLayout(@d, 500, 600)

  it "layout", () ->
    @layout.layout()
