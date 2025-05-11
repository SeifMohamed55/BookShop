import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import Select from 'react-select';

interface FormData {
  clubName: string;
  categories: { value: string; label: string }[];
  description: string;
}

interface FormErrors {
  clubName: string;
  categories: string;
  description: string;
}

interface CreateBookClubModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const CreateBookClubModal: React.FC<CreateBookClubModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [formData, setFormData] = useState<FormData>({
    clubName: "",
    categories: [],
    description: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    clubName: "",
    categories: "",
    description: "",
  });

  // Static category options
  const categoryOptions = [
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Mystery", label: "Mystery" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
    { value: "Biography", label: "Biography" },
    { value: "History", label: "History" },
    { value: "Self-Help", label: "Self-Help" },
    { value: "Poetry", label: "Poetry" },
    { value: "Classics", label: "Classics" }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleCategoryChange = (selectedOptions: any) => {
    setFormData({
      ...formData,
      categories: selectedOptions || []
    });
    
    // Clear error when categories are selected
    if (formErrors.categories) {
      setFormErrors({
        ...formErrors,
        categories: ""
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.clubName.trim()) {
      newErrors.clubName = "Club name is required";
      valid = false;
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "Please select at least one category";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Add book club logic would go here
      console.log("Form submitted successfully", formData);
      toggle();
      // Reset form
      setFormData({
        clubName: "",
        categories: [],
        description: "",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} className="playfair fw-bold">
        Create a New Book Club
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="clubName">Club Name*</Label>
                <Input
                  type="text"
                  name="clubName"
                  id="clubName"
                  value={formData.clubName}
                  onChange={handleInputChange}
                  invalid={!!formErrors.clubName}
                />
                {formErrors.clubName && (
                  <div className="text-danger small">{formErrors.clubName}</div>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="categories">Categories*</Label>
                <Select
                  isMulti
                  name="categories"
                  options={categoryOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={formData.categories}
                  onChange={handleCategoryChange}
                  placeholder="Select categories..."
                />
                {formErrors.categories && (
                  <div className="text-danger small">{formErrors.categories}</div>
                )}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="description">Club Description*</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              invalid={!!formErrors.description}
            />
            {formErrors.description && (
              <div className="text-danger small">{formErrors.description}</div>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="light" onClick={toggle}>
            Cancel
          </Button>
          <Button type="submit" color="dark">
            Create Book Club
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateBookClubModal;
