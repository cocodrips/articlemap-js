describe "page-utils", () ->
  beforeEach () ->
    @flatSets = [new Page(1, "text"), new Page(2, "text"), new Page(5, "text")]
    for page in @flatSets
      page.rect = new Rect(0,0,10 * page.originalPriority, 100)
    @hillClimbing = new HillClimbing(null, @flatSets)

  it "evaluate", () ->
    target = @hillClimbing.evaluate(@flatSets)
    expect(target).toEqual(0.02077562326869806)



