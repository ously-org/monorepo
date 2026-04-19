import { Button, Card } from "@ously/ods"
import { Github, Chrome } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tight">Prosper</h1>
          <p className="mt-2 text-muted-foreground">
            Empowering your financial future with AI.
          </p>
        </div>

        <Card 
          title="Sign in" 
          description="Choose your preferred login method."
        >
          <div className="flex flex-col gap-3 py-2">
            <Button variant="outline" className="w-full justify-center gap-2">
              <Chrome className="h-4 w-4" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2">
              <Github className="h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>.
        </p>
      </div>
    </main>
  )
}
