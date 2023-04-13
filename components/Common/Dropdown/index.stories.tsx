import Dropdown from '.';

export default {
  component: Dropdown,
};

const items = [...Array(10).keys()].map(item => ({
  title: `Item ${item + 1}`,
  label: `item-${item + 1}`,
  active: false,
  onClick: () => {},
}));

items[2].active = true;

export const Default = () => (
  <Dropdown items={items} shouldShow={true} styles={{}} />
);
