import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/db"

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div className="bg-accent-foreground flex flex-col min-h-svh items-center justify-center w-full">
      <Card className="flex max-w-[800px] h-ful w-full">
        <CardContent>
          <CardHeader>
            <CardTitle>
              Users Name:
            </CardTitle>
            <CardDescription>
              {JSON.stringify(users, null, 2)}
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  )
}