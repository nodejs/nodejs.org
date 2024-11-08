export const { Link, redirect, usePathname, useRouter } = {
  Link: props => <a {...props} />,
  redirect: () => void null,
  usePathname: () => '',
  useRouter: () => ({ push: () => void null, replace: () => void null }),
};
