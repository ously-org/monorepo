import { Bindings } from "../../../shared/types";
/**
 * RPC Handler: Project a branch's future
 */
export declare const projectRpc: import("hono/hono-base").HonoBase<{
    Bindings: Bindings;
}, {
    "/:id/project": {
        $post: {
            input: any;
            output: {
                error: string;
            };
            outputFormat: any;
            status: 404;
        } | {
            input: any;
            output: {
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
            };
            outputFormat: any;
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: any;
            output: {
                error: string;
            };
            outputFormat: any;
            status: 500;
        };
    };
}, "/", "/:id/project">;
//# sourceMappingURL=project.post.d.ts.map