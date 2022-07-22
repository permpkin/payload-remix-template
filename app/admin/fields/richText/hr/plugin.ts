// @ts-ignore
const withHR = (incomingEditor) => {
  const editor = incomingEditor;
  const { isVoid } = editor;

  // @ts-ignore
  editor.isVoid = (element) => (element.type === 'hr' ? true : isVoid(element));

  return editor;
};

export default withHR;
