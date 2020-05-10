export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  rootElement: T;
  element: U;

  constructor(
    templateId: string,
    rootElement: string,
    insertAtStart: boolean
  ) {
    this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
    this.rootElement = <T>document.getElementById(rootElement)!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = <U>importedNode.firstElementChild;
    this.insertElement(insertAtStart);
  }

  private insertElement(insertAtBeginning: boolean) {
    this.rootElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract render(): void;
}