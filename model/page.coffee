class @Page
  constructor: (@priority, @type, @name = null) ->
    @originalPriority = @priority
    @rect = new Rect()
    @id = Math.random()
    @idealArea = 0

  isEqual: (other)->
    return if other.id then @id == other.id else false

