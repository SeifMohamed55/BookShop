type Props = {
  values: string[];
  onClick: (index: number) => void;
  activeIndex: number;
};

const MenuList = ({ values, onClick, activeIndex }: Props) => {
  return (
    <ul className="d-flex align-items-center gap-3 list-styling rounded-2 my-3">
      {values.map((value, idx) => (
        <li
          key={idx}
          onClick={() => onClick(idx)}
          className={`px-2 py-1 text-capitalize times normal-font ${
            activeIndex === idx ? "active-list" : ""
          }`}
        >
          {value}
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
