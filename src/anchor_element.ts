export const getAnchorElement = (
  element?: string | HTMLElement
): HTMLElement => {
  const linkToElement: HTMLElement | null | undefined =
    typeof element === 'string'
      ? document.querySelector<HTMLElement>(element)
      : element;

  if (linkToElement === null || linkToElement === undefined) {
    throw new Error(
      'You should provide "element" property while initialization block and' +
        ' make sure that it is on the page or it is not "null" or "undefined".'
    );
  }

  return linkToElement;
};
