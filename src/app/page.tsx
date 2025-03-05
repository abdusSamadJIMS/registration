'use client'
import Image from "next/image";
import logo from "@/../public/image/logo.jpg"
import Link from "next/link";
import Footer from "./components/layout/footer";


export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col">
      <Link href={'/'} className="pt-10">
        <Image src={logo}
          alt="Logo"
          width={150}
          height={150}
        />
      </Link>
      <section className="text-primary flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">All India Level Wise Gymnastics Competition 2025</h1>
        <p className="text-lg text-center">Organized by Thee Gymnastics Academy</p>
        <div className="divider "></div>
        <p className="text-lg text-center">Welcome to the registration for</p>
        <h2 className="text-2xl font-bold text-center capitalize">3rd edition of All India Level Wise Gymnastics Competition 2025!</h2>
        <p className="text-lg text-center">We are excited to have you join this prestigious national competition.</p>
        <p className="text-lg text-center">Click on Start to begin the registration process.</p>
        <Link href="/registration" className="btn btn-primary text-xl mt-10 rounded-full animate-pulse mb-20">
          Register Now
        </Link>
      </section>
      <Footer />
    </main>

  );
}
