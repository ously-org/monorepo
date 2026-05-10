import { z } from "zod";
import {
  type DesignContext,
  type DesignSpec,
  type DesignMatchResult,
} from "@ously/domain";
import { match } from "./match";

export const DesignContextSchema = match<DesignContext>()(
  z.object({
    apps: z.array(
      z.object({
        name: z.string(),
        routes: z.array(z.string()),
        mainComponents: z.array(z.string()),
      }),
    ),
    ods: z.object({
      components: z.array(z.string()),
      theme: z.object({
        colors: z.record(z.string()),
        spacing: z.record(z.string()),
        typography: z.record(z.string()),
      }),
    }),
    functionality: z.array(z.string()),
  }),
);

export const DesignSpecSchema = match<DesignSpec>()(
  z.object({
    id: z.string(),
    timestamp: z.string(),
    source: z.enum(["stitch", "manual"]),
    prompt: z.string(),
    output: z.object({
      type: z.enum(["code", "markdown", "image", "link"]),
      content: z.string(),
    }),
  }),
);

export const DesignMatchResultSchema = match<DesignMatchResult>()(
  z.object({
    specId: z.string(),
    matches: z.array(
      z.object({
        designComponentName: z.string(),
        existingComponentName: z.string().optional(),
        matchScore: z.number().min(0).max(1),
        recommendation: z.enum(["reuse", "extend", "create"]),
        notes: z.string().optional(),
      }),
    ),
    gaps: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        priority: z.enum(["high", "medium", "low"]),
      }),
    ),
  }),
);
