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

    @flatSets = [new Page(1, "text"), new Page(2, "text"), new Page(5, "text"),
                 new Page(10, "text"), new Page(11, "text"), new Page(20, "text"),
                 new Page(30, "image"), new Page(32, "image"), new Page(45, "image")]
    @hierarchicalSets = [[new Page(1, "text"), new Page(2, "text")], [new Page(5, "text")],
                         [new Page(10, "text"), new Page(11, "text")], [new Page(20, "text")],
                         [new Page(30, "image"), new Page(32, "image")], [new Page(45, "image")]]
    @layout = new GreedyLayout(pageSets = @flatSets)

  it "layout", () ->
    layout = new GreedyLayout(pageSets = @flatSets)
    layout.layout()

  it "arrange", () ->
    @layout.split = () -> return 1
    @layout.arrangeTopLeft = () -> return 2
    target = @layout.arrange([], new Rect(0, 0, 100, 100))
    expect(target).toBeUndefined()

    pageSets = [new Page(5, "text"), new Page(10, "text")]
    target = @layout.arrange(pageSets, new Rect(0, 0, 100, 100))
    expect(target).toEqual(1)

    pageSets.push(new Page(20, "image"))
    target = @layout.arrange(pageSets, new Rect(0, 0, 100, 100))
    expect(target).toEqual(2)

  it "diffFromIdealArea", () ->
    pageSets = [new Page(1, "text"), new Page(5, "text"), new Page(10, "text")]
    pageSets[0].idealArea = 10000
    pageSets[1].idealArea = 50000
    pageSets[2].idealArea = 100000
    bottom = new Rect(0, 0, 230, 300)
    d = @layout.diffFromIdealArea(pageSets, bottom)
    expect(d.diff).toEqual(9000)
    expect(d.pageSets[1].priority).toEqual(5)

    pageSets.pop()
    pageSets.pop()
    d = @layout.diffFromIdealArea(pageSets, bottom)
    expect(d.diff).toEqual(59000)
    expect(d.pageSets[0].priority).toEqual(1)

  it "bottomRect", () ->
    parent = new Rect(10, 20, 30, 40)
    top = new Rect(10, 20, 10, 20)
    bottom = new Rect(10, 40, 10, 20)
    target = @layout.bottomRect(parent, top)
    expect(target.isEqual(bottom)).toBeTruthy()

  it "splitPageSetsArea", () ->
    pages = [new Page(10, "text"), new Page(15, "text")]
    pages[0].idealArea = 10000
    pages[1].idealArea = 15000
    @layout.splitPageSetsArea(pages, new Rect(0, 0, 200, 200), true, true)
    expect(pages[1].rect.y).toEqual(100)
