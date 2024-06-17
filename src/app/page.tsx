import TodoModal from "@/components/TodoModal";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#121212]">
      <Image src={"/logo.png"} alt="Shanture" height={100} width={100} priority className="w-20 h-min mb-2" />
      <div className="w-[60vw] h-[90vh] bg-zinc-900 rounded-md flex items-center p-3 flex-col pt-1">
        <TodoModal />
      </div>
    </main>
  );
}
