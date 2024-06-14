export default function(htmlFromString: string): ChildNode {
  const template = document.createElement('template');
  template.innerHTML = htmlFromString;
  return template.content.firstChild as ChildNode;
}
