import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
    duration?: number;
    colorFrom?: string;
    colorTo?: string;
    className?: string;
}

export function BorderBeam({
    duration = 2,
    colorFrom = "rgb(147, 51, 234)",
    colorTo = "rgb(79, 70, 229)",
    className,
    ...props
}: BorderBeamProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.setProperty("--duration", duration.toString());
        }
    }, [duration]);

    return (
        <div
            ref={ref}
            className={cn(
                "absolute inset-0 pointer-events-none overflow-hidden",
                className
            )}
            {...props}
        >
            <div
                className="absolute inset-0"
                style={{
                    maskImage: `linear-gradient(to right, black, black)`,
                    WebkitMaskImage: `linear-gradient(to right, black, black)`,
                }}
            >
                <div
                    className="absolute inset-0 animate-border-beam"
                    style={{
                        background: `linear-gradient(to right, transparent, ${colorFrom}, ${colorTo}, transparent)`,
                        width: "200%",
                        left: "-50%",
                    }}
                />
            </div>
        </div>
    );
} 