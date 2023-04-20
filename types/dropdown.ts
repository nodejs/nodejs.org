export interface DropdownItem {
  title: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}
