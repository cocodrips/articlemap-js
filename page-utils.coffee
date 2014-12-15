@pageUtils =
  isGroup: (pageSet) ->
    return pageSet instanceof Array

  prioritySum: (pageSets) ->
    if not pageUtils.isGroup(pageSets)
      return pageSets.priority

    s = 0
    for i in [0...pageSets.length]
      s += pageUtils.prioritySum(pageSets[i])
    return s

  length: (pageSets) ->
    if not pageUtils.isGroup(pageSets)
      return 1

    s = 0
    for i in [0...pageSets.length]
      s += pageUtils.length(pageSets[i])
    return s

  avg: (pageSets) ->
    return pageUtils.prioritySum(pageSets) / pageUtils.length(pageSets)

  max: (pageSets) ->
    maxi = 0
    maxIndex = 0
    for i in [0...pageSets.length]
      v = pageUtils.avg[pageSets[i]]
      if maxi < v
        maxi = v
        maxIndex = i
    return pageSets[maxIndex]

  sort: (pageSets, reverse = false, key = null) ->
    if not key
      key = (a, b) -> pageUtils.prioritySum(a) < pageUtils.prioritySum(b)

    pageSets.sort(key)
    for i in [0...pageSets.length]
      if pageUtils.isGroup(pageSets[i])
        pageUtils.sort(pageSets[i], reverse, key)

  new_sets: (pageSets, target) ->
    if !pageUtils.isGroup(pageSets)
      return pageSets
    return (pageUtils.new_sets(pageSet) for pageSet in pageSets when target != pageSet)

  idealSum: (pageSets) ->
    if not pageUtils.isGroup(pageSets)
      return pageSets.idealArea

    s = 0
    for i in [0...pageSets.length]
      s += pageUtils.idealSum(pageSets[i])
    return s

  grouping: (pageSets, range = 1.3) ->
    # Grouping pages whose type is same and priority difference is within range.
    # args:
    #   pageSets: Flat array. ( ex. [new Page(1, "text"), new Page(2, "text")] )
    pageSets = [].concat(pageSets)

    top = pageSets.pop()
    groups = [[top]]

    for rectType of rectTypes
      # Get pageSets whose type is same.
      pages = (pageSet for pageSet in pageSets when pageSet.type == rectType)
      pageUtils.sort(pages)

      while pages.length > 0
        base = pages.pop()
        group = [base]
        if pages.length > 0 and pages[pages.length - 1].priority <= Math.ceil(base.priority * range)
          group.push(pages.pop())
        groups.push(group)
    return groups

  getOptimumSet: (pageSets, rect) ->
    s = rect.area
    match = Infinity | 1000000000000
    optimumSet = null
    for i in [1..4] # Change value depends on pageSet length.
      dict = pageUtils.combination(pageSets, i, s, match, optimumSet)
      match = dict.match
      optimumSet = dict.optimumSet
    return optimumSet

  combination: (pageSets, n, s, match, optimumSet) ->
    if pageSets.length < n
      return {"match": match, "optimumSet": optimumSet}

    for pageSet in pageUtils.nCombination(pageSets, n)
      areaSum = pageUtils.sum(pageSet, (x) -> pageUtils.idealSum(x))
      if Math.abs(s - areaSum) < Math.abs(s - match)
        optimumSet = pageSet
        match = areaSum
    return {"match": match, "optimumSet": optimumSet}

  nCombination: (sets, n) ->
    if sets.length < n or n <= 0
      return []

    if sets.length == n
      return [sets]

    if n == 1
      return (c for c in sets)

    combs = []
    for i in [0...sets.length - n + 1]
      head = sets.slice(i, i + 1);
      tailcombs = pageUtils.nCombination(sets.slice(i + 1), n - 1)
      for j in [0...tailcombs.length]
        combs.push(head.concat(tailcombs[j]))
    return combs

  debug: (pageSets) ->
    if !pageUtils.isGroup(pageSets)
      return pageSets.priority
    return (pageUtils.debug(pageSet) for pageSet in pageSets)

  sum: (array, f = null) ->
    if !f
      f = (x) -> return x
    s = 0
    for a in array
      s += f(a)
    return s



