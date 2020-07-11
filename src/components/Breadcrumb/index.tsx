import React from "react";
import { Link } from "react-router-dom";

interface IBreadcrumbLink {
  label: string;
  url: string;
}
interface IBreadcrumbProps {
  links: IBreadcrumbLink[];
  current: string;
}

const Breadcrumb: React.SFC<IBreadcrumbProps> = ({ links, current }) => {
  return (
    <>
      {links.map((b, i) => (
        <Link key={i} to={b.url}>
          {b.label}
        </Link>
      ))}
      <span>{current}</span>
    </>
  );
};

export default Breadcrumb;
