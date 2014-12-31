class @HillClimbing extends GreedyLayout
  climbing: () ->
    ratio = @evaluate(@pageSets)
    @groupSets = pageUtils.grouping(@pageSets)
    @sort(@groupSets)
    for g in @groupSets
      console.log g[0].originalPriority, g[0].rect

  evaluate: (pageSets) ->
    ratioDiff = 0
    for page in pageSets
      r = 100000000000
      for type in rectTypes[page.type]
        diff = 0
        if page.rect.ratio() - type.ratio < 0
          diff = Math.pow(page.rect.ratio() / type.ratio, 2)
        else
          diff = Math.pow(type.ratio / page.rect.ratio(), 2)
        r = Math.min(r, diff)
      ratioDiff += r
    return ratioDiff

  sort: (pageSets) ->
    pageSets.sort (a, b)->
      if a[0].rect.x == b[0].rect.x
        return a[0].rect.y - b[0].rect.y
      return a[0].rect.x - b[0].rect.x

  shuffle: (pageSets) ->
    
    return




