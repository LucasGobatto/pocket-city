export class AddAnimation {
  static animate(element: HTMLDivElement, duration: number) {
    element.style.animationName = "grow-slider";
    element.style.animationIterationCount = "1";
    element.style.animationTimingFunction = "linear";
    element.style.animationDuration = `${duration}s`;
  }

  static setAnimationInteractionCount(element: HTMLDivElement, interaction: number | "infinite") {
    element.style.animationIterationCount = interaction.toString();
  }

  static removeAnimation(element: HTMLDivElement) {
    element.style.animation = "none";
    element.offsetHeight;
  }

  static editProgressWidth(element: HTMLDivElement, progress: number) {
    element.style.width = `${progress}%`;
  }
}
