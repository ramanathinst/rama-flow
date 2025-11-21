import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="bg-accent-foreground flex flex-col min-h-screen items-center justify-center w-full">
      <Card className="flex max-w-[400px] w-full">
        <CardContent>
          <CardHeader>
            <CardTitle>
              Install Shadcn
            </CardTitle>
            <CardDescription>
              Shadcn implement with nextjs
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  )
}