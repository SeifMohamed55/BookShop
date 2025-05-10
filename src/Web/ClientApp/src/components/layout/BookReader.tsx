import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookmark, faFont, faMoon, faSun, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './BookReader.css';

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

  // Mock API call - Replace with actual API call
  const fetchBookPage = async (bookId: string, page: number) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock response
      const mockResponse: BookPage = {
        content: `Chapter ${page}: The Journey Continues\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        pageNumber: page,
        totalPages: 10,
        chapterTitle: `Chapter ${page}`
      };
      
      setBookData(mockResponse);
      setError(null);
    } catch (err) {
      setError('Failed to load book content. Please try again.');
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
    setFontSize(prev => increase ? Math.min(prev + 2, 24) : Math.max(prev - 2, 12));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBookmark = () => {
    setBookmark(window.scrollY);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (!bookData) return;
    
    if (direction === 'next' && currentPage < bookData.totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className={`book-reader ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="reader-toolbar">
        <Container>
          <Row className="align-items-center py-3">
            <Col>
              <Button 
                color="light" 
                onClick={() => navigate('/profile')}
                className="me-3"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Profile
              </Button>
              <Button 
                color="light" 
                onClick={handleBookmark}
                className="me-3"
              >
                <FontAwesomeIcon icon={faBookmark} className="me-2" />
                Bookmark
              </Button>
            </Col>
            <Col className="text-end">
              <Button 
                color="light" 
                onClick={() => handleFontSizeChange(false)}
                className="me-2"
              >
                <FontAwesomeIcon icon={faFont} className="me-2" />
                A-
              </Button>
              <Button 
                color="light" 
                onClick={() => handleFontSizeChange(true)}
                className="me-2"
              >
                <FontAwesomeIcon icon={faFont} className="me-2" />
                A+
              </Button>
              <Button 
                color="light" 
                onClick={toggleDarkMode}
              >
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="me-2" />
                {isDarkMode ? 'Light' : 'Dark'} Mode
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Card className="reader-content p-5">
          {loading ? (
            <div className="text-center py-5">
              <Spinner color="primary" />
              <p className="mt-3">Loading page...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger">
              <p>{error}</p>
              <Button color="primary" onClick={() => fetchBookPage(id!, currentPage)}>
                Retry
              </Button>
            </div>
          ) : bookData && (
            <>
              <div 
                className="book-text"
                style={{ fontSize: `${fontSize}px` }}
              >
                <h2 className="chapter-title mb-4">{bookData.chapterTitle}</h2>
                {bookData.content}
              </div>
              
              <div className="pagination-controls mt-4 d-flex justify-content-between align-items-center">
                <Button
                  color="light"
                  onClick={() => handlePageChange('prev')}
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
                  onClick={() => handlePageChange('next')}
                  disabled={currentPage === bookData.totalPages}
                >
                  Next Page
                  <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                </Button>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default BookReader; 