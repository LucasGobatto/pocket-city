export class AddAnimation {
  static animate(element: HTMLDivElement, duration: number) {
    element.style.animationName = "grow-slider";
    element.style.animationIterationCount = "1";
    element.style.animationDuration = `${duration}s`;
  }

  static setAnimationInteractionCount(element: HTMLDivElement, interaction: number | "infinite") {
    element.style.animationIterationCount = interaction.toString();
  }

  static removeAnimation(element: HTMLDivElement) {
    element.style.animation = "none";
  }

  static setAnimatonTime(element: HTMLDivElement, time: number) {
    element.style.animationName = "grow-slider";
    element.style.animationIterationCount = "1";
    element.style.animationDuration = `${time}s`;
  }
}
