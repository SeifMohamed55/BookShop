import React, { useState, useEffect, useContext } from 'react';
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
import { BooksClient } from '../../web-api-client';
import { UserContext } from '../../contexts/userDataProvider';

interface FormData {
  title: string;
  categories: { id: number; value: string }[];
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
  onBookAdded?: () => void; // Callback to refresh the book list
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({ isOpen, toggle, onBookAdded }) => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const context = useContext(UserContext);

  const [categoryOptions, setCategoryOptions] = useState<{ id: number; value: string; label: string }[]>([]);

  useEffect(() => {
    setCategoryOptions([
      { id: 1, value: 'Fiction', label: 'Fiction' },
      { id: 2, value: 'Science fiction', label: 'Science fiction' },
      { id: 3, value: 'biography', label: 'biography' },
    ]);  
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !context?.userData?.id) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Convert files to base64
      const imageBase64 = await fileToBase64(formData.image!);
      const pdfBase64 = await fileToBase64(formData.pdfFile!);

      const client = new BooksClient();
      const response = await client.addBook(context.userData.id, {
        title: formData.title,
        description: formData.description,
        image: imageBase64,
        file: pdfBase64,
        userId: context.userData.id,
        categoriesDto: [{ id: 1, name: 'Fiction' }]
      });

      if (response.data) {
        // Reset form
        setFormData({
          title: '',
          categories: [],
          description: '',
          image: null,
          pdfFile: null
        });
        
        // Close modal
        toggle();
        
        // Refresh book list if callback provided
        if (onBookAdded) {
          onBookAdded();
        }
      }
    } catch (err) {
      console.error('Error adding book:', err);
      setSubmitError('Failed to add book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} className="playfair fw-bold">Add a New Book</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          {submitError && (
            <div className="alert alert-danger" role="alert">
              {submitError}
            </div>
          )}
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
          <Button type="button" color="light" onClick={toggle} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" color="dark" disabled={isSubmitting}>
            {isSubmitting ? 'Adding Book...' : 'Add Book'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateBookModal; 