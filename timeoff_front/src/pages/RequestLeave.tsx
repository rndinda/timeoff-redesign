import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Calendar } from "../components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { useToast } from "../hooks/use-toast";

const leaveRequestSchema = z.object({
    leaveType: z.string().min(1, "Please select a leave type"),
    startDate: z.date({
        required_error: "Start date is required",
    }),
    endDate: z.date({
        required_error: "End date is required",
    }),
    reason: z.string().min(10, "Please provide a detailed reason (minimum 10 characters)"),
    emergencyContact: z.string().optional(),
}).refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
});

type LeaveRequestForm = z.infer<typeof leaveRequestSchema>;

export default function RequestLeave() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<LeaveRequestForm>({
        resolver: zodResolver(leaveRequestSchema),
        defaultValues: {
            leaveType: "",
            reason: "",
            emergencyContact: "",
        },
    });

    const onSubmit = async (data: LeaveRequestForm) => {
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Leave request submitted:", data);
            toast({
                title: "Leave Request Submitted",
                description: "Your leave request has been submitted successfully and is pending approval.",
            });
            setIsSubmitting(false);
            navigate("/leave");
        }, 1000);
    };

    const calculateDays = () => {
        const startDate = form.watch("startDate");
        const endDate = form.watch("endDate");

        if (startDate && endDate) {
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            return diffDays;
        }
        return 0;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/leave")}
                        className="mb-4 -ml-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Leave Management
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Leave</h1>
                    <p className="text-gray-600">Submit a new leave request for approval</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Send className="h-5 w-5" />
                                Leave Request Form
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Leave Type */}
                                    <FormField
                                        control={form.control}
                                        name="leaveType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Leave Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select leave type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="annual">Annual Leave</SelectItem>
                                                        <SelectItem value="sick">Sick Leave</SelectItem>
                                                        <SelectItem value="personal">Personal Leave</SelectItem>
                                                        <SelectItem value="maternity">Maternity Leave</SelectItem>
                                                        <SelectItem value="paternity">Paternity Leave</SelectItem>
                                                        <SelectItem value="emergency">Emergency Leave</SelectItem>
                                                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Date Range */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Start Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick start date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date()}
                                                                initialFocus
                                                                className={cn("p-3 pointer-events-auto")}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>End Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick end date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date()}
                                                                initialFocus
                                                                className={cn("p-3 pointer-events-auto")}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Duration Display */}
                                    {calculateDays() > 0 && (
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-sm text-blue-800">
                                                <strong>Duration:</strong> {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    )}

                                    {/* Reason */}
                                    <FormField
                                        control={form.control}
                                        name="reason"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reason for Leave</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Please provide a detailed reason for your leave request..."
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Emergency Contact */}
                                    <FormField
                                        control={form.control}
                                        name="emergencyContact"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Emergency Contact (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Name and phone number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <div className="flex gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate("/leave")}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1"
                                        >
                                            {isSubmitting ? (
                                                "Submitting..."
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Submit Request
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}