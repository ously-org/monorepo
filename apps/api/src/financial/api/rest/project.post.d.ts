import { Context } from "hono";
import { Bindings } from "../../../shared/types";
/**
 * REST Handler: Project a branch's future
 */
export declare const projectPost: (c: Context<{
    Bindings: Bindings;
}>) => Promise<(Response & import("hono").TypedResponse<{
    error: string;
}, 400, "json">) | (Response & import("hono").TypedResponse<{
    error: string;
}, 404, "json">) | (Response & import("hono").TypedResponse<{
    snapshots: {
        month: number;
        date: string;
        netWorth: number;
        assets: number;
        liabilities: number;
        debtToAssetRatio: number;
        entities: {
            [x: string]: number;
        };
        isFrozen: boolean;
    }[];
}, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
    error: string;
}, 500, "json">)>;
//# sourceMappingURL=project.post.d.ts.map