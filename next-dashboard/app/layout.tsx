import { FC, PropsWithChildren } from "react";
import { roboto } from "@/app/ui/fonts";
import "@/app/ui/globals.css";

import { Metadata } from "next";

export const metadata: Metadata ={
  title: {
    template: "%s - r-AC",
    default: "r-AC",
  },
  description: "Tutorial Next js",
}

// %s es una directiva de la plantilla de metadatos que se reemplaza con el título del sitio web o la página.

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
        <body 
          className={`${roboto.className} antialiased`}>
            {children}
        </body>
    </html>
  );
};

export default RootLayout;