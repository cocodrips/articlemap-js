class @Page
  constructor: (@priority, @type, @name = null) ->
    @original_property = @property
    @rect = new Rect()
    @id = Math.random()
    @ideal_area = 0

  isEqual: (other)->
    return if other.id then @id == other.id else false

