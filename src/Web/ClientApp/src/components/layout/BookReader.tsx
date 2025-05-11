import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookmark,
  faFont,
  faMoon,
  faSun,
  faChevronLeft,
  faChevronRight,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import { BooksClient } from "../../web-api-client";
import "../styling/BookReader.css";

// Mock API response type
interface BookPage {
  content: string;
  pageNumber: number;
  totalPages: number;
  chapterTitle: string;
}

const BookReader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bookmark, setBookmark] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookData, setBookData] = useState<BookPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fetchBookPage = async (bookId: string, page: number) => {
    try {
      setLoading(true);
      const client = new BooksClient();
      const response = await client.getBookPage(parseInt(bookId), page);

      // The response is a byte array containing the page content
      const textContent = new TextDecoder().decode(
        response as unknown as Uint8Array
      );

      // Get book details to get total pages
      const bookDetails = await client.getBookById(parseInt(bookId));

      setBookData({
        content: textContent,
        pageNumber: page,
        totalPages: bookDetails.data?.totalPages || 10,
        chapterTitle: `Page ${page}`,
      });
      setError(null);
    } catch (err) {
      setError("Failed to load book content. Please try again.");
      console.error("Error fetching book page:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookPage(id, currentPage);
    }
  }, [id, currentPage]);

  const handleFontSizeChange = (increase: boolean) => {
    setFontSize((prev) =>
      increase ? Math.min(prev + 2, 24) : Math.max(prev - 2, 12)
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBookmark = () => {
    setBookmark(window.scrollY);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (!bookData) return;

    if (direction === "next" && currentPage < bookData.totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`book-reader ${isDarkMode ? "dark-mode" : ""} ${
        isFullscreen ? "fullscreen" : ""
      }`}
    >
      <div className="reader-toolbar">
        <Container>
          <Row className="align-items-center py-3">
            <Col>
              <Button color="link" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back
              </Button>
            </Col>
            <Col className="text-end">
              <Button color="link" onClick={() => handleFontSizeChange(false)}>
                <FontAwesomeIcon icon={faFont} className="me-2" />
                A-
              </Button>
              <Button color="link" onClick={() => handleFontSizeChange(true)}>
                <FontAwesomeIcon icon={faFont} className="me-2" />
                A+
              </Button>
              <Button color="link" onClick={toggleDarkMode}>
                <FontAwesomeIcon
                  icon={isDarkMode ? faSun : faMoon}
                  className="me-2"
                />
              </Button>
              <Button color="link" onClick={handleBookmark}>
                <FontAwesomeIcon icon={faBookmark} className="me-2" />
              </Button>
              <Button color="link" onClick={toggleFullscreen}>
                <FontAwesomeIcon
                  icon={isFullscreen ? faCompress : faExpand}
                  className="me-2"
                />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-4">
        <Card className="p-4">
          {loading ? (
            <div className="text-center py-5">
              <Spinner color="primary" />
              <p className="mt-3">Loading page...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger">
              <p>{error}</p>
              <Button
                color="primary"
                onClick={() => fetchBookPage(id!, currentPage)}
              >
                Retry
              </Button>
            </div>
          ) : (
            bookData && (
              <>
                <div
                  className="book-content"
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: "1.6",
                    padding: "20px",
                    backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    minHeight: "80vh",
                    overflowY: "auto",
                  }}
                >
                  <h2 className="chapter-title mb-4">
                    {bookData.chapterTitle}
                  </h2>
                  <div className="content-text">
                    {bookData.content.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pagination-controls mt-4 d-flex justify-content-between align-items-center">
                  <Button
                    color="light"
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                    Previous Page
                  </Button>

                  <span className="page-info">
                    Page {currentPage} of {bookData.totalPages}
                  </span>

                  <Button
                    color="light"
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === bookData.totalPages}
                  >
                    Next Page
                    <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                  </Button>
                </div>
              </>
            )
          )}
        </Card>
      </Container>
    </div>
  );
};

export default BookReader;
