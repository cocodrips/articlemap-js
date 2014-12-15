class @Rect
  constructor: (@x = 0, @y = 0, @width = 0, @height = 0) ->
    @ratio = @width / @height
    @area = @width * @height
    @vec4 = [@x, @y, @width, @height]

  isEqual: (other) ->
    return @x == other.x and @y == other.y and @width == other.width and @height == other.height
