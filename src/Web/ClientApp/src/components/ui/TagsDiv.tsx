interface Props {
  values: string[];
  isDark: boolean;
}

const TagsDiv = ({ values = [], isDark }: Props) => {
  return (
    <div className="d-flex align-items-center gap-2">
      {values.map((tag, idx) => (
        <div
          key={idx}
          className={`px-2 py-1 rounded-pill border times text-nowrap text-capitalize small-font fw-semibold ${
            isDark ? "bg-black text-white hover" : "bg-white text-black"
          }`}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagsDiv;
