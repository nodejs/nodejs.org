import ShellBox from '.';

export default {
  title: 'CommonComponents/ShellBox',
  component: ShellBox,
};

export const Default = () => (
  <ShellBox textToCopy="echo 'Hello World'">
    echo &rsquo;Hello World&rsquo;
  </ShellBox>
);
