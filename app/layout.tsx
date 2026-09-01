import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Elvir's 30th Birthday Mission", description: "A classified birthday mission." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }