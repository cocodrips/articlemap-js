DEFAULT_WIDTH = 500
DEFAULT_HEIGHT = 500
class @Base
  constructor: (data, @width = DEFAULT_WIDTH, @height = DEFAULT_HEIGHT, @min_width = 200, @min_height = 100) ->
    @pageSets = @createPageSets(data)

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
