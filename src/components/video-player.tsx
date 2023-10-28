
type PropsVideoPlayer = {
    src: string;
    muted: boolean;
    width: string;
    height: string;
    poster: string;
    autoplay: boolean;
}

export function VideoPlayer({src, muted, width, height, poster, autoplay}: PropsVideoPlayer) {
  return (
    <video src={src} controls muted={muted} width={width} height={height} autoPlay={autoplay} poster={poster}/>
  );
};
