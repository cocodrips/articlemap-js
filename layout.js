// Generated by CoffeeScript 1.6.3
(function() {
  $(function() {
    var a, articles, data, greedyLayout, height, pageSets, width;
    greedyLayout = new GreedyLayout(data = this.data, width = 500, height = 300);
    greedyLayout.layout();
    pageSets = greedyLayout.pageSets;
    articles = d3.select("#main-container").selectAll("article").data(pageSets).enter().append("article").attr("class", "article").style("width", function(d) {
      return d.rect.width + "px";
    }).style("height", function(d) {
      return d.rect.height + "px";
    }).style("top", function(d) {
      return d.rect.y + "px";
    }).style("left", function(d) {
      return d.rect.x + "px";
    }).append("div").attr("class", "article-inner").text(function(d) {
      return d.originalPriority;
    });
    a = [1, 2, 3];
    console.log(a);
    a.pop();
    a.pop();
    return a.pop();
  });

}).call(this);