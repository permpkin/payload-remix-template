// @ts-ignore
const withLargeBody = (incomingEditor) => {
  const editor = incomingEditor;
  const { shouldBreakOutOnEnter } = editor;
  // @ts-ignore
  editor.shouldBreakOutOnEnter = (element) => (element.type === 'large-body' ? true : shouldBreakOutOnEnter(element));

  return editor;
};

export default withLargeBody;
