DEFAULT_WIDTH = 500
DEFAULT_HEIGHT = 500
class @Base
  constructor: (data = null, @pageSets = null, @width = DEFAULT_WIDTH, @height = DEFAULT_HEIGHT, @minWidth = 100, @minHeight = 60) ->
    if !pageSets
      @pageSets = @createPageSets(data)
    @layoutOrder = []

  createPageSets: (data) ->
    return (new Page(d.priority, d.type, d.name) for d in data)

  setIdealArea: (pageSets) ->
    prioritySum = pageUtils.prioritySum(pageSets)
    area = @width * @height

    @calcIdealArea(pageSets, area, prioritySum)

  calcIdealArea: (pageSets, area, prioritySum) ->
    if !pageUtils.isGroup(pageSets)
      pageSets.idealArea = pageSets.priority * area / prioritySum
    else
      for pageSet in pageSets
        @calcIdealArea(pageSet, area, prioritySum)

  newSets: (pageSets, targets) ->
    if !pageUtils.isGroup(target)
      targets = [targets]

    for target in targets
      @layoutOrder.push(target)

    sets = []
    for pageSet in pageSets
      isSame = false
      for target in targets
        if target == pageSet
          isSame = true
          break
      if !isSame
        sets.push(pageSet)
    return sets
