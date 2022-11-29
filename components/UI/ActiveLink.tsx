import React from "react";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement;
  classActive?: string;
  className?: string;
}

const checkMatching = (path: string, href: string) => {
  if (href !== "/") {
    return path.includes(href);
  } else {
    return href.match(path);
  }
};

export const ActiveLink = ({
  children,
  classActive = "text-teal-600 dark:text-teal-300 font-bold underline underline-offset-4 decoration-2 ",
  className,
  ...props
}: ActiveLinkProps) => {
  const router = useRouter();

  const pathMatches = checkMatching(router.asPath, props.href.toString());
  const onlyChild = React.Children.only(children);

  return (
    <Link {...props}>
      {React.cloneElement(onlyChild, {
        className: pathMatches ? `${classActive}` : `${className}`,
      })}
    </Link>
  );
};
