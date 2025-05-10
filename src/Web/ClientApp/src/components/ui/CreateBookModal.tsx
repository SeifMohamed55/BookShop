import React, { useState, useEffect } from 'react';
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
} from 'reactstrap';
import Select from 'react-select';

interface FormData {
  title: string;
  categories: { value: string; label: string }[];
  description: string;
  image: File | null;
  pdfFile: File | null;
}

interface FormErrors {
  title: string;
  categories: string;
  description: string;
  image: string;
  pdfFile: string;
}

interface CreateBookModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({ isOpen, toggle }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    categories: [],
    description: '',
    image: null,
    pdfFile: null
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: '',
    categories: '',
    description: '',
    image: '',
    pdfFile: ''
  });

  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch('YOUR_API_ENDPOINT/categories');
        const data = await response.json();
        
        // Transform the data into the format expected by react-select
        const options = data.map((category: string) => ({
          value: category,
          label: category
        }));
        
        setCategoryOptions(options);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to default categories if API fails
        setCategoryOptions([
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

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
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
        categories: ''
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      
      // Clear error when file is selected
      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors({
          ...formErrors,
          [name]: ''
        });
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    if (!formData.title.trim()) {
      newErrors.title = 'Book title is required';
      valid = false;
    }
    
    if (formData.categories.length === 0) {
      newErrors.categories = 'Please select at least one category';
      valid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }
    
    if (!formData.image) {
      newErrors.image = 'Book cover image is required';
      valid = false;
    }
    
    if (!formData.pdfFile) {
      newErrors.pdfFile = 'PDF file is required';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Add book logic would go here
      console.log('Form submitted successfully', formData);
      toggle();
      // Reset form
      setFormData({
        title: '',
        categories: [],
        description: '',
        image: null,
        pdfFile: null
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} className="playfair fw-bold">Add a New Book</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="title">Book Title*</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  invalid={!!formErrors.title}
                />
                {formErrors.title && <div className="text-danger small">{formErrors.title}</div>}
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
                {formErrors.categories && <div className="text-danger small">{formErrors.categories}</div>}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="description">Book Description*</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              invalid={!!formErrors.description}
            />
            {formErrors.description && <div className="text-danger small">{formErrors.description}</div>}
          </FormGroup>
          <Row className="mt-4">
            <Col md={6}>
              <FormGroup>
                <Label for="image">Book Cover Image*</Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  invalid={!!formErrors.image}
                />
                {formErrors.image && <div className="text-danger small">{formErrors.image}</div>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="pdfFile">PDF File*</Label>
                <Input
                  type="file"
                  name="pdfFile"
                  id="pdfFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  invalid={!!formErrors.pdfFile}
                />
                {formErrors.pdfFile && <div className="text-danger small">{formErrors.pdfFile}</div>}
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="light" onClick={toggle}>Cancel</Button>
          <Button type="submit" color="dark">Add Book</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateBookModal; 