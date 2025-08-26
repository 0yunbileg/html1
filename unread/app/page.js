import Hero from "@/components/hero/hero"
import EditorsChoice from "@/components/editorsChoice/editorsChoice"
import ArticlesByDate from "@/components/articlesByDate/articlesByDate"

export default function Home() {
  return (
    <div>
      <Hero/>
      <EditorsChoice />
      <ArticlesByDate />
    </div>
  )
}
