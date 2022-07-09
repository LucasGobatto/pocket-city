export function setElementActive(element: HTMLElement, active: boolean) {
  element.setAttribute("name", active ? "active" : "disable");
}
