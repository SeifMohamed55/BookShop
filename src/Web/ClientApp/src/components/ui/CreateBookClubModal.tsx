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

interface FormData {
  clubName: string;
  category: string;
  description: string;
  currentBook: string;
  currentAuthor: string;
}

interface FormErrors {
  clubName: string;
  category: string;
  description: string;
  currentBook: string;
  currentAuthor: string;
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
    category: "",
    description: "",
    currentBook: "",
    currentAuthor: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    clubName: "",
    category: "",
    description: "",
    currentBook: "",
    currentAuthor: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.clubName.trim()) {
      newErrors.clubName = "Club name is required";
      valid = false;
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    if (!formData.currentBook.trim()) {
      newErrors.currentBook = "Current book is required";
      valid = false;
    }

    if (!formData.currentAuthor.trim()) {
      newErrors.currentAuthor = "Author name is required";
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
        category: "",
        description: "",
        currentBook: "",
        currentAuthor: "",
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
            <Col md={6}>
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
            <Col md={6}>
              <FormGroup>
                <Label for="category">Category*</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  invalid={!!formErrors.category}
                >
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                </Input>
                {formErrors.category && (
                  <div className="text-danger small">{formErrors.category}</div>
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
          <Row className="mt-4">
            <h5 className="playfair fw-bold mb-3">First Book</h5>
            <Col md={6}>
              <FormGroup>
                <Label for="currentBook">Book Title*</Label>
                <Input
                  type="text"
                  name="currentBook"
                  id="currentBook"
                  value={formData.currentBook}
                  onChange={handleInputChange}
                  invalid={!!formErrors.currentBook}
                />
                {formErrors.currentBook && (
                  <div className="text-danger small">
                    {formErrors.currentBook}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="currentAuthor">Author*</Label>
                <Input
                  type="text"
                  name="currentAuthor"
                  id="currentAuthor"
                  value={formData.currentAuthor}
                  onChange={handleInputChange}
                  invalid={!!formErrors.currentAuthor}
                />
                {formErrors.currentAuthor && (
                  <div className="text-danger small">
                    {formErrors.currentAuthor}
                  </div>
                )}
              </FormGroup>
            </Col>
          </Row>
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
