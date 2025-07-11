import {cn} from "../library/utils"
import React, {useState} from "react"
import {Button} from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import {Input} from "../components/ui/input"
import {Label} from "../components/ui/label"

export function RegisterForm({
                                 className,
                                 ...props
                             }: React.ComponentProps<"div">) {
    const [userType, setUserType] = useState<string>("")

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Register your Timeoff Account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">User Type</Label>
                                <Select onValueChange={(value) => setUserType(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a user type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="management">Management</SelectItem>
                                            <SelectItem value="employee">Employee</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required/>
                            </div>
                            {userType === "management" && (
                                <div className="grid gap-3">
                                    <Label htmlFor="companyCode">Company Code</Label>
                                    <Input id="companyCode" type="text" required/>
                                </div>
                            )}
                            {userType === "employee" && (
                                <div className="grid gap-3">
                                    <Label htmlFor="employeeId">Employee ID</Label>
                                    <Input id="employeeId" type="text" required/>
                                </div>
                            )}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}