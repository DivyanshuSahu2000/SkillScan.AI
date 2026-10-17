import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import LogoutButton from "./LogoutButton.jsx";
import "./app-header.scss";

const AppHeader = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [reportsActive, setReportsActive] = useState(false);

  useEffect(() => {
    const updateActiveLink = () => {
      const isReportPage = location.pathname.startsWith("/interview/");
      const reportsSection = document.getElementById("reports");
      const header = document.querySelector(".app-header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const reportsVisible =
        location.pathname === "/" &&
        reportsSection &&
        reportsSection.getBoundingClientRect().top <= headerBottom + 24 &&
        reportsSection.getBoundingClientRect().bottom > headerBottom;

      setReportsActive(
        isReportPage || location.hash === "#reports" || reportsVisible
      );
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("resize", updateActiveLink);
    return () => {
      window.removeEventListener("scroll", updateActiveLink);
      window.removeEventListener("resize", updateActiveLink);
    };
  }, [location.hash, location.pathname]);

  return (
    <header className="app-header">
      <div className="app-header__content">
        <Link className="app-header__brand" to="/" aria-label="SkillScan.AI home">
          SkillScan<span>.AI</span>
        </Link>

        <nav className="app-header__nav" aria-label="Main navigation">
          <Link
            to="/"
            className={`app-header__link${reportsActive ? "" : " active"}`}
            aria-current={!reportsActive ? "page" : undefined}
          >
            New plan
          </Link>
          <Link
            className={`app-header__link${reportsActive ? " active" : ""}`}
            to="/#reports"
            aria-current={reportsActive ? "page" : undefined}
            onClick={() => {
              if (window.location.pathname === "/") {
                document
                  .getElementById("reports")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            My reports
          </Link>
        </nav>

        <div className="app-header__account">
          <span className="app-header__username">
            {user?.username || "Account"}
          </span>
          <LogoutButton className="app-header__logout" />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
