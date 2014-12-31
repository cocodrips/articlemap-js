$ ->
#  greedyLayout = new GreedyLayout(data = @data, width = 500, height = 300)
#  greedyLayout.layout()
#  pageSets = greedyLayout.pageSets

  data = []
  for i in [0...10]
    data.push(new Page(Math.ceil(Math.random() * 100), "text"))
  hillClimbing = new HillClimbing(null, data, 500, 300)
  hillClimbing.layout()
  pageSets = hillClimbing.pageSets
  hillClimbing.climbing()

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
