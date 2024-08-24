import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="mt-10">
        <h1 className="font-bold text-3xl text-center">Popular Destinations</h1>
        <div className="flex justify-between mt-10 mb-10">
          <div>
            <div className="w-[300px] bg-white h-[250px] relative">
              <Image
                src="/Travel.jpg"
                alt=""
                priority
                fill
                quality={100}
                className=""
              />
            </div>
            <h1 className="text-xl font-semibold text-center mt-2">Desert</h1>
          </div>
          <div>
            <div className="w-[300px] bg-white h-[250px] relative">
              <Image
                src="/Travel.jpg"
                alt=""
                priority
                fill
                quality={100}
                className=""
              />
            </div>
            <h1 className="text-xl font-semibold text-center mt-2">Desert</h1>
          </div>
          <div>
            <div className="w-[300px] bg-white h-[250px] relative">
              <Image
                src="/Travel.jpg"
                alt=""
                priority
                fill
                quality={100}
                className=""
              />
            </div>
            <h1 className="text-xl font-semibold text-center mt-2">Desert</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
