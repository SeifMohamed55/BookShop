import React, { useState, useEffect } from "react";
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
  tags: { value: string; label: string }[];
  description: string;
}

interface FormErrors {
  clubName: string;
  tags: string;
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
    tags: [],
    description: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    clubName: "",
    tags: "",
    description: "",
  });

  const [tagOptions, setTagOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    // Fetch tags from API
    const fetchTags = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch('YOUR_API_ENDPOINT/tags');
        const data = await response.json();
        
        // Transform the data into the format expected by react-select
        const options = data.map((tag: string) => ({
          value: tag,
          label: tag
        }));
        
        setTagOptions(options);
      } catch (error) {
        console.error('Error fetching tags:', error);
        // Fallback to default tags if API fails
        setTagOptions([
          { value: 'Fiction', label: 'Fiction' },
          { value: 'Non-Fiction', label: 'Non-Fiction' },
          { value: 'Mystery', label: 'Mystery' },
          { value: 'Science Fiction', label: 'Science Fiction' },
          { value: 'Fantasy', label: 'Fantasy' },
          { value: 'Romance', label: 'Romance' },
          { value: 'Thriller', label: 'Thriller' }
        ]);
      }
    };

    fetchTags();
  }, []);

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

  const handleTagChange = (selectedOptions: any) => {
    setFormData({
      ...formData,
      tags: selectedOptions || []
    });
    
    // Clear error when tags are selected
    if (formErrors.tags) {
      setFormErrors({
        ...formErrors,
        tags: ''
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

    if (formData.tags.length === 0) {
      newErrors.tags = "Please select at least one tag";
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
        tags: [],
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
                <Label for="tags">Tags*</Label>
                <Select
                  isMulti
                  name="tags"
                  options={tagOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={formData.tags}
                  onChange={handleTagChange}
                  placeholder="Select tags..."
                />
                {formErrors.tags && (
                  <div className="text-danger small">{formErrors.tags}</div>
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
