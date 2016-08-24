$ ->

  data = []
  url   = location.href
  params    = url.split("?")
  spparams   = params[1].split("&")
  paramArray = [];

  for i in [0...spparams.length]
    vol = spparams[i].split("=")
    $('#param-form [name=' + vol[0] + ']').val(vol[1]) 

  _width = $('#param-form [name=width]').val() || 900
  _height = $('#param-form [name=height]').val() || 500
  _N = $('#param-form [name=N]').val() || 15
  _max = $('#param-form [name=max-size]').val() || 100
  console.log _width 
  console.log _N
  
  
  for i in [0..._N]
    data.push(new Page(Math.ceil(Math.random() * _max), "text"))
#  hillClimbing = new HillClimbing(null, data, _width, _height)
#  hillClimbing.layout()
#  pageSets = hillClimbing.pageSets
#  hillClimbing.climbing()
  greedyLayout = new GreedyLayout(null, data, _width, _height)
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
