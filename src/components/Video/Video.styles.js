import styled from 'styled-components';

export const VideoButtonSt = styled.button.attrs({})`
  transition: 250ms flex-grow;
  margin-top: 20px;
  flex-grow: ${({ isPlaying }) => (isPlaying ? 1 : 0.5)};
  border-radius: 0;
`;

export const ScrubberWrapperSt = styled.div`
  position: absolute;
  background: aliceblue;
  opacity: 0.5;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

export const ScrubberSt = styled.div`
  background: rgba(255, 0, 255, 0.9);
  transition: 250ms width;
  height: 100%;
  width: ${({ elapsed, duration }) => `${(elapsed / duration) * 100}% `};
`;

export const VideoWrapperSt = styled.div`
  position: relative;
  overflow: hidden;
  video {
    height: 100%;
  }
`;
