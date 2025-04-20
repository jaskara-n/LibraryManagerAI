"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface IssuedBook {
  id: number;
  book_name: string;
  author: string;
  username: string;
  issued_at: number;
  due_date: number;
  returned_at: number | null;
}

function Dashboard() {
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await fetch("http://localhost:3002/issued-books");
        if (!response.ok) {
          throw new Error("Failed to fetch issued books");
        }
        const data = await response.json();
        setIssuedBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "admin") {
      fetchIssuedBooks();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Calculate time remaining until deadline
  const calculateTimeRemaining = (dueDate: number) => {
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = dueDate - now;

    if (timeRemaining <= 0) {
      return "Overdue";
    }

    const days = Math.floor(timeRemaining / (24 * 60 * 60));
    const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));

    return `${days} days, ${hours} hours`;
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (loading) {
    return <div className="p-6 mt-10 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 mt-10 text-red-500">Error: {error}</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 mt-10 text-white">
        <h1 className="text-2xl font-semibold mb-4">Your Dashboard</h1>
        <p>Welcome to your dashboard. You can view your issued books here.</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-10 bg-transparent text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">
        Admin Dashboard - All Issued Books
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left">Book Name</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Issued By</th>
              <th className="px-4 py-2 text-left">Issue Date</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Time Remaining</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr
                key={book.id}
                className={book.returned_at ? "opacity-60" : ""}
              >
                <td className="px-4 py-2">{book.book_name}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.username}</td>
                <td className="px-4 py-2">{formatDate(book.issued_at)}</td>
                <td className="px-4 py-2">{formatDate(book.due_date)}</td>
                <td className="px-4 py-2">
                  {book.returned_at
                    ? "Returned"
                    : calculateTimeRemaining(book.due_date)}
                </td>
                <td className="px-4 py-2">
                  {book.returned_at ? (
                    <span className="text-green-500">Returned</span>
                  ) : new Date(book.due_date * 1000) < new Date() ? (
                    <span className="text-red-500">Overdue</span>
                  ) : (
                    <span className="text-yellow-500">Active</span>
                  )}
                </td>
              </tr>
            ))}
            {issuedBooks.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center">
                  No books have been issued yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
