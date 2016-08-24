'use strict'
@pageUtils =
  isGroup: (pageSet) ->
    return pageSet instanceof Array

  prioritySum: (pageSets) ->
    if !pageUtils.isGroup(pageSets)
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
    if !pageUtils.isGroup(pageSets)
      return pageSets
    maxi = 0
    maxIndex = 0
    for i in [0...pageSets.length]
      v = pageUtils.avg[pageSets[i]]
      if maxi < v
        maxi = v
        maxIndex = i
    return pageSets[maxIndex]

  sort: (pageSets, reverse = false, key = null) ->
    if !key
      key = (a, b) -> pageUtils.prioritySum(a) - pageUtils.prioritySum(b)
    pageSets.sort(key)
    if reverse
      pageSets.reverse()


  idealSum: (pageSets) ->
    if !pageUtils.isGroup(pageSets)
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

    pageUtils.sort(pageSets)

    top = pageSets.pop()
    groups = [[top]]

    for rectType of rectTypes
      # Get pageSets whose type is same.
      pages = (pageSet for pageSet in pageSets when pageSet.type == rectType)
      pageUtils.sort(pages, reverse = true)


      while pages.length > 0
        base = pages.pop()
        group = [base]

        if pages.length > 0 and pages[pages.length - 1].originalPriority <= Math.ceil(base.originalPriority * range)
          group.push(pages.pop())
        groups.push(group)

    pageUtils.sort(groups, reverse = true, key = (a, b)-> pageUtils.avg(a) - pageUtils.avg(b))
    return groups

  getOptimumSet: (pageSets, rect) ->
    s = Infinity
#    match = Infinity | 1000000000000
    optimumSet = null
    for i in [1..3] # Change value depends on pageSet length.
      dict = pageUtils.combination(pageSets, i, s, match, optimumSet)
      match = dict.match
      optimumSet = dict.optimumSet

#    # TODO:// Implement combination function!
#    for i in [1...1 << pageSets.length]
#      j = i
#      set = []
#      idealSum = 0
#      for k in [0...pageSets.length]
#        if j % 2 == 1
#          idealSum += pageUtils.idealSum(pageSets[k])
#          set.push(pageSets[k])
#        j = j >> 1
#
#      if Math.abs(rect.area() - idealSum) < s
#        s = Math.abs(rect.area() - idealSum)
#        optimumSet = set
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

  deformPriorities: (pageSets, area, min_width, min_height) ->
    prioritySum = pageUtils.prioritySum(pageSets)
    areaMin = min_height * min_height
    x = (area / areaMin) / prioritySum

    for pageSet in pageSets
      if pageUtils.isGroup(pageSet)
        for page in pageSet
          page.priority = Math.ceil(x * page.priority)
      else
        pageSet.priority = Math.ceil(x * pageSet.priority)


  debug: (pageSets) ->
    if !pageUtils.isGroup(pageSets)
      return pageSets.priority
    return (pageUtils.debug(pageSet) for pageSet in pageSets)

  diffRatio: (rect, rectType) ->
    minRatio = 10000
    for t in rectTypes[rectType]
      ratio = rect.width / rect.height
      minRatio = Math.min(minRatio, if t.ratio < ratio then ratio / t.ratio else t.ratio / ratio)
    return minRatio

  isFlat: (pageSets) ->
    for page in pageSets
      if pageUtils.isGroup(page)
        return false
    return true

  sum: (array, f = null) ->
    if !f
      f = (x) -> return x
    s = 0
    for a in array
      s += f(a)
    return s


