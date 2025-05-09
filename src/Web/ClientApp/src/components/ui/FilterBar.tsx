import React, { useState } from "react";
import { Row, Col, InputGroup, Input, Button, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MenuList from "./menuList";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [listValues] = useState<string[]>([
    `📖 all books`,
    `🚩 currently reading`,
    `✅ completed`,
  ]);
  const onClick = (index: number): void => {
    setActiveIndex(index);
  };
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <Row className="mb-4 align-items-center">
      <Col md={8}>
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
      </Col>
      <Col md={4} className="mt-3 mt-md-0">
        <MenuList
          activeIndex={activeIndex}
          onClick={onClick}
          values={listValues}
        />
      </Col>
    </Row>
  );
};

export default FilterBar;
