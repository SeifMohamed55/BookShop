import React, { useState, useEffect, useContext } from "react";
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
import Select from "react-select";
import { AddBookCommand, BooksClient, CategoryDto } from "../../web-api-client";
import { UserContext } from "../../contexts/userDataProvider";

interface FormData {
  title?: string;
  categories?: { id: number; name: string }[];
  description: string;
  image?: File | null;
  pdfFile?: File | null;
}

interface FormErrors {
  title?: string;
  categories?: string;
  description?: string;
  image?: string;
  pdfFile?: string;
}

interface CreateBookModalProps {
  isOpen: boolean;
  toggle: () => void;
  onBookAdded?: () => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({
  isOpen,
  toggle,
  onBookAdded,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    categories: [],
    description: "",
    image: null,
    pdfFile: null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const context = useContext(UserContext);

  const [categoryOptions, setCategoryOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    // These would ideally be fetched from the backend
    setCategoryOptions([
      { value: 1, label: "Fiction" },
      { value: 2, label: "Science fiction" },
      { value: 3, label: "Biography" },
    ]);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCategoryChange = (selected: any) => {
    const selectedCategories =
      selected?.map((opt: any) => ({
        id: opt.value,
        name: opt.label,
      })) || [];
    setFormData((prev) => ({
      ...prev,
      categories: selectedCategories,
    }));
    if (formErrors.categories) {
      setFormErrors((prev) => ({ ...prev, categories: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files?.[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      if (formErrors[name as keyof FormErrors]) {
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors: FormErrors = {};
    if (!formData.title?.trim()) {
      errors.title = "Book title is required";
      valid = false;
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
      valid = false;
    }
    if (!formData.categories || formData.categories.length === 0) {
      errors.categories = "Please select at least one category";
      valid = false;
    }
    if (!formData.image) {
      errors.image = "Book cover image is required";
      valid = false;
    }
    if (!formData.pdfFile) {
      errors.pdfFile = "PDF file is required";
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result); // Keep full data URL
        } else {
          reject("Invalid file result");
        }
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !context?.userData?.id) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const imageBase64 = await fileToBase64(formData.image!);
      const pdfBase64 = await fileToBase64(formData.pdfFile!);

      const categoriesDto = formData.categories!.map((cat) => {
        const dto = new CategoryDto();
        dto.id = cat.id;
        dto.name = cat.name;
        return dto;
      });

      const bookCommand = new AddBookCommand({
        title: formData.title,
        description: formData.description,
        image: imageBase64,
        file: pdfBase64,
        userId: context.userData.id,
        categoriesDto,
      });

      const client = new BooksClient();
      client
        .addBook(undefined, bookCommand)
        .then((res) => {
          console.log(res);
          setFormData({
            title: "",
            categories: [],
            description: "",
            image: null,
            pdfFile: null,
          });
          toggle();
          onBookAdded?.();
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to add book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} className="playfair fw-bold">
        Add a New Book
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          {submitError && (
            <div className="alert alert-danger">{submitError}</div>
          )}
          <FormGroup>
            <Label for="title">Book Title*</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              invalid={!!formErrors.title}
            />
            {formErrors.title && (
              <div className="text-danger small">{formErrors.title}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="categories">Categories*</Label>
            <Select
              isMulti
              options={categoryOptions}
              value={formData.categories?.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              onChange={handleCategoryChange}
              placeholder="Select categories..."
            />
            {formErrors.categories && (
              <div className="text-danger small">{formErrors.categories}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="description">Book Description*</Label>
            <Input
              type="textarea"
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              invalid={!!formErrors.description}
            />
            {formErrors.description && (
              <div className="text-danger small">{formErrors.description}</div>
            )}
          </FormGroup>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="image">Book Cover Image*</Label>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  invalid={!!formErrors.image}
                />
                {formErrors.image && (
                  <div className="text-danger small">{formErrors.image}</div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="pdfFile">PDF File*</Label>
                <Input
                  type="file"
                  name="pdfFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  invalid={!!formErrors.pdfFile}
                />
                {formErrors.pdfFile && (
                  <div className="text-danger small">{formErrors.pdfFile}</div>
                )}
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="light"
            onClick={toggle}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" color="dark" disabled={isSubmitting}>
            {isSubmitting ? "Adding Book..." : "Add Book"}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateBookModal;
