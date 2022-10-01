import { GameEntity, StateMachine } from "yuka"
import { IdleState, RunState } from './states.js'

class Skeleton extends GameEntity {
  constructor(model, mixer, animations) {
    super()
    this.mixer = mixer
    this.animations = animations
    this.model = model

    this.stateMachine = new StateMachine(this)

    this.stateMachine.add("IDLE", new IdleState())
    this.stateMachine.add("RUNNING", new RunState())

    this.stateMachine.changeTo("IDLE")

    this.crossFadeDuration = .2
    this.isRunning = false
    
  }

  update(delta){
    this.mixer.update(delta)
    this.stateMachine.update()
    return this
  }
}

export {Skeleton}