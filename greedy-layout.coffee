class @GreedyLayout extends Base
  layout: () ->
    pageUtils.sort(@pageSets)
    groupSets = pageUtils.grouping(@pageSets)
    pageUtils.deformPriorities(groupSets, @width * @height, @min_width, @min_height)
    @setIdealArea(groupSets)
    pageUtils.sort(groupSets, true, pageUtils.avg)
    @arrange(groupSets, new Rect(0, 0, @width, @height))

  arrange: (pageSets, rect) ->
    if pageSets.length < 1
      return
    else if pageSets.length < 3
      @split(pageSets, rect)
    else
      @arrangeTopLeft(pageSets, rect)

  split: (pageSets, rect) ->
    verticalRects = @splitPageSetsArea(pageSets, rect, true, false)
    diff = 0
    for verticalRect, i in verticalRects
      ratioType = if pageUtils.isGroup(pageSets[i]) then pageSets[i][0].type else pageSets[i].type
      diff += pageUtils.diffRatio(verticalRect, ratioType)
    console.log "横", verticalRects, diff

    minDiff = diff
    isVertical = true

    horizontalRects = @splitPageSetsArea(pageSets, rect, false, false)

    diff = 0
    for horizontalRect, i in horizontalRects
      ratioType = if pageUtils.isGroup(pageSets[i]) then pageSets[i][0].type else pageSets[i].type
      diff += pageUtils.diffRatio(horizontalRect, ratioType)

    console.log "縦", horizontalRects, diff

    if diff < minDiff
      isVertical = false

    @splitPageSetsArea(pageSets, rect, isVertical, true)

  arrangeTopLeft: (pageSets, rect) ->
    tops = pageUtils.max(pageSets)
    remainingSets = @newSets(pageSets, tops)

    optimalTopRect = null
    optimalSets = []
    minDiff = 100000000000000
    idealArea = pageUtils.idealSum(tops)
    isVertical = false

    for rectType in rectTypes[tops[0].type]
      if tops.length < rectType.minAlign
        continue

      d = @fixTopLeftRect(remainingSets, rect, idealArea, rectType.ratio / tops.length)
      if d.diff < minDiff
        minDiff = d.diff
        optimalTopRect = d.topRect
        optimalSets = d.pageSets
        isVertical = true

      d = @fixTopLeftRect(remainingSets, rect, idealArea, rectType.ratio * tops.length)
      if d.diff < minDiff
        minDiff = d.diff
        optimalTopRect = d.topRect
        optimalSets = d.pageSets
        isVertical = false

    width = (pageUtils.idealSum(tops) + pageUtils.idealSum(optimalSets)) / rect.height
    optimalTopRect.height = optimalTopRect.area() / width
    optimalTopRect.width = width

    bottomSetsRect = @bottomRect(rect, optimalTopRect)
    remainingRect = rect.copy()
    remainingRect.x += width
    remainingRect.width -= width

    for target in optimalSets
      remainingSets = @newSets(remainingSets, target)

    @split(tops, optimalTopRect)
    @arrange(optimalSets, bottomSetsRect)
    @arrange(remainingSets, remainingRect)


  fixTopLeftRect: (remainingSets, parentRect, idealArea, ratio) ->
    topRect = parentRect.copy()

    topRect.height = Math.sqrt(idealArea / ratio)
    topRect.width = ratio * topRect.height
    if parentRect.height - topRect.height < @minHeight
      topRect.height = parentRect.height
      topRect.width = idealArea / topRect.height
    if parentRect.width - topRect.width < @minWidth
      topRect.height = idealArea / topRect.width
      topRect.width = parentRect.width
    bottomRect = @bottomRect(parentRect, topRect)

    diff_dict = @diffFromIdealArea(remainingSets, bottomRect)
    diff_dict['topRect'] = topRect
    return diff_dict


  diffFromIdealArea: (remainingSets, bottomRect) ->
    bottomSets = pageUtils.getOptimumSet(remainingSets, bottomRect)
    closest_area = pageUtils.idealSum(bottomSets)
    return {diff: Math.abs(bottomRect.area() - closest_area), pageSets: bottomSets}


  bottomRect: (parentRect, topRect) ->
    return new Rect(parentRect.x,
      parentRect.y + topRect.height,
      topRect.width,
      parentRect.height - topRect.height)


  splitPageSetsArea: (pageSets, rect, isVertical = true, fix = true) ->
    idealSum = pageUtils.idealSum(pageSets)
    isFlat = pageUtils.isFlat(pageSets)
    tmpRect = rect.copy()
    tmpRects = []

    if isFlat
      tmpRect.height = rect.height / pageSets.length if isVertical
      tmpRect.width = rect.width / pageSets.length if !isVertical

    for page in pageSets
      if !isFlat
        tmpRect.height = rect.height * (pageUtils.idealSum(page) / idealSum) if isVertical
        tmpRect.width = rect.width * (pageUtils.idealSum(page) / idealSum) if !isVertical

      pageRect = tmpRect.copy()
      tmpRect.y += tmpRect.height if isVertical
      tmpRect.x += tmpRect.width if !isVertical

      if !fix
        tmpRects.push(pageRect)
        continue

      if pageUtils.isGroup(page)
        @arrange(page, pageRect)
      else
        page.rect = pageRect

    return tmpRects


