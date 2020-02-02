import { Machine, assign } from "xstate";

export const videoMachine = new Machine({
  id: 'videoMachine',
  initial: 'loading',
  context: {
    video: null,
    duration: 0,
    elapsed: 0
  },
  states: {
    loading: {
      on: {
        LOADED: {
          target: 'ready',
          actions: assign({
            video: (_context, event) => event.video,
            duration: (_context, event) => event.video.duration
          })
        },
        FAILURE: 'failure'
      }
    },
    ready: {
      initial: 'paused',
      states: {
        paused: {
          on: {
            PLAY: {
              target: 'playing',
              actions: ['playVideo']
            }
          }
        },
        playing: {
          on: {
            PAUSE: {
              target: 'paused',
              actions: ['pauseVideo']
            },
            END: 'ended',
            TIMING: {
              target: 'playing',
              actions: assign({
                elapsed: ({ video }, _event) => video.currentTime
              })
            }
          }
        },
        ended: {
          on: {
            PLAY: { target: 'playing', actions: ["restartVideo"] }
          }
        }
      }
    },
    failure: { type: 'final' }
  }
})

export const playVideo = ({ video }, _event) => {
  video.play()
}

export const pauseVideo = ({ video }, _event) => {
  video.pause()
}

export const restartVideo = ({video}, _event) => {
  video.currentTime = 0;
  video.play()
}