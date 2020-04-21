// Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  rootElement: T;
  element: U;

  constructor(
    templateId: string,
    rootElement: string,
    insertAtBeginnng: boolean,
    // newElementId?: string,
  ) {
    this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
    this.rootElement = <T>document.getElementById(rootElement)!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = <U>importedNode.firstElementChild;
    // if (newElementId) {
    //   this.element.id = newElementId;
    // }

    this.insertElement(insertAtBeginnng);
  }

  private insertElement(insertAtBeginnng: boolean) {
    this.rootElement.insertAdjacentElement(
      insertAtBeginnng ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}