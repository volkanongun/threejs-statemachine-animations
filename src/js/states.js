import { State } from "yuka"

const IDLE = "IDLE"
const RUNNING = "RUNNING"

class IdleState extends State {
  enter(skeleton){
    const idle = skeleton.animations.get(IDLE)
    idle.reset().fadeIn(skeleton.crossFadeDuration)
  }
  execute(skeleton){
    if(skeleton.isRunning)
      skeleton.stateMachine.changeTo(RUNNING)
  }
  exit(skeleton){
    const idle = skeleton.animations.get(IDLE)
    idle.fadeOut(skeleton.crossFadeDuration)
  }
}

class RunState extends State {
  enter(skeleton){
    const run = skeleton.animations.get(RUNNING)
    run.reset().fadeIn(skeleton.crossFadeDuration)
  }
  execute(skeleton){
    if(!skeleton.isRunning)
      skeleton.stateMachine.changeTo(IDLE)
  }
  exit(skeleton){
    const run = skeleton.animations.get(RUNNING)
    run.fadeOut(skeleton.crossFadeDuration)
  }
}

export {IdleState, RunState}