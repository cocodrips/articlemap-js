class RectType
  constructor: (@ratio, @min_align=1) ->

@rect_types =
  'image': [
    new RectType(0.9, 1)
    new RectType(1.6, 1)
    new RectType(3.0, 2)
    new RectType(3.8, 2)
  ]
  'text':[
    new RectType(3.8, 1)
    new RectType(1.0, 1)
  ]