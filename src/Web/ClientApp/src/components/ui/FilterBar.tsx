import React, { useEffect } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ searchTerm, setSearchTerm }) => {
  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);
  return (
    <InputGroup>
      <Input
        type="text"
        placeholder="Search book clubs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control"
      />
      <Button color="dark">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </InputGroup>
  );
};

export default FilterBar;
