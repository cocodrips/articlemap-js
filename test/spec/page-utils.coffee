describe "page-utils", () ->
  beforeEach () ->
    @pageSets = [new Page(1, "text"), new Page(2, "text"), [new Page(3, "image")]]
    @pageSets2 = [new Page(10, "text"), new Page(2, "text"),
                    [new Page(3, "image")],
                    [new Page(2, "text"), new Page(2, "text")]]
    @flatSets = [new Page(1, "text"), new Page(2, "text"), new Page(5, "text"),
                  new Page(10, "text"), new Page(11, "text"), new Page(20, "text"),
                  new Page(30, "image"), new Page(32, "image"), new Page(45, "image")]
    for page in @flatSets
      page.idealArea = page.priority

  it "isGroup", () ->
    a = [1, 2, 3]
    d = {hello: 10}
    expect(pageUtils.isGroup(a)).toBe(true)
    expect(pageUtils.isGroup(d)).toBe(false)

  it "prioritySum", () ->
    expect(pageUtils.prioritySum(@pageSets)).toEqual(6)

  it "length", () ->
    expect(pageUtils.length(@pageSets)).toEqual(3)
    expect(pageUtils.length(@pageSets2)).toEqual(5)

  it "maxi", () ->
    expect(pageUtils.max(@pageSets2)).toEqual(@pageSets2[0])

  it "sort", () ->
    pageUtils.sort(@pageSets2)
    expect(@pageSets2[2][0].priority).toEqual(3)

  it "newSets", () ->
    target = pageUtils.new_sets(@pageSets, @pageSets[0])
    expect(target[0]).toEqual(@pageSets[1])

  it "grouping", () ->
    target = pageUtils.grouping(@flatSets)
    expect(target[4][1].priority).toEqual(11)

  it "getOptimumSet", () ->
    target = pageUtils.getOptimumSet(@flatSets, new Rect(0, 0, 1, 8))
    expect(target.length).toEqual(3)
    expect(target[2].priority).toEqual(5)

  it "combination", () ->
    target = pageUtils.combination(@flatSets, 2, 25, 100000, [])
    expect(target.optimumSet[1].priority).toEqual(20)

  it "nCombination", () ->
    target = pageUtils.nCombination([1, 2, 3, 4], 2)
    expect(target.length).toEqual(6)
    expect(target[5][1]).toEqual(4)

  it "prioritySum", () ->
    target = pageUtils.sum([1,2,3])
    expect(target).toEqual(6)
    target = pageUtils.sum(@flatSets, (x) ->
      return x.priority
    )
    expect(target).toEqual(156)

  it "deformPriorities", () ->
    pageUtils.deformPriorities(@flatSets, 100, 2, 2)
    expect(@flatSets[8].priority).toEqual(8)

