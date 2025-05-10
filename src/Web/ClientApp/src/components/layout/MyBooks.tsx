import { faBookOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const MyBooks = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [books] = useState<Book[]>([
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      description: "Between life and death there is a library, and the shelves go on forever.",
      imagePath: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      totalPages: 304,
      averageRating: 4.5,
      categories: ["Fiction", "Fantasy"]
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller.",
      imagePath: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      totalPages: 496,
      averageRating: 4.8,
      categories: ["Science Fiction", "Adventure"]
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      description: "A reclusive Hollywood legend reveals her life story to an unknown journalist.",
      imagePath: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      totalPages: 389,
      averageRating: 4.6,
      categories: ["Historical Fiction", "Drama"]
    }
  ]);

  const toggleModal = () => setModal(!modal);

  const handleReadBook = (bookId: number) => {
    navigate(`/reader/${bookId}`);
  };

  const [listValues] = useState<string[]>([
    `📖 all books`,
    `🚩 currently reading`,
    `✅ completed`,
  ]);
  const onClick = (index: number): void => {
    setActiveIndex(index);
  };
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const data = [
    { name: "Apr 23", pages: 25 },
    { name: "Apr 25", pages: 20 },
    { name: "Apr 29", pages: 35 },
    { name: "May 1", pages: 13 },
    { name: "May 3", pages: 10 },
    { name: "May 6", pages: 35 },
    { name: "May 9", pages: 30 },
  ];
  const [tagsValue] = useState<string[]>([
    "Fiction",
    "Science fiction",
    "biography",
  ]);
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
            {books.length > 0 ? (
              books.map((book) => (
                <HorizontalCard 
                  key={book.id} 
                  bookDetails={book} 
                  onReadBook={() => handleReadBook(book.id)}
                />
              ))
            ) : (
              <div className="text-center py-5">
                <p>No books found in your library.</p>
              </div>
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
                Reading Goal 2023
              </h3>
              <p className="small-font w-100 opacity-75">
                239 days remaining this year
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
                  <p>32%</p>
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
