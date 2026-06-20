export function useMDXComponents(components) {
  return {
    h1: (props) => <h1 className="s-title" {...props} />,
    h2: (props) => <h2 className="s-title" {...props} />,
    h3: (props) => <h3 {...props} />,
    p: (props) => <p className="s-body" {...props} />,
    a: (props) => <a {...props} />,
    ...components,
  };
}
