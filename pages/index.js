import { useState } from "react";
import Movies from "../components/Movies";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center">
      <Movies />
    </div>
  );
}
