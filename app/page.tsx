import Body from "@/components/Body";
import GradientBlueBackground from "@/components/GradientBlueBackground";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="h-full">
      <GradientBlueBackground/>
      <Header />
      <Body/>
    </main>
  )
}
