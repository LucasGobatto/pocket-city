import { Service } from "typedi";
import { maintainersWindow } from "../../tags";

@Service()
export class MaintainersWindowsEvent {
  isOpen = false;

  open() {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    maintainersWindow.style.display = "flex";
  }

  close() {
    if (!this.isOpen) {
      throw new Error("Window should be open to be closed");
    }

    maintainersWindow.style.display = "none";
    this.isOpen = false;
  }
}
