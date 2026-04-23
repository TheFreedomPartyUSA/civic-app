"use client";

import ProtectedRoute from "../../components/ProtectedRoute";

export default function TrainPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Training</h1>
      </div>
    </ProtectedRoute>
  );
}