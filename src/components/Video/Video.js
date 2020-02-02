import React, { useRef } from 'react';
import { useMachine } from '@xstate/react';
import {
  videoMachine,
  playVideo,
  pauseVideo,
  restartVideo
} from '../../machines/videoMachine';
import {
  VideoButtonSt,
  ScrubberWrapperSt,
  ScrubberSt,
  VideoWrapperSt
} from './Video.styles';

const Buttons = ({ current, send }) => {
  const isPlaying = current.matches({ ready: 'playing' });
  return (
    <VideoButtonSt
      isPlaying={isPlaying}
      className={`btn btn-${isPlaying ? 'danger' : 'success'}`}
      onClick={() => {
        send(isPlaying ? 'PAUSE' : 'PLAY');
      }}
    >
      {isPlaying ? 'Pause' : 'Play'}
    </VideoButtonSt>
  );
};

export default function Video() {
  const ref = useRef(null);
  const [current, send] = useMachine(videoMachine, {
    actions: { playVideo, pauseVideo, restartVideo }
  });
  const { duration, elapsed } = current.context;
  console.log(current.value);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <VideoWrapperSt>
          <video
            muted
            ref={ref}
            onCanPlay={() => {
              send('LOADED', { video: ref.current });
            }}
            onError={() => {
              send('FAILURE');
            }}
            onTimeUpdate={() => {
              send('TIMING');
            }}
            onEnded={() => {
              send('END');
            }}
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
          </video>
          <ScrubberWrapperSt>
            <ScrubberSt elapsed={elapsed} duration={duration}></ScrubberSt>
          </ScrubberWrapperSt>
        </VideoWrapperSt>
      </div>

      <div className="row justify-content-center">
        <Buttons current={current} send={send} />
      </div>
    </div>
  );
}
