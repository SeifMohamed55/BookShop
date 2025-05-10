import { faBookOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useContext } from "react";
import MenuList from "../ui/menuList";
import HorizontalCard from "../ui/horizontalCard";
import CreateBookModal from "../ui/CreateBookModal";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import TagsDiv from "../ui/TagsDiv";
import { Book } from "../../types/interfaces/Book";
import { ReadingStatsClient, BooksClient } from "../../web-api-client";
import { States } from "../../types/interfaces/States";
import { UserContext } from "../../contexts/userDataProvider";

const MyBooks = () => {
  
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [listValues] = useState<string[]>([
    `all books`,
    `currently reading`,
    `completed`,
  ]);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(UserContext);

  const onClick = (index: number): void => {
    setActiveIndex(index);
    fetchMyBooks(index);
  };

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [data, setData] = useState<States[] | undefined>(undefined);
  const [tagsValue] = useState<string[]>([
    "Fiction",
    "Science fiction",
    "biography",
  ]);

  const fetchMyBooks = async (statusIndex: number) => {
    try {
      setLoading(true);
      const client = new BooksClient();
      let isCompleted: boolean | undefined = undefined;
      
      switch (statusIndex) {
        case 0: // all books
          isCompleted = undefined;
          break;
        case 1: // currently reading
          isCompleted = false;
          break;
        case 2: // completed
          isCompleted = true;
          break;
      }

      const response = await client.getMyBooks(context?.userData?.id || "", isCompleted);
      if (response.data) {
        setMyBooks(response.data);
      } else {
        setMyBooks([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again.');
      setMyBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks(activeIndex);
  }, []);

  const getDaysRemainingInYear = () => {
    const today = new Date();
    const endOfYear = new Date(today.getFullYear(), 11, 31); // December is month 11
    const diffInMs = endOfYear.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return `${daysRemaining} days remaining this year`;
  };

  useEffect(() => {
    const client = new ReadingStatsClient();
    client
      .getReadingStats()
      .then((res) => {
        console.log(res);
        res.data ? setData(res.data) : setData(undefined);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <div className="container-lg py-5">
      <div className="row g-4">
        <div className="col-md-8 col-12">
          <div className="d-flex justify-content-between">
            <h1 className="playfair fw-bold text-capitalize">my books</h1>
            <button
              type="button"
              className="btn btn-dark w-auto text-capitalize times rounded-2 btn-style"
              onClick={toggleModal}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              add book
            </button>
          </div>
          <MenuList
            values={listValues}
            onClick={onClick}
            activeIndex={activeIndex}
          />
          <div className="d-flex justify-content-between align-items-center gap-4 flex-column">
            {loading ? (
              <div className="text-center w-100 py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading your books...</p>
              </div>
            ) : error ? (
              <div className="text-center w-100 py-5 text-danger">
                <p>{error}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => fetchMyBooks(activeIndex)}
                >
                  Retry
                </button>
              </div>
            ) : myBooks.length === 0 ? (
              <div className="text-center w-100 py-5">
                <p className="playfair">No books found in this category.</p>
              </div>
            ) : (
              myBooks.map((book) => (
                <HorizontalCard key={book.id} bookDetails={book} />
              ))
            )}
          </div>
        </div>
        <div className="col-md-4 col-12">
          <aside className="statistics-div rounded-2 border w-100 p-4">
            <h2 className="text-capitalize h5 playfair fw-bold py-3">
              reading stats
            </h2>
            <div className="p-3 rounded-2 d-flex justify-content-between align-items-center flex-column gap-2 w-100 border">
              <h3 className="times fw-bold h5 w-100 text-nowrap">
                Reading Goal
              </h3>
              <p className="small-font w-100 opacity-75">
                {getDaysRemainingInYear()}
              </p>
              <div className="w-100 rounded-2 pages p-2">
                <p className="bg-white rounded-2 p-3 d-flex justify-content-between align-items-center times text-capitalize">
                  <FontAwesomeIcon icon={faBookOpen} />
                  pages
                </p>
              </div>
              <div className="py-3 w-100">
                <div className="d-flex times justify-content-between align-items-center normal-font ">
                  <p className="text-nowrap">2,430 of 7,500 pages</p>
                  <p>{}%</p>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar bg-black"
                    style={{ width: "32%" }}
                  ></div>
                </div>
              </div>
              <div className="pages normal-font times rounded-2 p-3">
                <p>
                  You need to read <strong>5,070 more pages</strong> to reach
                  your goal. That's about 22 <strong>pages per day</strong>.
                </p>
              </div>
            </div>
            <div className="p-3 d-flex w-100 border rounded-2 my-3 d-flex justify-content-between flex-column gap-2">
              <h2 className="playfair fw-bold h5">Reading Activity</h2>
              <p className="normal-font times opacity-75">Pages read per day</p>

              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  width={200}
                  height={250}
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC927B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EC927B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pages"
                    stroke="#EC927B"
                    fillOpacity={1}
                    fill="url(#colorPages)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="pages normal-font times rounded-2 p-3">
                <p>
                  You read an average of <strong>15 pages per day</strong> in
                  the last 14 days. Try setting aside more time for reading to
                  increase your daily pages.
                </p>
              </div>
            </div>
          </aside>
          <div className="my-4 border p-4 rounded-2">
            <h2 className="playfair fw-bold h5 rounded-2 text-capitalize">
              favorite genres
            </h2>
            <div className="py-4">
              <TagsDiv values={tagsValue} isDark={true} />
            </div>
          </div>
        </div>
      </div>
      <CreateBookModal isOpen={modal} toggle={toggleModal} />
    </div>
  );
};

export default MyBooks;
