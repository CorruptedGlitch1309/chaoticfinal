import Link from "next/link";
import About from "./about";

export default function Nav() {
  return (
    <div className="bg-red-600 p-2 text-white text-3xl flex justify-between flex-wrap">
      <h1 className="text-4xl">Chaotic Final</h1>
      <About />
      <hr className="w-full" />
    </div>
  );
}
