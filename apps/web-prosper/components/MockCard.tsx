import React from "react";

export interface MockCardProps {
  title: string;
  description: string;
}

export const MockCard = ({ title, description }: MockCardProps) => {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm max-w-sm">
      <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
