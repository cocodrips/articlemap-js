class @Rect
  constructor: (@x = 0, @y = 0, @width = 0, @height = 0) ->

  isEqual: (other) ->
    return @x == other.x and @y == other.y and @width == other.width and @height == other.height

  copy: () ->
    return new Rect(@x, @y, @width, @height)

  area: ()->
    return @width * @height

  ratio: () ->
    return @width / @height

  vec4: () ->
    return [@x, @y, @width, @height]