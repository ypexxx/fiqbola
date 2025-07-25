import Image from "next/image";

export default function Home() {
  return (
    <>
      <main>
        <img
          src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=1749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover object-center min-h-screen w-full absolute -z-10"
        />
        <div className="container min-w-screen min-h-screen flex items-center text-center">
          <div className="mx-auto flex flex-col">
            <img src="/logo.png" className="mb-5" />
            <a href="/stream">
              <button
                type="button"
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
              >
                🎥 Watch Live!
              </button>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
