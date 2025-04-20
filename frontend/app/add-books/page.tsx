"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Define Book interface to properly type the books array
type Book = {
  id: number;
  name: string;
  author: string;
};

export default function AddBooksPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Redirect if user is not logged in or not an admin
    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, [user, router]);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3002/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: bookName, author: bookAuthor }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add book");

      setMessage(`Book "${data.name}" added!`);
      setBookName("");
      setBookAuthor("");

      // Refresh the book list after adding a new book
      fetchBooks();
    } catch (err: any) {
      setMessage(err.message || "Failed to add book");
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:3002/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const handleDeleteBook = async (id: any) => {
    try {
      const res = await fetch(`http://localhost:3002/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete book");
      setBooks(books.filter((book) => book.id !== id));
      setMessage("Book deleted successfully!");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    // Fetch books when component mounts
    if (user && user.role === "admin") {
      fetchBooks();
    }
  }, [user]);

  if (!user || user.role !== "admin") {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="p-10 mt-8">
      <p className="mb-4 text-white">
        Logged in as <strong>{user.username}</strong> ({user.role})
      </p>

      <form onSubmit={handleAddBook} className="flex flex-col gap-3 max-w-md">
        <h2 className="text-white text-lg font-bold">Add Book</h2>
        <input
          className="p-2 rounded bg-black text-white"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          className="p-2 rounded bg-black text-white"
          placeholder="Author"
          value={bookAuthor}
          onChange={(e) => setBookAuthor(e.target.value)}
        />
        <button className="bg-green-700 text-white p-2 rounded">
          Add Book
        </button>
        {message && <p className="text-green-400">{message}</p>}
      </form>

      <div className="mt-8">
        <h2 className="text-white text-lg font-bold mb-4">Manage Books</h2>
        <div className="grid gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-white font-semibold">{book.name}</h3>
                {book.author && <p className="text-gray-400">{book.author}</p>}
              </div>
              <button
                onClick={() => handleDeleteBook(book.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
