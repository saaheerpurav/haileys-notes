import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import { IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";


export default function DropDown({ defaultOption, options, setOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(typeof defaultOption === "undefined" ? "Select Option" : defaultOption);


  useEffect(() => {
    setSelected(typeof defaultOption === "undefined" ? "Select Option" : defaultOption);
  }, [defaultOption]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    if (handleDisabled(option)) return;
    setOption(option);
    setSelected(option);
    setIsOpen(false);
  };

  const handleDisabled = (e) => {
    return e === "Select Option";
  }

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        {selected}
        {
          isOpen
            ? <IoChevronDownOutline color="gray" />
            : <IoChevronForwardOutline color="gray" />
        }
      </DropdownHeader>
      <DropdownListContainer $isOpen={isOpen}>
        <DropdownList>
          {["Select Option", ...options].map((option, index) => (
            <DropdownListItem
              key={index}
              onClick={() => handleSelect(option)}
              disabled={handleDisabled(option)}
              $selected={option === selected}
            >
              {option}
            </DropdownListItem>
          ))}
        </DropdownList>
      </DropdownListContainer>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  width: 200px;
`;

const DropdownHeader = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const DropdownListContainer = styled.div`
  max-height: ${(props) => (props.$isOpen ? "300px" : "0px")};
  overflow: ${(props) => (props.$isOpen ? "auto" : "hidden")};
  transition: max-height 0.3s ease-in-out;
  border: ${(props) => (props.$isOpen ? "1px solid #ddd" : "none")};
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  width: 100%;
  z-index: 10;
  margin-top: 10px;
`;

const DropdownList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const DropdownListItem = styled.li`
  padding: 10px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) => (props.$selected ? "#f3f3f3" : "#fff")};
  color: ${(props) => (props.disabled ? "#999" : "#000")};
  
  &:hover {
    background-color: #f3f3f3;
  }
`;