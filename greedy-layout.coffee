class @GreedyLayout extends Base
  layout: () ->
    groupSets = pageUtils.grouping(@pageSets)
    pageUtils.deformPriorities(groupSets, @width * @height, @min_width, @min_height)
    @setIdealArea(groupSets)
    pageUtils.sort(groupSets, reverse = true, key = (a, b) -> pageUtils.avg(a) < pageUtils.avg(b))

    for g in groupSets
      console.log g

  arrange = (pageSets, rect) ->
    if pageSets.length < 1
      return
    else if pageSets.length < 3
      split(pageSets, rect)
    else
      arrangeTopLeft(pageSets, rect)

  split = (pageSet, rect) ->
    p = 0

  arrangeTopLeft = (pageSets, rect) ->
    a

