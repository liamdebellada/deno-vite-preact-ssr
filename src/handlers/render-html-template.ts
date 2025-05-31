export const renderHtmlTemplate = (
  htmlTemplate: string,
  { head, html, serverState }: {
    head: string;
    html: string;
    serverState: string;
  },
) => {
  return htmlTemplate
    .replace(`<!--app-head-->`, head)
    .replace(`<!--app-html-->`, html)
    .replace(`<!--sever-state-->`, serverState);
};
