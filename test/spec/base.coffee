describe "base", () ->
  beforeEach () ->
    @d =
      [
        {
          priority: 10
          type: "image"
        }
        {
          priority: 20
          type: "text"
        }
      ]
    @base = new Base(@d, 500, 500)

  it "initialize", () ->
    expect(@base.pageSets[1].originalPriority).toEqual(20)
    expect(@base.pageSets[0].type).toEqual(@d[0].type)

  it "setIdealArea", () ->
    @base.setIdealArea(@base.pageSets)
    expect(@base.pageSets[0].idealArea > (500 * 500 - 1) / 3).toBeTruthy()

  it "newSets", () ->
    target = @base.newSets(@base.pageSets, @base.pageSets[0])
    expect(target[0]).toEqual(@base.pageSets[1])
