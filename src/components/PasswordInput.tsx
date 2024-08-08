"use client"
import * as React from "react"
import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {

        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    className={cn("pe-10", className)}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ?
                        <EyeOff className="size-5" />
                        :
                        <Eye className="size-5" />
                    }
                </button>
            </div>
        )

    }
)


PasswordInput.displayName = "PasswordInput"

export { PasswordInput }