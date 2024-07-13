"use client";
import Landing from "./landing";
import { RootProvider } from "@/context/RootContext";
export default function Home() {
  return (
    <>
      <RootProvider>
        <Landing />
      </RootProvider>
    </>
  );
}
