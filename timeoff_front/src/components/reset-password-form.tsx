import React from "react";
import { cn } from "../library/utils"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export function ResetPasswordForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex items-center justify-center rounded-md">
                                <img src="/timeoff_logo-nobg.png" alt="Timeoff Logo" className="h-10 w-18" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </a>
                        <h1 className="text-xl font-bold">Reset Your Account's Password</h1>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email registered in Timeoff</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Reset Link/OTP code
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
