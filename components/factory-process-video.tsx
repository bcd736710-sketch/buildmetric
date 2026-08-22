export function FactoryProcessVideo() {
  return <div className="mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[20px] bg-mist shadow-[0_12px_30px_rgba(0,32,63,0.14)] sm:max-w-[360px]">
    <video aria-label="TROVANE manufacturing process" autoPlay className="h-full w-full object-contain" loop muted playsInline poster="/images/factory-poster.jpg" preload="metadata" src="/videos/factory.mp4" />
  </div>;
}
