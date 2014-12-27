describe "page-utils", () ->
  beforeEach () ->
    @pageSets = [new Page(1, "text"), new Page(2, "text"), [new Page(3, "image")]]
    @pageSets2 = [new Page(10, "text"), new Page(2, "text"),
                  [new Page(3, "image")],
                  [new Page(2, "text"), new Page(2, "text")]]
    @flatSets = [new Page(1, "text"), new Page(2, "text"), new Page(5, "text"),
                 new Page(10, "text"), new Page(11, "text"), new Page(20, "text"),
                 new Page(30, "image"), new Page(32, "image"), new Page(45, "image")]

    @hierarchicalSets = [[new Page(1, "text"), new Page(2, "text")], [new Page(5, "text")],
                         [new Page(10, "text"), new Page(11, "text")], [new Page(20, "text")],
                         [new Page(30, "image"), new Page(32, "image")], [new Page(45, "image")]]

    for page in @flatSets
      page.idealArea = page.priority

    for pageSets in @hierarchicalSets
      for page in pageSets
        page.idealArea = page.priority

  it "isGroup", () ->
    a = [1, 2, 3]
    d = {hello: 10}
    expect(pageUtils.isGroup(a)).toBe(true)
    expect(pageUtils.isGroup(d)).toBe(false)

  it "prioritySum", () ->
    expect(pageUtils.prioritySum(@pageSets)).toEqual(6)
    expect(pageUtils.prioritySum(@flatSets)).toEqual(156)

  it "length", () ->
    expect(pageUtils.length(@pageSets)).toEqual(3)
    expect(pageUtils.length(@pageSets2)).toEqual(5)

  it "max", () ->
    expect(pageUtils.max(@pageSets2)).toEqual(@pageSets2[0])
    target = new Page(10, "text")
    expect(pageUtils.max(target)).toEqual(target)

  it "sort", () ->
    pageUtils.sort(@pageSets2)
    expect(@pageSets2[2][0].priority).toEqual(2)

    sortset = [new Page(10, "text"), new Page(4, "text"), new Page(9, "text")]

    pageUtils.sort(sortset, reverse = false)
    expect(sortset[0].originalPriority).toEqual(4)

    pageUtils.sort(sortset, reverse = true)
    expect(sortset[0].originalPriority).toEqual(10)

  it "grouping", () ->
    target = pageUtils.grouping(@flatSets)
    expect(target[4][0].priority).toEqual(5)
#
#    console.log target
#    console.log "grouping"
#    for t in target
#      console.log (tt.priority for tt in t)

  it "getOptimumSet", () ->
    target = pageUtils.getOptimumSet(@hierarchicalSets, new Rect(0, 0, 1, 8))
    expect(target.length).toEqual(2)
    expect(target[1][0].priority).toEqual(5)


  it "combination", () ->
    target = pageUtils.combination(@flatSets, 2, 25, 100000, [])
    expect(target.optimumSet[1].priority).toEqual(20)

  it "nCombination", () ->
    target = pageUtils.nCombination([1, 2, 3, 4], 2)
    expect(target.length).toEqual(6)
    expect(target[5][1]).toEqual(4)

    target = pageUtils.nCombination(@hierarchicalSets, 2)


  it "prioritySum", () ->
    target = pageUtils.sum([1, 2, 3])
    expect(target).toEqual(6)
    target = pageUtils.sum(@flatSets, (x) ->
      return x.priority
    )
    expect(target).toEqual(156)

  it "deformPriorities", () ->
    pageUtils.deformPriorities(@flatSets, 100, 2, 2)
    expect(@flatSets[8].priority).toEqual(8)

  it "diffRatio", () ->
    expect(pageUtils.diffRatio(new Rect(0, 0, 100, 120), "text")).toEqual(1.2)

  it "isFlat", () ->
    expect(pageUtils.isFlat(@pageSets)).toBeFalsy()
    expect(pageUtils.isFlat(@flatSets)).toBeTruthy()