import React from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BookClubsClient } from "../../web-api-client";
import { BookClub } from "../../types/interfaces/BookClub";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  valueSetter: (value: BookClub[] | undefined) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  valueSetter,
}) => {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const client = new BookClubsClient();
    client
      .searchBookClubs(searchTerm.trim())
      .then((res) => {
        console.log(res);
        res.data?.length === 0 ? valueSetter(undefined) : valueSetter(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          type="text"
          placeholder="Search book clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
        <Button type="submit" color="dark">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroup>
    </form>
  );
};

export default FilterBar;
