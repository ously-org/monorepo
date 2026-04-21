import { Bindings } from "../../../shared/types";
/**
 * RPC Handler: Compare two branches
 */
export declare const compareRpc: import("hono/hono-base").HonoBase<{
    Bindings: Bindings;
}, {
    "/compare": {
        $post: {
            input: any;
            output: {
                branchA: {
                    id: string;
                    finalSnapshot?: {
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
                    } | undefined;
                };
                branchB: {
                    id: string;
                    finalSnapshot?: {
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
                    } | undefined;
                };
                diff: {
                    netWorth: number;
                    assets: number;
                    liabilities: number;
                };
            };
            outputFormat: any;
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: any;
            output: {
                error: string;
            };
            outputFormat: any;
            status: 404;
        } | {
            input: any;
            output: {
                error: string;
            };
            outputFormat: any;
            status: 500;
        };
    };
}, "/", "/compare">;
//# sourceMappingURL=compare.post.d.ts.map