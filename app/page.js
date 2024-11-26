'use client';
import React from "react";
import MainPage from "./ui/mainpage";
import { useEffect } from "react";


export default function Home() {
  const [showChild, setShowChild] = React.useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return <div></div>
  }

  return (
    <MainPage />
  );
}
