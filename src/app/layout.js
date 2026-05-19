import StyledComponentsRegistry from "@/styles/StyledComponentsRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PreferencesProvider } from "@/context/PreferencesContext";
import "./globals.css";

export const metadata = {
  title: {
    default: "MindBody Roots | Mind, Body, and Better Habits",
    template: "%s | MindBody Roots",
  },
  description:
    "Simple articles, motivational quotes, and practical recommendations for understanding your mind and building a healthier body.",
  metadataBase: new URL("https://mindbody-roots.example.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <PreferencesProvider>
            <div className="site-background" aria-hidden="true" />
            <div className="site-shell">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </PreferencesProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
