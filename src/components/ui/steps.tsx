
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ value, className, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const steps = childrenArray.filter(
      (child) => React.isValidElement(child) && child.type === Step
    );

    return (
      <div
        ref={ref}
        className={cn("flex w-full space-x-2", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const stepValue = React.isValidElement(step)
            ? step.props.value
            : index + 1;
          const isActive = value === stepValue;
          const isCompleted = value > stepValue;

          return React.cloneElement(step as React.ReactElement, {
            key: index,
            isActive,
            isCompleted,
            stepNumber: index + 1,
          });
        })}
      </div>
    );
  }
);

Steps.displayName = "Steps";

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  isActive?: boolean;
  isCompleted?: boolean;
  stepNumber?: number;
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, children, isActive, isCompleted, stepNumber, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-center space-x-1",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border text-center font-medium",
            isActive
              ? "border-primary bg-primary text-primary-foreground"
              : isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : "border-input"
          )}
        >
          {isCompleted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            stepNumber
          )}
        </div>
        <div className="flex flex-col text-center md:text-left">
          <span
            className={cn(
              "text-sm font-medium",
              isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {children}
          </span>
        </div>
        {stepNumber !== undefined && (
          <div
            className={cn(
              "hidden h-0.5 flex-1 md:block",
              isCompleted ? "bg-primary" : "bg-border"
            )}
          />
        )}
      </div>
    );
  }
);

Step.displayName = "Step";
