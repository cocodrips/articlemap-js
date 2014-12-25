$ ->
  greedyLayout = new GreedyLayout(data = @data, width = 500, height = 300)
  greedyLayout.layout()

  pageSets = greedyLayout.pageSets

  articles = d3.select("#main-container")
  .selectAll("article")
  .data(pageSets)
  .enter()
  .append("article")
  .attr("class", "article")
  .style("width", (d)-> return d.rect.width + "px")
  .style("height", (d)-> return d.rect.height + "px")
  .style("top", (d)-> return d.rect.y + "px")
  .style("left", (d)-> return d.rect.x + "px")
  .append("div")
  .attr("class", "article-inner")
  .text((d) -> return d.originalPriority)


  a = [1,2,3]
  console.log a
  a.pop()
  a.pop()
  a.pop()
