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

      const base64 = response.data?.content;
      if (!base64) throw new Error("No content received from server.");

      const bookDetails = await client.getBookById(parseInt(bookId));
      const totalPages = bookDetails.data?.totalPages ?? 1;

      setBookData({
        content: base64,
        pageNumber: page,
        totalPages: totalPages,
        chapterTitle: `Page ${page}`,
      });

      setError(null);
    } catch (err) {
      console.error("Error loading book:", err);
      setError("Failed to load book content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBookPage(id, currentPage);
  }, [id, currentPage]);

  const handleFontSizeChange = (increase: boolean) => {
    setFontSize((prev) =>
      increase ? Math.min(prev + 2, 28) : Math.max(prev - 2, 12)
    );
  };

  const handleBookmark = () => {
    setBookmark(window.scrollY);
  };

  const handlePageChange = (dir: "next" | "prev") => {
    if (!bookData) return;
    if (dir === "next" && currentPage < bookData.totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (dir === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

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
            <div className="text-center text-danger">
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
                <div className="book-content text-center">
                  <h2 className="mb-4">{bookData.chapterTitle}</h2>
                  <iframe
                    title={`Book page ${bookData.pageNumber}`}
                    src={`data:application/pdf;base64,${bookData.content}`}
                    width="100%"
                    height="800px"
                    style={{
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: isDarkMode ? "#2c2c2c" : "#fff",
                    }}
                  ></iframe>
                </div>

                <div className="pagination-controls mt-4 d-flex justify-content-between align-items-center">
                  <Button
                    color="light"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange("prev")}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                    Previous Page
                  </Button>

                  <span>
                    Page {currentPage} of {bookData.totalPages}
                  </span>

                  <Button
                    color="light"
                    disabled={currentPage === bookData.totalPages}
                    onClick={() => handlePageChange("next")}
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
