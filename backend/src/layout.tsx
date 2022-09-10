import { html } from "hono/html";

const Layout = (props: { children?: any }) => html`<!DOCTYPE html>
   <html>
      <body>
         ${props.children}
      </body>
   </html>`;

export default Layout;
