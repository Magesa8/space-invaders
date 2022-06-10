//  even though we don't want it now
//  sprites start pointed right, we want up
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    laser.delete()
    //  only one laser at a time
    laser = game.createSprite(2, 4)
    laser.turn(Direction.Left, 90)
})
let laser : game.LedSprite = null
game.setScore(0)
game.setLife(3)
let pause_length = 100
//  defined as variable so easy to change everywhere later
let ship = game.createSprite(2, 4)
let alien = game.createSprite(0, 0)
laser = game.createSprite(2, 4)
//  need to initialize so program knows it exists
laser.delete()
basic.forever(function on_forever() {
    
    //  CHANGE ALIEN DIRECTION AND MOVE:
    //  if alien on far right, turn to go down 1, then turn to go left
    if (alien.get(LedSpriteProperty.X) == 4) {
        alien.turn(Direction.Right, 90)
    } else if (alien.get(LedSpriteProperty.X) == 0 && alien.get(LedSpriteProperty.Y) != 0) {
        //  if alien far left and it's not the alien's start, turn to go down 1, then turn to go right
        alien.turn(Direction.Left, 90)
    }
    
    //  now that alien pointed correct direction, move
    alien.move(1)
    //  CHECK IF LIFE IS LOST, BEFORE LASER MIGHT SAVE YOU
    //  if alien and ship are in the same space, then game is over
    if (alien.get(LedSpriteProperty.X) == ship.get(LedSpriteProperty.X) && alien.get(LedSpriteProperty.Y) == ship.get(LedSpriteProperty.Y)) {
        game.removeLife(1)
        //  automatically ends game if life == 0
        alien.delete()
        //  if game still going, reset alien
        alien = game.createSprite(0, 0)
        basic.pause(pause_length)
    }
    
    //  TRIGGER BEHAVIOR OF THE LASER
    if (!laser.isDeleted()) {
        //  if a laser is in the middle of firing
        if (laser.get(LedSpriteProperty.Y) > 0) {
            //  if laser not at the edge
            laser.move(1)
            //  if laser touches alien then both disappear and score is incremented
            if (laser.get(LedSpriteProperty.X) == alien.get(LedSpriteProperty.X) && laser.get(LedSpriteProperty.Y) == alien.get(LedSpriteProperty.Y)) {
                //  add score based on how far away the alien was; 4 for farthest, 3 next, etc
                game.addScore(4 - alien.get(LedSpriteProperty.Y))
                alien.delete()
                laser.delete()
                //  make new alien that will start moving when forever loop resets
                alien = game.createSprite(0, 0)
                basic.pause(pause_length)
            }
            
        } else {
            //  if we've hit the top of the screen, laser is done
            laser.delete()
        }
        
    }
    
    //  pause so that the game increments (almost) simultaneously every .2 sec
    basic.pause(pause_length)
})
